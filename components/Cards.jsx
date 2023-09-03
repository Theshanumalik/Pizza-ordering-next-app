import React from "react";
import SingleCard from "./SingleCard";

export default function Cards({ items }) {
  return (
    <div className="flex flex-wrap gap-4 max-sm:justify-center">
      {items.map((item) => (
        <SingleCard data={item} key={item.id} />
      ))}
    </div>
  );
}
