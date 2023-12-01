import React from "react";
import Navigation from "./Navigation";
import Cards from "@/components/Cards";
import dbConnect from "@/config/dbConnect";
import Pizza from "../../model/Pizza";

export const dynamic = true;
export default async function page({ searchParams }) {
  const products = await getProducts(searchParams);
  return (
    <section className="p-3">
      <div className="max-w-container mx-auto">
        <Navigation />
        <Cards items={products} />
      </div>
    </section>
  );
}

async function getProducts(searchParams) {
  const searchQuery = {};
  if (searchParams?.filter) {
    searchQuery.category = searchParams?.filter;
  }
  try {
    console.log({ [searchParams?.sort]: -1 });
    await dbConnect();
    return await Pizza.find(searchQuery).sort({ [searchParams?.sort]: -1 });
  } catch (error) {
    console.log(error);
    return null;
  }
}
