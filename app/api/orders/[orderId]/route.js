import { CustomError } from "@/helper/CustomError";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
const Order = require("@/model/Order");
import { authOptions } from "../../(auth)/auth/[...nextauth]/route";
import { catchAsyncError } from "@/helper/catchAsyncError";
import dbConnect from "@/config/dbConnect";

export const GET = catchAsyncError(async (request, { params }) => {
  await dbConnect();
  const session = await getServerSession(authOptions);
  let orderFilter = {};
  if (!session?.user) {
    throw new CustomError("unauthorized user!", 400);
  }
  if (session.user.role !== "admin") {
    orderFilter.user = session.user.id;
    orderFilter._id = params.orderId;
  } else {
    orderFilter._id = params.orderId;
  }
  const orders = await Order.findOne(orderFilter).populate([
    "items.item",
    "offer",
  ]);

  console.log({
    order: orders,
    params,
    orderQuery: JSON.stringify(orderFilter),
  });

  return NextResponse.json(orders);
});
