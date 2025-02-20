"use client";

import { getModelId } from "@/app/chatbot/_components/action";
import { Chat } from "@/app/chatbot/_components/chat-section";
import { generateUUID } from "@/utils/string";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Container() {
  const id = generateUUID();

  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);

  useEffect(() => {
    const fetchModelId = async () => {
      const modelId = await getModelId();
      setSelectedModelId(modelId);
    };
    fetchModelId();
  }, []);

  if (!selectedModelId) {
    return <></>;
  }

  return (
    <main className="relative h-screen w-full bg-[url('/assets/chatbot/bg3.png')] bg-cover bg-no-repeat">
      <div className="absolute left-1/2 top-[-0.5vh] w-[48vw] -translate-x-1/2">
        <div className="relative size-full">
          <Image
            alt=""
            className="size-full"
            width={500}
            height={500}
            src={"/assets/chatbot/header-addendum.png"}
          />
          <span className="absolute left-1/2 -translate-x-1/2 top-[8vh] text-[5vw] font-black text-[#CD8C41]">
      Chat/Title
          </span>
        </div>
      </div>
      <div className="col-span-1 h-screen content-center text-center px-[15vw]">
        <Chat
          key={id}
          id={id}
          initialMessages={[]}
          selectedModelId={selectedModelId}
        />
      </div>
    </main>
  );
}
