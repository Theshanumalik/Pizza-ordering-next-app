"use client";
import React from "react";

function OrderEntry({ data, seeDetails }) {
  return (
    <div className="flex gap-2 items-center p-3 bg-gray-200 my-1 rounded-lg">
      <div
        className={`${
          data.paymentStatus === "paid" ? "bg-green-500" : "bg-red-500"
        } text-white p-3 rounded-lg capitalize`}
      >
        {data.paymentStatus}
      </div>
      <p className="flex-1">
        {data?.products?.length} items has {data.shippingStatus} which is
        ordered at {new Date(data.createdAt).toLocaleString()}.
      </p>
      <button
        className="p-2 rounded-full border border-gray-500"
        onClick={() => seeDetails(data._id)}
      >
        See more
      </button>
    </div>
  );
}

export default OrderEntry;
