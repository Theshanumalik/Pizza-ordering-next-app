import Image from "next/image";
import React from "react";
import AddToCart from "./AddToCart";
import dbConnect from "@/config/dbConnect";
import Pizza from "@/model/Pizza";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }) {
  await dbConnect();
  const pizza = await Pizza.findOne({
    slug: decodeURIComponent(params.slug),
  });
  if (!pizza) return notFound();
  return (
    <section className="p-3">
      <div className="max-w-container mx-auto flex max-sm:flex-col">
        <aside className="flex-1">
          <Image
            src="/food.jpg"
            width={200}
            height={200}
            quality={100}
            className="w-full"
          />
        </aside>
        <aside className="flex-1 p-4 max-sm:px-0">
          <h1 className="text-xl font-medium uppercase mb-4 max-sm:mb-3">
            {pizza.name}
          </h1>
          <p className="text-gray-700">{pizza.description}</p>
          <AddToCart product={JSON.stringify(pizza)} />
        </aside>
      </div>
    </section>
  );
}
