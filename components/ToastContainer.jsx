"use client";
import { Toaster } from "react-hot-toast";

export default function ToastContainer() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{ style: { marginTop: "12vh" } }}
    />
  );
}
