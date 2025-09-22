"use client";
import { useProfile } from "@/context/ProfileProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EdiProfile from "@/components/forms/EditProfile";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const session = useSession();
  const { loading, data, updateProfileData } = useProfile();
  const updateProfile = (inputs) => {
    const promise = new Promise((resolve, reject) => {
      axios
        .put("/api/profile/", inputs)
        .then((res) => {
          updateProfileData(res.data);
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
  if (loading || session.status === "loading") return <div>Please wait..</div>;
  if (session.status === "unauthenticated") {
    return router.push("/login/?callbackUrl=/profile");
  }
  return <EdiProfile data={data} onSubmit={updateProfile} />;
}
