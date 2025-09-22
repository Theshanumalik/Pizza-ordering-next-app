"use client";
import { addItem } from "@/store/cartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { ShoppingCartTwoTone } from "@mui/icons-material";
import { useMemo } from "react";

export default function AddToCartButton({
  data,
  selectedSize,
  selectedAddOns,
  onClick,
}) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(addItem({ ...data, selectedAddOns, selectedSize }));
    toast.success("Pizza added to the cart!");
    onClick();
  };
  const calculatedPrice = useMemo(() => {
    let basePrice = data.price;
    if (selectedSize) {
      for (const size of data.sizes) {
        if (size._id === selectedSize) {
          basePrice += size.extraPrice;
        }
      }
    }
    if (selectedAddOns) {
      for (const addOn of data.addOns) {
        if (selectedAddOns.includes(addOn._id)) {
          basePrice += addOn.extraPrice;
        }
      }
    }
    return basePrice;
  }, [data.price, data.addOns, selectedAddOns, data.sizes, selectedSize]);
  return (
    <button
      className="bg-red-500 text-white p-2 w-3/4 rounded-md my-3 block"
      onClick={handleClick}
    >
      Add to cart {calculatedPrice} <ShoppingCartTwoTone />
    </button>
  );
}
