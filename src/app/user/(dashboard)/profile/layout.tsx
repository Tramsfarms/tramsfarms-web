"use client";

import type React from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { User } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import constant from "../../../../../utils/constant";

interface ProfileLink {
  name: string;
  link: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const links: ProfileLink[] = [
  {
    name: "Personal Information",
    link: "/vendors/profile",
    icon: User,
    description: "Your personal details and contact information",
  },
];

export default function VendorProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Calculate progress based on completed sections
  const completedSections = links.filter((link) => {
    // Add your logic here to determine if a section is completed
    // For now, we'll just check if the path matches
    return pathname === link.link;
  }).length;

  const progress = (completedSections / links.length) * 100;

  return (
    <div className="container p-4 space-y-6 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Welcome! Let's make your shop live!
          </CardTitle>
          <CardDescription className="text-base">
            Complete all the sections below to take your shop live.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Progress value={progress} className="flex-1 h-2" />
            <span className="text-sm font-medium">
              {completedSections}/{links.length} completed
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {links.map((link) => {
              const isActive = pathname === link.link;
              return (
                <Link key={link.name} href={link.link}>
                  <Card
                    className={cn(
                      "transition-colors hover:bg-muted/50",
                      isActive && "bg-primary text-white hover:bg-primary/90"
                    )}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <link.icon
                          className={cn(
                            "h-5 w-5",
                            isActive
                              ? "text-primary-foreground"
                              : "text-muted-foreground"
                          )}
                        />
                        <CardTitle
                          className={cn(
                            "text-base font-medium",
                            !isActive && "text-foreground"
                          )}
                        >
                          {link.name}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p
                        className={cn(
                          "text-sm",
                          isActive
                            ? "text-primary-foreground/90"
                            : "text-muted-foreground"
                        )}
                      >
                        {link.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">{children}</CardContent>
      </Card>
    </div>
  );
}
