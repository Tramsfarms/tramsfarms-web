import React from "react";

export default function page() {
  return (
    <div className="p-2">
      <div className="w-full p-5 bg-white rounded-lg">
        <h1 className="mt-5 text-xl font-medium text-gray-400">
          Additional Information
        </h1>

        <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2 md:grid-cols-4">
          <input
            type="text"
            className="w-full p-2 text-sm bg-white border rounded-lg outline-none border-grays-200 hover:border-brand-500 focus:ring-0 ring-0 focus:outline-none"
            placeholder="Preferred Contact Method"
          />
        </div>

        <button className="p-[4px_12px] text-white font-medium mt-5 rounded-lg bg-primary">
          Save
        </button>
      </div>
    </div>
  );
}
