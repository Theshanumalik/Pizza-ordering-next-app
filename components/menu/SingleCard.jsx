import Image from "next/image";
import React from "react";
import imageSrc from "@/assets/pizza.png";
import Link from "next/link";
import SingleCardActions from "./SingleCardActions";
import { CurrencyRupee } from "@mui/icons-material";

export default function SingleCard({ data }) {
  return (
    <div className="bg-white rounded-3xl relative shadow-md border flex flex-col mb-2 p-5 sm:w-[300px] sm:mb-0">
      <div className="flex justify-center my-3">
        <Image
          src={imageSrc}
          width={200}
          height={200}
          className="rounded-full object-cover"
          alt="menu item"
        />
      </div>
      <h4 className="text-lg mb-3 uppercase font-medium">
        <Link href={`/product/${data.slug}`}>{data.name}</Link>
      </h4>
      <p className="mb-3 flex-1">{data.description.slice(0, 50).toString()}</p>
      <div className="flex justify-between items-center w-full">
        <span className="text-xl flex items-center">
          <CurrencyRupee />
          {data.price}
        </span>
        <SingleCardActions productInfo={JSON.stringify(data)} />
      </div>
    </div>
  );
}
