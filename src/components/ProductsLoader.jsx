import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoader() {
  return (
    <div className="space-y-2 -mt-3 animate-pulse">
       <Skeleton className="w-[230px] h-[220px] shadow-md rounded-lg" />
      <Skeleton className="w-[230px] h-[20px] shadow-md rounded-lg" />
      <Skeleton className="w-[230px] h-[20px]  shadow-md rounded-lg" /> 
    </div>
  );
}
