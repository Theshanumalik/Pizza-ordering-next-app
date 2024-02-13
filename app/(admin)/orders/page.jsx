"use client";
import { useFetch } from "@/hooks/useFetch";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import OrderTableSkeleton from "@/components/skeletons/OrderTableSkeleton";
import OrderEntry from "./OrderEntry";
import OrderDetails from "./OrderDetails";

export default function OrdersPage() {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();
  const orders = useFetch("/api/orders");
  const [currentOrderId, setCurrentOrderId] = useState("");
  const [close, setClose] = useState(true);
  const onClose = () => {
    setClose(true);
  };
  const seeDetails = (id) => {
    setClose(false);
    setCurrentOrderId(id);
  };
  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push(`/login?callbackUrl=${pathname}`);
    }
  }, [session.status]);
  useState(() => {
    if (query.get("orderId")) {
      setCurrentOrderId(query.get("orderId"));
    }
  }, []);
  if (orders.loading) {
    return <OrderTableSkeleton />;
  }
  return (
    <div className="overflow-scroll h-full __scroll-hidden my-4">
      {orders.data.map((order) => (
        <OrderEntry data={order} key={order._id} seeDetails={seeDetails} />
      ))}

      {!close && <OrderDetails onClose={onClose} orderId={currentOrderId} />}
    </div>
  );
}
