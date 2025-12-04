import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="w-full p-5">
      <div>
        <div className="flex">
          <h3 className="text-xs md:text-base">
            Hey there, take a look at where transfarm is at
          </h3>
        </div>
        <div className="flex items-center justify-between p-2 border-b-2 border-b-grays-300">
          <div>
            <h1 className="mt-5 font-sans text-lg font-bold text-grays-700">
              Yours to do
            </h1>
          </div>
        </div>
      </div>
      <div className="flex mt-3">
        <div className="flex flex-col justify-between h-40 p-5 bg-white rounded-md">
          <div>
            <h1 className="font-sans text-2xl">Avalaible products</h1>
            <p className="text-grays-600">
              List products to start selling on Tramsfarm
            </p>
          </div>
          <div className="mt-4">
            <Link
              className="w-full p-3 px-4 mt-12 rounded-md text-primary bg-brand-300"
              href="/vendors/products/add"
            >
              Create Product
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-3">
        <div className="col-span-1 bg-white rounded-md md:col-span-2 h-60">
          <div className="flex items-center justify-between p-4 -grays-300">
            <div>
              <h1 className="text-xs text-grays-700">Statistics</h1>
              <h1 className="text-sm font-bold">Sales Report</h1>
            </div>
            <h1 className="text-xs">Payout</h1>
          </div>
        </div>
        <div className="h-full col-span-1 p-4 bg-white">
          <div>
            <h1 className="text-xs text-grays-700">Statistics</h1>
            <h1 className="text-sm font-bold">Total Income</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
