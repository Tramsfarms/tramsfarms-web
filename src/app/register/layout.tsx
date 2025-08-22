"use client";

import React from "react";

export default function RegisterLayout({ children }) {
  return (
    <div className="w-screen h-screen overflow-hidden">
      {/* <div className="h-16 shadow-md md:hidden bg-grays-50"></div> */}
      <div className="flex flex-col w-screen h-full p-5 md:flex-row">
        <div className="hidden md:flex md:items-center md:justify-end md:w-1/2 md:pr-8">
          <img
            src="/images/sell.svg"
            alt="Registration illustration"
            className="w-2/3 max-w-md"
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 md:items-start md:pl-8">
          <div className="w-full max-w-lg">{children}</div>
        </div>
      </div>
    </div>
  );
}
