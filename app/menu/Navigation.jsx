"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navigation() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [filter, setFilter] = useState(() => searchParams.get("filter") || "");
  const [sortBy, setSortBy] = useState(() => searchParams.get("sort") || "");
  const { replace } = useRouter();
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (sortBy !== "") {
      params.set("sort", sortBy);
    } else {
      params.delete("sort");
    }
    if (filter !== "") {
      params.set("filter", filter);
    } else {
      params.delete("filter");
    }
    replace(`${pathname}?${params}`);
  }, [filter, sortBy]);
  return (
    <div className="flex justify-between py-4 mb-4 max-sm:flex-col gap-4">
      <h1 className="text-xl font-medium">Menu</h1>
      <div className="flex gap-3">
        <select
          className="bg-transparent border-red-500 border p-3 rounded-md cursor-pointer"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
        <select
          className="bg-transparent border-red-500 border p-3 rounded-md cursor-pointer"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Filter By</option>
          <option value="veg">Veg</option>
          <option value="non-veg">Non veg</option>
        </select>
      </div>
    </div>
  );
}
