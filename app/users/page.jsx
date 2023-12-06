"use client";
import UserActionsLayout from "@/components/layout/UserActionsLayout";
import { useFetch } from "@/hooks/useFetch";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Delete, Edit } from "@mui/icons-material";
import OrderTableSkeleton from "@/components/skeletons/OrderTableSkeleton";

export default function UsersPage() {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const users = useFetch("/api/users");

  React.useEffect(() => {
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
  if (users.loading) {
    return <OrderTableSkeleton />;
  }
  return (
    <UserActionsLayout>
      <div className="overflow-scroll h-full __scroll-hidden">
        <table className="max-w-container w-full mx-auto my-6 rounded-md overflow-hidden">
          <thead>
            <tr className="bg-red-500 text-white text-left">
              <th className="py-2 px-4 font-normal">UserId</th>
              <th className="py-2 px-4 font-normal">Name</th>
              <th className="py-2 px-4 font-normal">Email</th>
              <th className="py-2 px-4 font-normal">Role</th>
              <th className="py-2 px-4 font-normal">Created at</th>
              <th className="py-2 px-4 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.data?.map((user) => (
              <tr className="bg-gray-100 hover:bg-gray-300 cursor-default">
                <td className="py-2 px-4">{user._id}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.role}</td>
                <td className="py-2 px-4">
                  {new Date(user.createdAt).toLocaleString()}
                </td>
                <td className="py-2 px-4">
                  <button className="hover:text-gray-600">
                    <Edit />
                  </button>
                  <button className="hover:text-red-500">
                    <Delete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </UserActionsLayout>
  );
}
