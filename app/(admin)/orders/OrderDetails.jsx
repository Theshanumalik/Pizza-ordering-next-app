"use client";
import Modal from "@/components/layout/Modal";
import React from "react";

function OrderDetails({ onClose, orderId }) {
  return <Modal onClose={onClose}>Hello world {orderId}</Modal>;
}

export default OrderDetails;
