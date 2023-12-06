import { NextResponse } from "next/server";

export const catchAsyncError = (controller) => async (request) => {
  try {
    return await controller(request);
  } catch (error) {
    return NextResponse.json(error.message || "Something went wrong!", {
      status: error.statusCode || 500,
    });
  }
};
