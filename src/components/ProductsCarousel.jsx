"use client";
import React, { useState, useEffect } from "react";

export default function ProductsCarousel({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
  itemsPerSlide = 4, // Define how many items/cards per slide
}) {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) =>
      curr === 0 ? Math.ceil(slides.length / itemsPerSlide) - 1 : curr - 1
    );

  const next = () =>
    setCurr((curr) =>
      curr === Math.ceil(slides.length / itemsPerSlide) - 1 ? 0 : curr + 1
    );

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval]);

  // Group slides into sets based on itemsPerSlide
  const groupedSlides = [];
  for (let i = 0; i < slides.length; i += itemsPerSlide) {
    groupedSlides.push(slides.slice(i, i + itemsPerSlide));
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      {/* Slide wrapper that moves the slides */}
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {groupedSlides.map((group, index) => (
          <div key={index} className="flex flex-shrink-0 w-full gap-4">
            {group.map((slide, i) => (
              <div key={i} className="w-1/2 p-2 sm:w-1/3 md:w-1/4">
                {slide}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Arrows for navigation */}
      <div className="absolute inset-0 flex items-center justify-between p-4 text-black">
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
    </div>
  );
}
