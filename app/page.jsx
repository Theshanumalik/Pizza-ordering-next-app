import Image from "next/image";
import React from "react";
import Link from "next/link";
import Cards from "@/components/Cards";
export default function page() {
  const items = [
    {
      id: 1,
      name: "Pasta",
      imageUrl: "/food.jpg",
      price: 200,
    },
    {
      id: 2,
      name: "Burger",
      imageUrl: "/food.jpg",
      price: 250,
    },
    {
      id: 3,
      name: "Pizza",
      imageUrl: "/food.jpg",
      price: 300,
    },
    {
      id: 4,
      name: "Biryani",
      imageUrl: "/food.jpg",
      price: 280,
    },
    {
      id: 5,
      name: "Chicken roast",
      imageUrl: "/food.jpg",
      price: 420,
    },
  ];
  return (
    <>
      <section className="p-3">
        <div className="max-w-container mx-auto flex max-sm:flex-col-reverse max-md:gap-2">
          <div style={{ flex: 6 }}>
            <h1 className="text-6xl my-8 max-sm:text-4xl max-sm:text-center max-md:text-5xl">
              It's not just <br />
              food, It's an exprience.
            </h1>
            <div className="flex gap-4 items-center max-sm:flex-col max-sm:justify-center">
              <Link
                href="/menu"
                className="bg-red-500 px-6 py-3 hover:bg-red-600 text-white rounded-full transition-colors"
              >
                View Menu
              </Link>
              <Link
                href="/menu"
                className="px-6 py-3 rounded-full transition-colors border-gray-400 border-2 bg-transparent hover:border-gray-500"
              >
                Book a Seat
              </Link>
            </div>
          </div>
          <div style={{ flex: 6 }}>
            <Image
              src="/food.jpg"
              alt="Image of Chicken Biryani as the banner"
              quality={80}
              className="w-full"
              width={200}
              height={200}
            />
          </div>
        </div>
      </section>
      <section className="p-3 my-5">
        <div className="max-w-container mx-auto">
          <h3 className="text-2xl mb-5 ">Featured Products</h3>
          <Cards items={items} />
        </div>
      </section>
    </>
  );
}
