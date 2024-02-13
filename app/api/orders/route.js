import { CustomError } from "@/helper/CustomError";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Order from "@/model/Order";
import { authOptions } from "../(auth)/auth/[...nextauth]/route";
export const GET = async (request) => {
  try {
    const session = await getServerSession(authOptions);
    let orderFilter = {};
    if (!session?.user) {
      throw new CustomError("unauthorized user!", 400);
    }
    if (session.user.role !== "admin") {
      orderFilter.userId = session.user.id;
    }
    const orders = await Order.find(orderFilter).sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error?.message || "Something went wrong!", {
      status: error.statusCode || 500,
    });
  }
};
