"use client";
import { useFetch } from "@/hooks/useFetch";
import { useSession } from "next-auth/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import EditProduct from "@/components/forms/EditProduct";

export default function EditProductPage() {
  const session = useSession();
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const product = useFetch("/api/product/" + params.slug);
  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push(`/login?callbackUrl=${pathname}`);
    }
    if (
      session.status === "authenticated" &&
      session.data?.user.role !== "admin"
    ) {
      router.push(`/login?callbackUrl=${pathname}`);
    }
  }, [session.status, session.data]);
  if (product.loading) {
    return <div>Loading..</div>;
  }
  return <EditProduct data={product?.data} />;
}
