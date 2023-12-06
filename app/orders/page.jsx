"use client";
import UserActionsLayout from "@/components/layout/UserActionsLayout";
import { useFetch } from "@/hooks/useFetch";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import { CurrencyRupee, RemoveRedEye } from "@mui/icons-material";
import OrderTableSkeleton from "@/components/skeletons/OrderTableSkeleton";

export default function OrdersPage() {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const orders = useFetch("/api/orders");

  React.useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push(`/login?callbackUrl=${pathname}`);
    }
  }, [session.status]);
  if (orders.loading) {
    return <OrderTableSkeleton />;
  }
  return (
    <UserActionsLayout>
      <div className="overflow-scroll h-full __scroll-hidden">
        <table className="max-w-container w-full mx-auto my-6 rounded-md overflow-hidden">
          <thead>
            <tr className="bg-red-500 text-white text-left">
              <th className="py-2 px-4 font-normal">OrderId</th>
              <th className="py-2 px-4 font-normal">Shipping Status</th>
              <th className="py-2 px-4 font-normal">Amount</th>
              <th className="py-2 px-4 font-normal">Payment Status</th>
              <th className="py-2 px-4 font-normal">Ordered At</th>
              <th className="py-2 px-4 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.data?.map((order) => (
              <tr className="bg-gray-100 hover:bg-gray-300 cursor-default">
                <td className="py-2 px-4">{order._id}</td>
                <td className="py-2 px-4">{order.shippingStatus}</td>
                <td className="py-2 px-4 flex items-center">
                  <CurrencyRupee />
                  {order.amount}
                </td>
                <td className="py-2 px-4">
                  {order.paymentStatus === "unpaid" ? (
                    <button className="text-sm bg-green-400 text-white px-3 py-1 rounded-full">
                      Pay now
                    </button>
                  ) : (
                    <b className="text-sm px-3 py-1 rounded-full">Paid</b>
                  )}
                </td>
                <td className="py-2 px-4">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td className="py-2 px-4">
                  <Link
                    href={`/orders/${order._id}`}
                    className="text-sm border border-gray-500 px-1 py-1 rounded-full"
                  >
                    Order details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </UserActionsLayout>
  );
}
