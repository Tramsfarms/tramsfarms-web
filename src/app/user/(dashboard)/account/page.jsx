import React from "react";

export default function page() {
  return (
    <div className="p-5">
      <div>
        <div className="flex">
          <h3>Account Statements</h3>
        </div>
        <div className="flex items-center justify-between p-2 border-b-2 border-b-grays-300">
          <div>
            <h1 className="mt-5 font-sans text-xs font-bold md:text-4xl text-grays-700">
              Account Statements
            </h1>
          </div>
          <div>
            <button className="p-2 px-4 font-sans text-xs text-white rounded-lg bg-primary">
              Export Transactions
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-3 md:grid-cols-3">
        <div className="col-span-1 bg-white rounded-lg h-60">
          <div className="flex items-center justify-between p-4 rounded-t-lg bg-grays-300">
            <h1 className="text-xs">Period/Number/Status</h1>
            <h1 className="text-xs">Payout</h1>
          </div>
        </div>
        <div className="h-full col-span-1 bg-white rounded-lg md:col-span-2">
          <div className="p-5 text-xs">
            <h1>02 Sep 2024 - 08 Sep 2024</h1>
            <h1 className="text-primary">PAID</h1>
            <h1>NGUBITO-29874569</h1>
          </div>
          <div className="flex justify-between px-4 py-2 border-t border-b">
            <h1>Opening Balance</h1>
            <h1>0.00NGN</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
