"use client";
import { addItem, removeItem } from "@/store/cartSlice";
import { Add, Remove } from "@mui/icons-material";
import Image from "next/image";
import { useDispatch } from "react-redux";

export default function FoodItem({ data }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between shadow-md mb-2 p-4 rounded-lg bg-white max-[488px]:flex-col max-[488px]:text-center max-[488px]:gap-2">
      <Image
        src={data.imageUrl}
        width={100}
        height={100}
        className="w-40 h-40 rounded-full object-cover"
        alt="menu item"
      />
      <div className="flex-1">
        <h3>{data.name}</h3>
        <p className="text-gray-800">
          {data.description.slice(0, 50).toString()}
          {data.description.length > 50 && "..."}
        </p>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xl">${data.price}</span>
        <div className="flex border border-gray-300 rounded-md">
          <button
            className="p-2 border-r border-gray-300"
            onClick={() => dispatch(addItem(data))}
          >
            <Add />
          </button>
          <span className="p-2">{data.qty}</span>
          <button
            className="p-2 border-l border-gray-300"
            onClick={() => dispatch(removeItem(data._id))}
          >
            <Remove />
          </button>
        </div>
      </div>
    </div>
  );
}
