import { getServerSession } from "next-auth";
import Offer from "@/model/Offer";
import { NextResponse } from "next/server";
import { authOptions } from "../(auth)/auth/[...nextauth]/route";
import dbConnect from "@/config/dbConnect";
import { catchAsyncError } from "@/helper/catchAsyncError";
import { CustomError } from "@/helper/CustomError";

export const GET = catchAsyncError(async () => {
  await dbConnect();
  const offers = await Offer.find({ expiry: { $gte: Date.now() } });
  return NextResponse.json(offers, { status: 200 });
});

export const POST = catchAsyncError(async (request) => {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "admin") {
    throw new CustomError("unauthorized user!", 401);
  }
  const {
    expiry,
    description,
    deduction,
    minOrderAmount,
    maxUseCount,
    useCount,
    couponCode,
    deductionInPercentage,
  } = await request.json();
  await dbConnect();
  const newOffer = await Offer.create({
    expiry,
    description,
    deduction,
    minOrderAmount,
    maxUseCount,
    useCount,
    couponCode,
    deductionInPercentage,
  });
  return NextResponse.json(newOffer, { status: 200, statusText: "ok" });
});
