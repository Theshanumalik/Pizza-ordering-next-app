"use client";
import React, { useState } from "react";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import Modal from "../layout/Modal";

function PizzaModal({ onClose, data }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  return (
    <Modal onClose={onClose}>
      <Image
        src={data?.image}
        width={200}
        height={200}
        className="block mx-auto my-4"
        alt={data.description}
      />
      <h1 className="text-xl">{data?.name}</h1>
      <p className="my-2">{data?.description}</p>
      <h3 className="font-semibold">Pick your size</h3>
      {data?.sizes.map((size) => (
        <label
          htmlFor={size?._id}
          key={size._id}
          className="rounded-md border border-gray-400 p-3 w-3/4 flex gap-2 my-2"
        >
          <input
            type="radio"
            name="size"
            id={size?._id}
            value={size?._id}
            onClick={(e) => {
              setSelectedSize(size?._id);
            }}
          />
          {size.name} (+{size.extraPrice})
        </label>
      ))}
      <h3 className="font-semibold">Any addition stuff?</h3>
      {data?.addOns.map((addOn) => (
        <label
          htmlFor={addOn?._id}
          key={addOn._id}
          className="rounded-md border border-gray-400 p-3 w-3/4 flex gap-2 my-2"
        >
          <input
            type="checkbox"
            id={addOn?._id}
            value={addOn?._id}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedAddOns((prev) => [
                  ...new Set([...prev, addOn?._id]),
                ]);
              } else {
                setSelectedAddOns((prev) => [
                  ...prev.filter((id) => id !== addOn?._id),
                ]);
              }
            }}
          />
          {addOn.name} (+{addOn.extraPrice})
        </label>
      ))}
      <AddToCartButton
        data={data}
        selectedSize={selectedSize}
        selectedAddOns={selectedAddOns}
        onClick={onClose}
      />
      <button
        className="border border-gray-400 p-2 w-3/4 rounded-md my-3 block"
        onClick={onClose}
      >
        Cancle
      </button>
    </Modal>
  );
}

export default PizzaModal;
