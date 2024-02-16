import dbConnect from "@/config/dbConnect";
import Pizza from "@/model/Pizza";
import Order from "@/model/Order";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../(auth)/auth/[...nextauth]/route";
import { CustomError } from "@/helper/CustomError";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export const POST = async (request) => {
  const { products, city, phoneNumber, streetAddress } = await request.json();
  try {
    const session = await getServerSession(authOptions);
    if (!session.user) {
      throw new Error("Login required!");
    }
    if (!city || !phoneNumber || !streetAddress) {
      throw new Error("Address is required!");
    }
    let totalAmount = 0;
    let orderProducts = [];
    let stripeItems = [];
    await dbConnect();
    for (const item of products) {
      const pizza = await Pizza.findById(item._id);
      if (!pizza) {
        throw new CustomError("Invalid item found in cart!", 400);
      }
      let calcPrice = calculatePizzaCost(pizza, item);
      totalAmount += calcPrice;
      stripeItems.push({
        quantity: item.qty,
        price_data: {
          currency: "INR",
          product_data: {
            name: pizza.name,
          },
          unit_amount: calcPrice * 100,
        },
      });
      orderProducts.push({
        item: item._id,
        quantity: item?.qty,
        selectedSize: item?.selectedSize,
        selectedAddOns: item?.selectedAddOns,
      });
    }
    if (!totalAmount) {
      throw new Error("Something Went Wrong while validating Cart Items!");
    }
    const newOrder = await Order.create({
      items: orderProducts,
      user: session.user.id,
      amount: totalAmount,
      shippingAddress: { streetAddress, city, phoneNumber },
    });
    const stripeSession = await stripe.checkout.sessions.create({
      line_items: stripeItems,
      mode: "payment",
      success_url: `http://localhost:3000/orders?orderId=${newOrder._id}`,
      cancel_url: "http://localhost:3000/cart?cancled=1",
      metadata: { orderId: newOrder._id.toString() },
      payment_intent_data: {
        metadata: { orderId: newOrder._id.toString() },
      },
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "Delivery fee",
            type: "fixed_amount",
            fixed_amount: { amount: 12000, currency: "INR" },
          },
        },
      ],
    });
    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    return new NextResponse(error.message || "something went wrong!", {
      status: error.statusCode || 500,
    });
  }
};

function calculatePizzaCost(pizza, item) {
  let basePrice = pizza.price;
  if (item.selectedSize) {
    for (const size of pizza.sizes) {
      let sizeId = JSON.parse(JSON.stringify(size._id));
      if (sizeId === item.selectedSize) {
        basePrice += size.extraPrice;
      }
    }
  }
  if (item.selectedAddOns) {
    for (const addOn of pizza.addOns) {
      let addOnId = JSON.parse(JSON.stringify(addOn._id));
      if (item?.selectedAddOns.includes(addOnId)) {
        basePrice += addOn.extraPrice;
      }
    }
  }
  if (item.qty) {
    basePrice *= item.qty;
  }
  return basePrice;
}
