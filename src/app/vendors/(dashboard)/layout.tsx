"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ClipboardList,
  Home,
  Menu,
  MessageSquare,
  Package,
  Receipt,
  Store,
  Volume2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const links: SidebarLink[] = [
  {
    href: "/vendors",
    label: "Orders",
    icon: ClipboardList,
  },
  {
    href: "/vendors/products",
    label: "Products",
    icon: Package,
  },
  {
    href: "/vendors/messages",
    label: "Messages",
    icon: MessageSquare,
  },
  {
    href: "/vendors/account",
    label: "Account Statement",
    icon: Receipt,
  },
  {
    href: "/vendors/advertise",
    label: "Advertise Products",
    icon: Volume2,
  },
  {
    href: "/vendors/profile",
    label: "Store Settings",
    icon: Store,
  },
];

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const NavLink = ({ href, label, icon: Icon }: SidebarLink) => {
    const isActive = pathname === href;

    return (
      <Link href={href}>
        <span
          className={cn(
            "group relative flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
            "hover:bg-accent hover:text-accent-foreground",
            isActive
              ? "bg-primary text-white dark:bg-primary dark:text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon
            className={cn(
              "mr-2 h-4 w-4 transition-colors",
              isActive
                ? "text-inherit"
                : "text-muted-foreground group-hover:text-inherit"
            )}
          />
          <span>{label}</span>
          {isActive && (
            <span className="absolute inset-y-0 left-0 w-1 rounded-full bg-primary-foreground" />
          )}
        </span>
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebars */}
      <aside className="hidden w-64 border-r bg-background md:flex md:flex-col">
        <div className="flex flex-col p-4 space-y-6">
          <div className="flex items-center gap-2">
            <img src="/images/logo/BA.svg" alt="Logo" className="w-8 h-8" />
            <div className="flex items-center gap-1 text-sm font-medium text-primary">
              <span className="font-bold">SELLERS</span>
              <span>CENTER</span>
            </div>
          </div>
          <Link href="/">
            <Button className="w-full" variant="primary">
              <Home className="w-4 h-4 mr-2" />
              Back to Homepage
            </Button>
          </Link>
        </div>
        <Separator />
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="flex flex-col space-y-1">
            {links.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>
        </ScrollArea>
        <Separator />
        <div className="p-4">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
            <div className="flex items-center justify-center rounded-full h-9 w-9 bg-primary">
              <Store className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">Your Store</p>
              <p className="text-xs text-muted-foreground">
                Manage your store settings
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-6 h-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="p-4">
            <SheetTitle className="flex items-center gap-2">
              <img src="/images/logo/BA.svg" alt="Logo" className="w-8 h-8" />
              <div className="flex items-center gap-1 text-sm font-medium text-primary">
                <span className="font-bold">SELLERS</span>
                <span>CENTER</span>
              </div>
            </SheetTitle>
            <SheetTitle className="flex items-center gap-2">
              <Link href="/">
                <Button className="w-full" variant="primary">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Homepage
                </Button>
              </Link>
            </SheetTitle>
          </SheetHeader>
          <Separator />
          <ScrollArea className="flex-1 px-3 py-4">

            <nav className="flex flex-col space-y-1">
              {links.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
            </nav>
          </ScrollArea>
          <Separator />
          <div className="p-4">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
              <div className="flex items-center justify-center rounded-full h-9 w-9 bg-primary">
                <Store className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Your Store</p>
                <p className="text-xs text-muted-foreground">
                  Manage your store settings
                </p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-muted/50">
        <div className="flex items-center gap-2 p-4 border-b bg-background md:hidden">
          <img src="/images/logo/BA.svg" alt="Logo" className="w-6 h-6" />
          <div className="flex items-center gap-1 text-sm font-medium text-primary">
            <span className="font-bold">SELLERS</span>
            <span>CENTER</span>
          </div>
        </div>
        <div className="container py-6">{children}</div>
      </main>
    </div>
  );
}
