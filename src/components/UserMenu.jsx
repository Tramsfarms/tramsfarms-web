"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function VendorMenu({ isMenu, setIsMenu }) {
  const path = usePathname();

  const links = [
    {
      href: "/user",
      label: "Orders",
      svgPath:
        "M5.72 14.456l1.761-.508l10.603-10.73a.456.456 0 0 0-.003-.64l-.635-.642a.443.443 0 0 0-.632-.003L6.239 12.635zM18.703.664l.635.643c.876.887.884 2.318.016 3.196L8.428 15.561l-3.764 1.084a.9.9 0 0 1-1.11-.623a.9.9 0 0 1-.002-.506l1.095-3.84L15.544.647a2.215 2.215 0 0 1 3.159.016zM7.184 1.817c.496 0 .898.407.898.909a.903.903 0 0 1-.898.909H3.592c-.992 0-1.796.814-1.796 1.817v10.906c0 1.004.804 1.818 1.796 1.818h10.776c.992 0 1.797-.814 1.797-1.818v-3.635c0-.502.402-.909.898-.909s.898.407.898.91v3.634c0 2.008-1.609 3.636-3.593 3.636H3.592C1.608 19.994 0 18.366 0 16.358V5.452c0-2.007 1.608-3.635 3.592-3.635z",
    },
    {
      href: "/user/payments",
      label: "Payments",
      svgPath:
        "M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1zm-3 8a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1m-2-1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2zm2 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1m-2-1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2z",
    },
    {
      href: "/user/account",
      label: "Account Statement",
      svgPath:
        "M2.5 3A1.5 1.5 0 0 0 1 4.5V5h14v-.5A1.5 1.5 0 0 0 13.5 3zM15 7H1v4.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5zM3 10.25a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75m3.75-.75a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5z",
    },
  ];

  const menuVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: "0%",
      opacity: 1,
      transition: { type: "spring", stiffness: 60, damping: 15 },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: { type: "spring", stiffness: 60, damping: 15 },
    },
  };
  return (
    <>
      {isMenu && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={menuVariants}
          className="fixed z-20 flex w-screen h-full md:hidden"
        >
          <motion.div className="flex flex-col justify-between w-4/5 h-screen p-5 bg-white">
            <div>
              <div className="flex items-center space-x-2">
                <img
                  src="/images/logo/BA.svg"
                  className="w-[10px] h-[10px]"
                  alt=""
                />

                <div className="flex space-x-1 font-sans text-xs text-primary">
                  <span className="font-bold">BUYERS</span>
                  <span>CENTER</span>
                </div>
              </div>
              <div className="flex justify-center mt-5">
                <Link
                  href="/"
                  className="p-2 text-center text-white rounded-md bg-primary"
                >
                  Back to Homepage
                </Link>
              </div>

              <div className="mt-6 space-y-4">
                {links.map((link, index) => (
                  <Link
                    onClick={() => setIsMenu(false)}
                    key={index}
                    href={link.href}
                    className={`flex ${
                      path == link.href ? "text-primary" : "text-black"
                    } items-center space-x-2 text-xs`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                    >
                      <path fill="currentColor" d={link.svgPath}></path>
                    </svg>
                    <p>{link.label}</p>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
          <div
            onClick={() => setIsMenu(false)}
            className="w-1/5 bg-black bg-opacity-50"
          ></div>
        </motion.div>
      )}
    </>
  );
}
