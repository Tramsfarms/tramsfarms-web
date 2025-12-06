'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const Totopbtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={handleClick}
      aria-label='Scroll to top'
      className={`fixed z-50 bottom-9 right-4 flex flex-col items-center justify-center p-2 transition-opacity duration-300 ${
        isVisible ? 'opacity-100 ' : 'opacity-0 pointer-events-none'
      }`}
    >
      <Image
        src='/images/logo/favicon.png'
        alt='Scroll to top'
        width={58}
        height={58}
        className='w-12 h-12 sm:w-14 sm:h-14 lg:w-[58px] lg:h-[58px] border rounded-full border-primary '
      />
      <p className='font-bold text-black'>SCROLL UP</p>
    </button>
  );
};

export default Totopbtn;
