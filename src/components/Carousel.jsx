"use client";
import React, { useState, useEffect } from "react";

export default function Carousel({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
}) {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));

  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      {/* Slide wrapper that moves the slides */}
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="flex-shrink-0 w-full h-full">
            {slide}
          </div>
        ))}
      </div>

      {/* Arrows for navigation */}
      <div className="absolute inset-0 flex items-center justify-between p-4 text-white">
        <button onClick={prev}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M10.53 2.97a.75.75 0 0 1 0 1.06L6.56 8l3.97 3.97a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 0"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button onClick={next}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M5.47 13.03a.75.75 0 0 1 0-1.06L9.44 8L5.47 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Dots for navigation */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`transition-all p-[2px] sm:p-1 border border-white rounded-full ${
                curr === i ? "sm:w-6 h-3 w-3 sm:h-6" : "sm:w-5 w-2 h-2 sm:h-5"
              }`}
            >
              <div className="w-full h-full bg-white rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
