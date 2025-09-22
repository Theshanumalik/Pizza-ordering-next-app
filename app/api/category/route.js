import dbConnect from "@/config/dbConnect";
import { catchAsyncError } from "@/helper/catchAsyncError";
import Category from "@/model/Category";
import { NextResponse } from "next/server";

export const POST = catchAsyncError(async (req) => {
  const { name, description, image } = await req.json();

  if ([name, image].some((value) => !value)) {
    return res
      .status(400)
      .json({ message: "Please provide all the required fields!" });
  }

  await dbConnect();

  const category = await Category.create({
    name,
    description,
    image,
  });

  return NextResponse.json(
    {
      message: "Category created successfully",
    },
    {
      status: 201,
    }
  );
});
