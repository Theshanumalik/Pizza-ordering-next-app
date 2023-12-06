import { CustomError } from "@/helper/CustomError";
import { getServerSession } from "next-auth";
import User from "@/model/User";
import { NextResponse } from "next/server";
import { authOptions } from "../(auth)/auth/[...nextauth]/route";

export const GET = async (request) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session.user) {
      throw new CustomError("User is unauthorized");
    }
    const userInformation = await User.findById(session?.user?.id);
    return NextResponse.json(userInformation, { status: 200 });
  } catch (error) {
    return NextResponse.json(error?.message || "Something went wrong!", {
      status: error.statusCode || 500,
    });
  }
};
