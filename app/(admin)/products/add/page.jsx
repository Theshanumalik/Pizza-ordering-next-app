"use client";
import EditProduct from "@/components/forms/EditProduct";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddProduct() {
  const saveProduct = (inputs) => {
    const promise = new Promise((resolve, reject) => {
      axios
        .post("/api/product/", inputs)
        .then((res) => {
          resolve();
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
    toast.promise(promise, {
      loading: "Saving the changes...",
      success: "Changes are Saved uccessfully!",
      error: (msg) => `${msg}`,
    });
  };
  return <EditProduct onSubmit={(values) => saveProduct(values)} />;
}
