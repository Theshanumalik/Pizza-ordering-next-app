"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

export default function EditableImage({ link, setLink }) {
  const [file, setFile] = useState(link || null);
  const handleFileChange = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    const promise = new Promise((resolve, reject) => {
      axios
        .post("/api/upload", formData)
        .then((res) => {
          if (res.data.url) {
            setLink(res.data.url);
            setFile(res.data.url);
            console.log("Uploaded");
            resolve();
          }
        })
        .catch((error) => {
          reject(error.response?.data);
        });
    });
    toast.promise(promise, {
      loading: "Saving new image...",
      success: "Image Saved Successfully!",
      error: (msg) => `Failed to save image. REASON: ${msg}`,
    });
  };
  return (
    <div className="w-[200px]">
      {file && (
        <Image
          src={file}
          alt="Profile Image"
          width={200}
          height={200}
          className="rounded-md"
          priority={1}
        />
      )}
      <label
        htmlFor="image"
        className="block w-full text-center py-2 border rounded-md my-2 bg-gray-200 text-gray-600 cursor-pointer"
      >
        Change
      </label>
      <input
        type="file"
        name="image"
        id="image"
        accept="image/*"
        maxLength={1}
        onChange={handleFileChange}
        hidden
      />
    </div>
  );
}
