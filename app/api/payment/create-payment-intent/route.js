import dbConnect from "@/config/dbConnect";
import Pizza from "@/model/Pizza";
import Offer from "@/model/Offer";
import Order from "@/model/Order";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../(auth)/auth/[...nextauth]/route";
import { CustomError } from "@/helper/CustomError";
import { catchAsyncError } from "@/helper/catchAsyncError";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = catchAsyncError(async (request) => {
  const { products, city, phoneNumber, streetAddress, couponCode } =
    await request.json();
  console.log({ couponCode });
  const session = await getServerSession(authOptions);
  if (!session.user) {
    throw new CustomError("Login is Required", 401);
  }
  if (!city || !phoneNumber || !streetAddress) {
    throw new CustomError("All fields are required", 400);
  }
  let totalAmount = 0;
  let orderProducts = [];
  let stripeItems = [];
  let discounts = [];
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
        unit_amount: (calcPrice / item.qty) * 100,
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
  const offer =
    couponCode &&
    (await Offer.findOne({
      $and: [
        { couponCode },
        { expiry: { $gte: Date.now() } },
        { $expr: { $gt: ["$maxUseCount", "$useCount"] } },
        { minOrderAmount: { $lt: totalAmount } },
      ],
    }));
  if (couponCode && !offer?._id) {
    throw new CustomError("Invalid Coupon Code!");
  }
  if (offer._id) {
    const stripeCoupon = await stripe.coupons.create({
      duration: "once",
      currency: "INR",
      percent_off: offer.deductionInPercentage ? offer.deduction : undefined,
      amount_off: !offer.deductionInPercentage
        ? offer.deduction * 100
        : undefined,
    });
    discounts.push({ coupon: stripeCoupon.id });
  }
  const newOrder = await Order.create({
    items: orderProducts,
    user: session.user.id,
    amount: totalAmount,
    offer: offer._id || undefined,
    shippingAddress: { streetAddress, city, phoneNumber },
  });
  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeItems,
    mode: "payment",
    success_url: `http://localhost:3000/orders?orderId=${newOrder._id}`,
    cancel_url: "http://localhost:3000/cart?cancled=1",
    metadata: {
      orderId: newOrder._id.toString(),
      offerId: offer?._id?.toString() || undefined,
    },
    payment_intent_data: {
      metadata: {
        orderId: newOrder._id.toString(),
        offerId: offer?._id?.toString() || undefined,
      },
    },
    discounts,
  });
  return NextResponse.json({ url: stripeSession.url });
});

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

function calculateOfferDeduction(offer, totalAmount) {
  let deduction;
  if (offer.deductionInPercentage) {
    deduction = totalAmount * (offer.deduction / 100);
  } else {
    deduction = offer.deduction;
  }
  return deduction;
}
