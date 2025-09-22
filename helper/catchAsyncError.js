import { NextResponse } from "next/server";

export const catchAsyncError =
  (controller) =>
  async (...options) => {
    try {
      return await controller(...options);
    } catch (err) {
      console.log(err);
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
