"use client";
import { addItem, removeItem, updateItemSize } from "@/store/cartSlice";
import { Add, Remove } from "@mui/icons-material";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Link from "next/link";

export default function FoodItem({ data }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between shadow-md border mb-2 p-4 rounded-lg bg-white max-[488px]:flex-col max-[488px]:text-center max-[488px]:gap-2">
      <Image
        src={data.imageUrl}
        width={100}
        height={100}
        className="w-40 h-40 rounded-full object-cover"
        alt="menu item"
      />
      <div className="flex-1">
        <Link href={`/product/${data?.slug}`}>
          <h3>{data.name}</h3>
        </Link>
        <p className="text-gray-800 my-2">
          {data.description.slice(0, 50).toString()}
          {data.description.length > 50 && "..."}
        </p>
        <div>
          <label htmlFor="size">Size: </label>
          <select
            id="size"
            className="border border-gray-400 p-1 rounded-md cursor-pointer focus:border-red-500"
            onChange={(e) =>
              dispatch(updateItemSize({ size: e.target.value, id: data._id }))
            }
            value={data?.selectedSize}
          >
            {data?.sizes.map((availableSize) => (
              <option value={availableSize} key={availableSize}>
                {availableSize}
              </option>
            ))}
          </select>
        </div>
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
