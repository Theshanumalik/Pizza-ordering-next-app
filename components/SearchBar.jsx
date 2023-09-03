import React from "react";

export default function SearchBar() {
  return (
    <div className="flex relative p-2" style={{ flex: 9 }}>
      <input
        type="search"
        placeholder="Search your Course, Subject, School name etc.."
        className="border-2 w-full p-2 px-4 rounded-full"
      />
      <div className="absolute top-[100%] bg-red-300 shadow-sm h-[20vh] w-full rounded-md hidden">
        Results
      </div>
    </div>
  );
}
