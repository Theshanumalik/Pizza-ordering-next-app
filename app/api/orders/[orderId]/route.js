import { CustomError } from "@/helper/CustomError";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Order from "@/model/Order";
import { authOptions } from "../../(auth)/auth/[...nextauth]/route";
export const GET = async (request, { params }) => {
  try {
    const session = await getServerSession(authOptions);
    let orderFilter = {};
    if (!session?.user) {
      throw new CustomError("unauthorized user!", 400);
    }
    if (session.user.role !== "admin") {
      orderFilter.$and = [{ _id: params.orderId }, { userId: session.user.id }];
    } else {
      orderFilter._id = params.orderId;
    }
    const orders = await Order.findOne(orderFilter).populate("items.item");
    return NextResponse.json(orders);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error?.message || "Something went wrong!", {
      status: error.statusCode || 500,
    });
  }
};
