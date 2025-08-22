"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const [acceptTerms, setAcceptTerms] = useState(false);

  return (
    <div className="bg-background">
      {/* Main Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 bg-[#25252E] text-white">
        <div className="flex items-center justify-center p-6 md:p-10">
          <img
            src="/images/logo/WWt.svg"
            className="w-full max-w-[200px]"
            alt="Tramsfarms Logo"
          />
        </div>

        <div className="flex flex-col justify-center p-6 space-y-4 md:p-10">
          <div>
            <h2 className="text-lg font-bold text-[#d9d9d9]">
              New to Tramsfarms?
            </h2>
            <p className="text-sm text-[#d9d9d9]">
              Subscribe to our newsletter to get updates on our latest offers!
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center w-full max-w-sm space-x-2">
              <Input
                type="email"
                placeholder="Email"
                className="bg-[#3a3a47] border-[#3a3a47] text-white placeholder:text-gray-400"
              />
              <Button variant="primary" type="submit">
                Subscribe
              </Button>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(!!checked)}
                className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label htmlFor="terms" className="text-xs text-[#d9d9d9]">
                I agree to Tramsfarm's Privacy and Cookie Policy.
                <br />
                You can unsubscribe from newsletters at any time.
                <br />I accept the Legal Terms.
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-6 space-y-4 md:p-10">
          <div>
            <h2 className="text-lg font-bold text-[#d9d9d9]">
              Payment Methods
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              <img
                src="/images/cards/paystack.svg"
                className="h-8"
                alt="Paystack"
              />
              <img
                src="/images/cards/flutterwave.svg"
                className="h-8"
                alt="Flutterwave"
              />
              <img src="/images/cards/visa.svg" className="h-8" alt="Visa" />
              <img
                src="/images/cards/mastercard.svg"
                className="h-8"
                alt="Mastercard"
              />
              <img src="/images/cards/verve.svg" className="h-8" alt="Verve" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="px-5">
        <div className="grid grid-cols-1 gap-8 px-6 md:grid-cols-3 lg:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-[#25252E]">Need Help</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/chat"
                  className="text-muted-foreground hover:text-[#25252E] transition-colors"
                >
                  Chat with us
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-muted-foreground hover:text-[#25252E] transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-[#25252E] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="https://blog.tramsfarms.com/"
                  className="text-muted-foreground hover:text-[#25252E] transition-colors"
                  target="_blank"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/** C2g91EMe7FWc1W6Tpxid1M2dsPBXafYmkcyWAthSjJva */}

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-[#25252E]">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/report"
                  className="text-muted-foreground hover:text-[#25252E] transition-colors"
                >
                  Report a product
                </Link>
              </li>
              <li>
                <Link
                  href="/refund"
                  className="text-muted-foreground hover:text-[#25252E] transition-colors"
                >
                  Return & Refund Timeline
                </Link>
              </li>
              <li>
                <Link
                  href="/delivery"
                  className="text-muted-foreground hover:text-[#25252E] transition-colors"
                >
                  Delivery options & timelines
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-[#25252E]">
              About Tramsfarms
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-[#25252E] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-[#25252E] transition-colors"
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-[#25252E] transition-colors"
                >
                  Privacy Notice
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col items-center justify-between px-6 sm:flex-row">
          {/* <div className="flex flex-row">
            <Link
              href="https://www.facebook.com/share/198gSkKzTN/"
              className="transition-colors text-muted-foreground hover:text-primary"
            >
              <Facebook className="w-5 h-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="https://x.com/tramsfarms1"
              className="transition-colors text-muted-foreground hover:text-primary"
            >
              <Twitter className="w-5 h-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://www.instagram.com/tramsfarms?igsh=ajQ4aWN4am14NGg3"
              className="transition-colors text-muted-foreground hover:text-primary"
            >
              <Instagram className="w-5 h-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="https://youtube.com"
              className="transition-colors text-muted-foreground hover:text-primary"
            >
              <Youtube className="w-5 h-5" />
              <span className="sr-only">YouTube</span>
            </Link>
          </div> */}

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tramsfarms. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
