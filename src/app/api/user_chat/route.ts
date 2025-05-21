import { NextResponse } from "next/server";
import redis from "@/utils/redis";

interface ChatMessage {
  messageNo: number;
  timestamp: string;
  character: string;
  role: string;
  character_id: string;
  message: string;
}

async function getStoredChat(chapterId: string, sessionId: string): Promise<ChatMessage[]> {
  try {
    const redisKey = `chat:${chapterId}:${sessionId}`;
    return await redis.lrange(redisKey, 0, -1);
  } catch (error) {
    console.error("Error getting stored chat:", error);
    return [];
  }
}

async function storeChat(
  key: string,
  message: ChatMessage,
  expiry: number = 86400,
): Promise<boolean> {
  try {
    await redis.rpush(key, JSON.stringify(message));
    await redis.expire(key, expiry);
    return true;
  } catch (error) {
    console.error("Error storing chat:", error);
    return false;
  }
}

function getCurrentTimestamp(): string {
  return new Date().toISOString();
}

function getNextMessageNumber(chatHistory: ChatMessage[]): number {
  if (chatHistory.length === 0) return 1;
  const lastMessage = chatHistory[chatHistory.length - 1];
  return lastMessage.messageNo + 1;
}

export async function POST(request: Request) {
  try {
    const { chapter_id, session_id, message } = await request.json();

    if (!chapter_id || !session_id || !message) {
      return NextResponse.json(
        { error: "chapter_id, session_id, and message are required" },
        { status: 400 },
      );
    }

    const chatHistory = await getStoredChat(chapter_id, session_id);
    console.log(chatHistory)

    const presidentMessage: ChatMessage = {
      messageNo: getNextMessageNumber(chatHistory),
      timestamp: getCurrentTimestamp(),
      character: "President Trump",
      role: "President",
      character_id: "99",
      message: message,
    };

    const redisKey = `chat:${chapter_id}:${session_id}`;
    const stored = await storeChat(redisKey, presidentMessage);

    if (!stored) {
      console.warn("Failed to store chat history in Redis");
      return NextResponse.json(
        {
          error: true,
          message: "Failed to store message",
          data: null,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        error: false,
        message: "Message stored successfully",
        data: presidentMessage,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      {
        error: true,
        message: "Internal server error",
        data: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}