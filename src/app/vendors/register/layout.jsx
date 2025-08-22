import { div } from "framer-motion/client";
import React from "react";

export default function layout({ children }) {
  return (
    <div className='w-screen h-screen overflow-hidden'>
      <div className="h-16 shadow-md md:hidden bg-grays-50"></div>
      <div className="flex flex-col w-screen h-full p-5 md:flex-row">
        <div className="flex items-center justify-center md:justify-end md:w-1/2">
          <img src="/images/sell.svg" alt="" className="w-1/2 md:w-2/3" />
        </div>
        <div className="flex flex-col justify-center md:p-10 md:w-1/2">
          <div className="md:w-1/2">{children}</div>
        </div>
      </div>
    </div>
  );
}
