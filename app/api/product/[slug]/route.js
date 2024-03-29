import { CustomError } from "@/helper/CustomError";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Pizza from "@/model/Pizza";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/route";

export const GET = async (request, { params }) => {
  try {
    const session = await getServerSession(authOptions);
    if (!params.slug) {
      throw new CustomError("Slug must be provided", 400);
    }
    if (!session?.user) {
      throw new CustomError("Invalid Token!", 400);
    }
    if (session.user.role !== "admin") {
      throw new CustomError("unauthorized user!", 400);
    }
    const pizza = await Pizza.findOne({ slug: params.slug });
    return NextResponse.json(pizza);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error?.message || "Something went wrong!", {
      status: error.statusCode || 500,
    });
  }
};

export const PUT = async (request) => {
  try {
    const body = await request.json();
    await dbConnect();
    const { name, description, price, sizes, image, category } = body;
    if (!name || !description || !price || !sizes || !image || !category) {
      return NextResponse.json(
        { message: "Please fill all fields" },
        { status: 400 }
      );
    }
    const pizza = await Pizza.create({
      name,
      description,
      price,
      sizes,
      image,
      category,
    });
    return NextResponse.json(
      { message: "Pizza created successfully" },
      { status: 201 }
    );
  } catch (error) {
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
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
