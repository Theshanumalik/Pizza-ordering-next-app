"use client";
import { Toaster } from "react-hot-toast";

export default function ToastContainer() {
  return (
    <Toaster position="top-center" containerStyle={{ marginTop: "11vh" }} />
  );
}
