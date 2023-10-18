import React from "react";
import Navigation from "./Navigation";
import Cards from "@/components/Cards";
import { products } from "@/tempDB/products";

export default function page() {
  return (
    <section className="p-3">
      <div className="max-w-container mx-auto">
        <Navigation />
        <Cards items={products} />
      </div>
    </section>
  );
}
