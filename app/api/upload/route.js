import { uploadMedia } from "@/config/cloudinary";
import { CustomError } from "@/helper/CustomError";
import { NextResponse } from "next/server";
export const POST = async (request) => {
  try {
    const data = await request.formData();
    const image = data.get("image");
    if (!image) {
      throw new CustomError("Image Must Be provided!", 401);
    }
    const imageUpload = await uploadMedia(image);

    return NextResponse.json({ success: "ok", url: imageUpload.url });
  } catch (error) {
    return NextResponse.json(error?.message || "Something went wrong!", {
      status: error.statusCode || 500,
    });
  }
};
