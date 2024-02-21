"use client";
import EditOffer from "@/components/forms/EditOffer";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function CreateOffer() {
  const router = useRouter();
  const createNewOffer = (inputs) => {
    const promise = new Promise((resolve, reject) => {
      axios
        .post("/api/offers/", inputs)
        .then((res) => {
          resolve();
          router.push("/offers");
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
    toast.promise(promise, {
      loading: "Creating New Offer",
      success: "Offer Created Successfully!",
      error: (msg) => `${msg}`,
    });
  };
  return <EditOffer onSubmit={createNewOffer} />;
}

export default CreateOffer;
