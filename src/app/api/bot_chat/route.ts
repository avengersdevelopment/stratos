import { NextResponse } from "next/server";
import redis from "@/utils/redis";
import openai from "@/utils/openai";
import { getChapterPrompts } from "@/data/prompts";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

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
    return await redis.lrange(redisKey, -30, -1);
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

function formatHistoryForPrompt(history: ChatMessage[]) {
  const formattedHistory = {
    messages: history.map((msg) => ({
      messageNo: msg.messageNo,
      timestamp: msg.timestamp,
      sender: msg.character,
      sender_role: msg.role,
      content: msg.message,
    })),
  };
  return JSON.stringify(formattedHistory, null, 2);
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
    const { chapter_id, session_id } = await request.json();

    if (!chapter_id || !session_id) {
      return NextResponse.json(
        {
          error: true,
          message: "chapter_id and session_id are required",
          data: null,
        },
        { status: 400 },
      );
    }

    const { systemPrompt, humanPrompt } = getChapterPrompts(chapter_id);
    const chatHistory = await getStoredChat(chapter_id, session_id);
    const historyString = formatHistoryForPrompt(chatHistory);

    console.log(historyString)
    const messages: ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: humanPrompt
          .replace(
            "{text}",
            "Create a bubble message that respond to the chat history before, if the president ask, answer the president",
          )
          .replace("{history}", historyString),
      },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages,
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error("No response from OpenAI");
    }

    const parsedResponse = JSON.parse(responseContent);
    const formattedResponse: ChatMessage = {
      messageNo: getNextMessageNumber(chatHistory),
      timestamp: getCurrentTimestamp(),
      character: parsedResponse.character,
      message: parsedResponse.message,
      character_id: parsedResponse.character_id,
      role: parsedResponse.role,
    };

    const redisKey = `chat:${chapter_id}:${session_id}`;
    const stored = await storeChat(redisKey, formattedResponse);

    if (!stored) {
      console.warn("Failed to store chat history in Redis");
    }

    return NextResponse.json(
      {
        error: false,
        message: "Message stored successfully",
        data: formattedResponse,
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