import CardSkeleton from "@/components/CardSkeleton";
import React from "react";

function loading() {
  return (
    <section className="p-3">
      <div className="max-w-container mx-auto">
        <div className="flex max-sm:justify-center w-full gap-4 flex-wrap justify-between max-sm:gap-2">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </section>
  );
}

export default loading;
