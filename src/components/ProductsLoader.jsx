import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoader() {
  return (
    <div className="space-y-2">
      <Skeleton className="w-[200px] h-[180px] rounded-lg" />
      <Skeleton className="w-[200px] h-[20px] rounded-lg" />
      <Skeleton className="w-[200px] h-[20px] rounded-lg" />
    </div>
  );
}
