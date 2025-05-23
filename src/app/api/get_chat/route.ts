import redis from "@/utils/redis";
import { NextResponse } from "next/server";
import { getCharacter } from "@/utils/description";

interface ChatMessage {
  messageNo: number;
  timestamp: string;
  character: string;
  role: string;
  character_id: string;
  message: string;
  characterDescription: string;
  characterTagline: string;
}

async function getStoredChat(
  chapterId: string,
  sessionId: string,
): Promise<ChatMessage[]> {
  try {
    const redisKey = `chat:${chapterId}:${sessionId}`;
    const chats: ChatMessage[] = await redis.lrange(redisKey, 0, -1);
    
    return chats.map((chat) => {
      if (chat.character_id) {
        try {
          const characterDetails = getCharacter(parseInt(chat.character_id));
          return {
            ...chat,
            characterDescription: characterDetails.description,
            characterTagline: characterDetails.tagline,
          };
        } catch (error) {
          return {
            ...chat,
            description: "No Description found",
            tagline: "No Tagline found",
          };
        }
      }
      return chat;
    });
  } catch (error) {
    console.error("Error getting stored chat:", error);
    return [];
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const chapter_id = url.searchParams.get("chapter_id");
    const session_id = url.searchParams.get("session_id");

    if (!chapter_id || !session_id) {
      throw new Error("Invalid input");
    }

    const chats = await getStoredChat(chapter_id, session_id);

    return NextResponse.json(
      {
        error: false,
        message: "Chats fetched successfully",
        data: chats,
      },
      { status: 200 },
    );
  } catch (error) {
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
