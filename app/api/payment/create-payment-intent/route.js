import dbConnect from "@/config/dbConnect";
import Pizza from "@/model/Pizza";
import Order from "@/model/Order";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../(auth)/auth/[...nextauth]/route";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export const POST = async (request) => {
  const { products, city, phoneNumber, streetAddress } = await request.json();
  try {
    const session = await getServerSession(authOptions);
    if (!session.user) {
      throw new Error("Login required!");
    }
    if (!city || !phoneNumber || !streetAddress)
      throw new Error("Address is required!");
    let totalAmount = 0;
    let orderProducts = [];
    await dbConnect();
    for (let i = 0; i < products.length; i++) {
      let product = await Pizza.findById(products[i]._id);
      if (!product || !products[i]?.qty) {
        throw new Error("Invalid Product Found in Cart!");
      }
      totalAmount += product?.price * products[i]?.qty;
      orderProducts.push({
        name: product.name,
        productId: product._id,
        price: product.price,
        quantity: products[i]?.qty,
        selectedSize: products[i]?.selectedSize,
      });
    }
    if (!totalAmount) {
      throw new Error("Something Went Wrong while validating Cart Items!");
    }
    const newOrder = await Order.create({
      products: orderProducts,
      userId: session.user.id,
      amount: totalAmount,
      shippingAddress: { streetAddress, city, phoneNumber },
    });
    const stripeSession = await stripe.checkout.sessions.create({
      line_items: newOrder.products.map((productInfo) => {
        return {
          quantity: productInfo.quantity,
          price_data: {
            currency: "INR",
            product_data: {
              name: productInfo.name,
            },
            unit_amount: productInfo.price * 100,
          },
        };
      }),
      mode: "payment",
      success_url: "http://localhost:3000/order?new=1",
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
