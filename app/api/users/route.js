import { CustomError } from "@/helper/CustomError";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import User from "@/model/User";
import { authOptions } from "../(auth)/auth/[...nextauth]/route";

export const GET = async (request) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      throw new CustomError("Invalid Token!", 400);
    }
    if (session.user.role !== "admin") {
      throw new CustomError("unauthorized user!", 400);
    }
    const users = await User.find().sort({ createdAt: -1 });
    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error?.message || "Something went wrong!", {
      status: error.statusCode || 500,
    });
  }
};
