"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  useCreateChatClient,
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
  ChannelList,
} from "stream-chat-react";
import { EmojiPicker } from "stream-chat-react/emojis";
import { init, SearchIndex } from "emoji-mart";
import data from "@emoji-mart/data";
import "stream-chat-react/dist/css/v2/index.css";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

// Initialize emoji data
init({ data });

// Stream Chat API key
const apiKey = "2ke4wehahpeu";

export default function MessagesPage() {
  const [isLoading, setIsLoading] = useState(true);

  // Get user data from cookies
  const userId = Cookies.get("stream_id");
  const userToken = Cookies.get("stream_token");
  const userName = Cookies.get("user_name") || "User";

  // Create user object for Stream Chat
  const user = {
    id: userId,
    name: userName,
    image: `https://getstream.io/random_png/?name=${userName}`,
  };

  // Initialize Stream Chat client
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: userToken,
    userData: user,
  });

  // Channel filters and options
  const filters = { type: "messaging", members: { $in: [userId] } };
  const sort = { last_message_at: -1 };
  const options = { limit: 10, state: true, watch: true, presence: true };

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!client) {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent className="h-[600px] flex items-center justify-center">
            <div className="space-y-4 text-center">
              <Skeleton className="w-12 h-12 mx-auto rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[600px]">
            <Chat client={client} theme="messaging light">
              <div className="flex h-full">
                {/* Channel List */}
                <div className="w-64 border-r border-border">
                  <ChannelList
                    filters={filters}
                    //sort={sort}
                    options={options}
                    showChannelSearch
                    // loadingIndicator={
                    //   <div className="p-4 space-y-4">
                    //     {Array(5)
                    //       .fill(0)
                    //       .map((_, i) => (
                    //         <div
                    //           key={i}
                    //           className="flex items-center space-x-3"
                    //         >
                    //           <Skeleton className="w-10 h-10 rounded-full" />
                    //           <div className="space-y-2">
                    //             <Skeleton className="w-24 h-3" />
                    //             <Skeleton className="w-32 h-3" />
                    //           </div>
                    //         </div>
                    //       ))}
                    //   </div>
                    // }
                  />
                </div>

                {/* Chat Window */}
                <div className="flex-1">
                  <Channel
                    EmojiPicker={EmojiPicker}
                    emojiSearchIndex={SearchIndex}
                  >
                    <Window>
                      <ChannelHeader />
                      <Separator />
                      <MessageList />
                      <MessageInput focus audioRecordingEnabled />
                    </Window>
                    <Thread />
                  </Channel>
                </div>
              </div>
            </Chat>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
