"use client";
import React from "react";
import { Chat } from "stream-chat-react";
import { chatClient } from "@/utils/streamClient";

export const ChatProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Chat client={chatClient} theme="messaging light">
      {children}
    </Chat>
  );
};
