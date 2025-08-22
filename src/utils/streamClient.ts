import { StreamChat } from "stream-chat";

const STREAM_API_KEY = "2ke4wehahpeu";

if (!STREAM_API_KEY) {
  throw new Error("Stream API Key is missing in environment variables");
}

export const chatClient = StreamChat.getInstance(STREAM_API_KEY);
