import { CustomError } from "@/helper/CustomError";
import { getServerSession } from "next-auth";
import User from "@/model/User";
import { NextResponse } from "next/server";
import { authOptions } from "../(auth)/auth/[...nextauth]/route";
import dbConnect from "@/config/dbConnect";

export const GET = async (request) => {
  try {
    await dbConnect();
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

export const PUT = async (request) => {
  try {
    const session = await getServerSession(authOptions);
    const { image, name, streetAddress, city, phoneNumber } =
      await request.json();
    await dbConnect();
    if (!session.user) {
      throw new CustomError("User is unauthorized");
    }
    const user = await User.findById(session?.user?.id);
    if (!user) {
      throw new CustomError("User Not Found!", 500);
    }
    if (image) {
      user.image = image;
    }
    if (name) {
      user.name = name;
    }
    if (streetAddress) {
      user.streetAddress = streetAddress;
    }
    if (city) {
      user.city = city;
    }
    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }
    await user.save();
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(error?.message || "Something went wrong!", {
      status: error.statusCode || 500,
    });
  }
};
