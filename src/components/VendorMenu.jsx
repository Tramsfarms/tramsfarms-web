"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function VendorMenu({ isMenu, setIsMenu }) {
  const path = usePathname();

  const links = [
    {
      href: "/vendors",
      label: "Orders",
      svgPath:
        "M5.72 14.456l1.761-.508l10.603-10.73a.456.456 0 0 0-.003-.64l-.635-.642a.443.443 0 0 0-.632-.003L6.239 12.635zM18.703.664l.635.643c.876.887.884 2.318.016 3.196L8.428 15.561l-3.764 1.084a.9.9 0 0 1-1.11-.623a.9.9 0 0 1-.002-.506l1.095-3.84L15.544.647a2.215 2.215 0 0 1 3.159.016zM7.184 1.817c.496 0 .898.407.898.909a.903.903 0 0 1-.898.909H3.592c-.992 0-1.796.814-1.796 1.817v10.906c0 1.004.804 1.818 1.796 1.818h10.776c.992 0 1.797-.814 1.797-1.818v-3.635c0-.502.402-.909.898-.909s.898.407.898.91v3.634c0 2.008-1.609 3.636-3.593 3.636H3.592C1.608 19.994 0 18.366 0 16.358V5.452c0-2.007 1.608-3.635 3.592-3.635z",
    },
    {
      href: "/vendors/products",
      label: "Products",
      svgPath:
        "M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1zm-3 8a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1m-2-1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2zm2 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1m-2-1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2z",
    },
    {
      href: "/vendors/promotions",
      label: "Promotions",
      svgPath:
        "M5.5 7A1.5 1.5 0 0 1 4 5.5A1.5 1.5 0 0 1 5.5 4A1.5 1.5 0 0 1 7 5.5A1.5 1.5 0 0 1 5.5 7m15.91 4.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.11 0-2 .89-2 2v7c0 .55.22 1.05.59 1.41l8.99 9c.37.36.87.59 1.42.59s1.05-.23 1.41-.59l7-7c.37-.36.59-.86.59-1.41c0-.56-.23-1.06-.59-1.42",
    },
    {
      href: "/vendors/account",
      label: "Account Statement",
      svgPath:
        "M2.5 3A1.5 1.5 0 0 0 1 4.5V5h14v-.5A1.5 1.5 0 0 0 13.5 3zM15 7H1v4.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5zM3 10.25a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75m3.75-.75a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5z",
    },
    {
      href: "/vendors/advertise",
      label: "Advertise your Products",
      svgPath:
        "M9 2.5a.5.5 0 0 0-.849-.358l-2.927 2.85H3.5a1.5 1.5 0 0 0-1.5 1.5v2.99a1.5 1.5 0 0 0 1.5 1.5h1.723l2.927 2.875A.5.5 0 0 0 9 13.5zm1.111 2.689a.5.5 0 0 1 .703-.08l.002.001l.002.002l.005.004l.015.013l.046.04q.055.05.142.142c.113.123.26.302.405.54c.291.48.573 1.193.573 2.148c0 .954-.282 1.668-.573 2.148a3.4 3.4 0 0 1-.405.541a3 3 0 0 1-.202.196l-.008.007h-.001s-.447.243-.703-.078a.5.5 0 0 1 .075-.7l.002-.002l-.001.001l.002-.001h-.001l.018-.016q.028-.025.085-.085a2.4 2.4 0 0 0 .284-.382c.21-.345.428-.882.428-1.63s-.218-1.283-.428-1.627a2.4 2.4 0 0 0-.368-.465l-.018-.016a.5.5 0 0 1-.079-.701m1.702-2.08a.5.5 0 1 0-.623.782l.011.01l.052.045q.072.063.201.195c.17.177.4.443.63.794c.46.701.92 1.733.92 3.069a5.5 5.5 0 0 1-.92 3.065c-.23.35-.46.614-.63.79a4 4 0 0 1-.252.24l-.011.01h-.001a.5.5 0 0 0 .623.782l.033-.027l.075-.065c.063-.057.15-.138.253-.245a6.4 6.4 0 0 0 .746-.936a6.5 6.5 0 0 0 1.083-3.614a6.54 6.54 0 0 0-1.083-3.618a6.5 6.5 0 0 0-.745-.938a5 5 0 0 0-.328-.311l-.023-.019l-.007-.006l-.002-.002z",
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
                  <span className="font-bold">SELLERS</span>
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

            <div>
              <div className="p-3 mt-8 text-white rounded-md bg-primary">
                Advertise your produce
              </div>
              <div className="flex items-center mt-2 space-x-2">
                <img
                  src="https://plus.unsplash.com/premium_photo-1686269460470-a44c06f16e0a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
                <div>
                  <h1>TramsFarm</h1>
                  <h1>Description</h1>
                </div>
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
