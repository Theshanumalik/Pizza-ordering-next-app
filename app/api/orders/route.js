import { CustomError } from "@/helper/CustomError";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Order from "@/model/Order";
import { authOptions } from "../(auth)/auth/[...nextauth]/route";
import { catchAsyncError } from "@/helper/catchAsyncError";

export const GET = catchAsyncError(async (request) => {
  const session = await getServerSession(authOptions);
  let orderFilter = {};
  if (!session?.user) {
    throw new CustomError("unauthorized user!", 400);
  }
  if (session.user.role !== "admin") {
    orderFilter.user = session.user.id;
  }
  const orders = await Order.find(orderFilter).sort({ createdAt: -1 });
  return NextResponse.json(orders);
});
