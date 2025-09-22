import { CustomError } from "@/helper/CustomError";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Pizza from "@/model/FoodItem";
import { authOptions } from "../(auth)/auth/[...nextauth]/route";
import dbConnect from "@/config/dbConnect";

export const GET = async (request) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      throw new CustomError("Invalid Token!", 400);
    }
    if (session.user.role !== "admin") {
      throw new CustomError("unauthorized user!", 400);
    }
    const pizzas = await Pizza.find().sort({ createdAt: -1 }).limit(10);
    return NextResponse.json(pizzas);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error?.message || "Something went wrong!", {
      status: error.statusCode || 500,
    });
  }
};

export const POST = async (request) => {
  try {
    const body = await request.json();
    await dbConnect();
    const { name, description, price, sizes, image, category, addOns } = body;
    if (!name || !description || !price || !sizes || !image || !category) {
      throw new CustomError("All fields are required!", 400);
    }
    if (sizes?.length === 0) {
      throw new CustomError("Sizes Must be provided!", 400);
    }
    const pizza = await Pizza.create({
      name,
      description,
      price,
      sizes,
      image,
      category,
      addOns,
    });
    return NextResponse.json(
      { message: "Pizza created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Pizza already exists" },
        { status: 400 }
      );
    } else if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (value) => value.message
      );
      return NextResponse.json({ message: messages }, { status: 400 });
    }
    return NextResponse.json(
      { message: error?.message || "Something Went Wronge" },
      { status: error.statusCode || 500 }
    );
  }
};
