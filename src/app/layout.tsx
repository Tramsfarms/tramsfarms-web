import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReactQueryClientProvider } from "../../utils/ReactQueryClientProvider";
import "./globals.css";
import "../styles/globals.css";
import { ChatProvider } from "@/utils/ChatProvider";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Tramsfarms",
  description: "Nigerian's Trusted Agro Marketplace",
};

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"], // Adjust subsets if needed
  weight: ["400", "500", "600", "700"], // Specify the weights you want
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4751677734250385"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-M794CJ1Q0L`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M794CJ1Q0L', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body
        className={` antialiased ${poppins.className} h-screen overflow-x-hidden`}
      >
        <ChatProvider>
          <ReactQueryClientProvider>
            {children}
            <ToastContainer />
          </ReactQueryClientProvider>
        </ChatProvider>
      </body>
    </html>
  );
}
