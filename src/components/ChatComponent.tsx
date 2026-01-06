"use client";
import React, { useState, useEffect } from "react";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
  useChatContext,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MessageCircleMore } from "lucide-react";
import constant from "../../utils/constant";
import Cookies from "js-cookie";

import { EmojiPicker } from "stream-chat-react/emojis";
import { init, SearchIndex } from "emoji-mart";
import data from "@emoji-mart/data";
init({ data });
import "stream-chat-react/dist/css/v2/index.css";
import { Button } from "./ui/button";

const { API_URL } = constant;

const ChatComponent = ({
  chatId,
  title,
}: {
  chatId: number;
  title: string;
}) => {
  const [client, setClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<any>(null);

  useEffect(() => {
    const initChat = async () => {
      const apiKey = "2ke4wehahpeu";
      const userId = Cookies.get("stream_id");
      const userToken = Cookies.get("stream_token");
      const chatClient = StreamChat.getInstance(apiKey);

      // Connect the user
      await chatClient.connectUser(
        {
          id: userId,
          name: "autumn", // Replace with the user's name
          image: "https://getstream.io/random_png/?name=autumn", // Replace with the user's image
        },
        userToken
      );

      // Create or fetch a channel
      const channel = chatClient.channel(
        "messaging",
        `chat_${chatId}${userId}`,
        {
          name: `Chat for ${title}`,
          members: [userId, `user_${chatId}`], // Add both users to the channel
        }
      );

      setClient(chatClient);
      setChannel(channel);
    };

    initChat();

    return () => {
      if (client) client.disconnectUser();
    };
  }, [chatId]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size='lg' variant={'primary'}>
           <MessageCircleMore />
           <p>Send Message</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex mt-8 top-full flex-col bg-white shadow-lg w-80 h-96 md:h-[300px]">
        {client ? (
          <Chat client={client}>
            <Channel
              channel={channel}
              EmojiPicker={EmojiPicker}
              emojiSearchIndex={SearchIndex}
            >
              <Window>
                {/* Chat Header */}
                <ChannelHeader />

                {/* Chat Messages */}
                <MessageList />

                {/* Chat Input */}
                <MessageInput
                  focus
                  additionalTextareaProps={{
                    placeholder: "Type a message...",
                  }}
                  audioRecordingEnabled={true}
                />
              </Window>
              <Thread />
            </Channel>
          </Chat>
        ) : (
          <div>Loading chat...</div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default ChatComponent;
