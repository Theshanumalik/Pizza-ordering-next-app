import { NextResponse } from "next/server";
import User from "@/model/User";
import dbConnect from "@/config/dbConnect";

export const POST = async (request) => {
  const body = await request.json();
  try {
    await dbConnect();
    const newUser = await User.create(body);
    return NextResponse.json({ ...newUser, password: undefined });
  } catch (err) {
    if (err?.code === 11000) {
      err.statusCode = 400;
      err.message = `${Object.keys(err.keyValue)} is already in use.`;
    }
    if (err.name == "ValidationError") {
      err.message = `${err.errors[Object.keys(err.errors)[0]].message}`;
    }
    if (err.name == "JsonWebTokenError") {
      err.message = "Authorization token is not provided!";
      err.statusCode = 401;
    }
    return new NextResponse(err.message, { status: 400 });
  }
};
