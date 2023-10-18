import React from "react";

export default function Navigation() {
  return (
    <div className="flex justify-between py-4 mb-4 max-sm:flex-col gap-4">
      <h1 className="text-xl font-medium">Menu</h1>
      <div className="flex gap-3">
        <select className="bg-transparent border-red-500 border p-3 rounded-md cursor-pointer">
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
        <select className="bg-transparent border-red-500 border p-3 rounded-md cursor-pointer">
          <option value="">Filter By</option>
          <option value="veg">Veg</option>
          <option value="non-veg">Non veg</option>
        </select>
      </div>
    </div>
  );
}
