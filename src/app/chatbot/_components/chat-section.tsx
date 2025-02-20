'use client';

import { Message as PreviewMessage } from '@/app/chatbot/_components/message';
import type { Attachment, Message } from 'ai';
import { useChat } from 'ai/react';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MultimodalInput } from './multimodal-input';
import Image from 'next/image';

export function Chat({
  id,
  initialMessages,
  selectedModelId
}: {
  id: string;
  initialMessages: Message[];
  selectedModelId: string;
}) {
  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    isLoading,
    stop
  } = useChat({
    body: { id, modelId: selectedModelId },
    initialMessages
  });

  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatContainerRef]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const visibleMessages = messages;

  return (
    <div className='relative h-screen w-full overflow-hidden'>
      <div className='absolute inset-0 bg-contain bg-center bg-no-repeat'>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='relative mx-auto flex h-full w-full flex-col pb-[2vw]'>
            <Link
              href='/'
              className={`absolute right-[20px] top-[20px] cursor-pointer`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='#000000'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-x'
              >
                <path d='M18 6 6 18' />
                <path d='m6 6 12 12' />
              </svg>
            </Link>
            <div
              ref={chatContainerRef}
              className='scrollbar-hide flex-1 overflow-y-auto  p-4 pt-[60px]  flex flex-col justify-end'
            >
              <PreviewMessage
                key={''}
                role={'assistant'}
                content={
                  'hey hey hey'
                }
                attachments={[]}
                toolInvocations={[]}
              />
              {visibleMessages.map((message) => (
                <PreviewMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  attachments={message.experimental_attachments}
                  toolInvocations={message.toolInvocations}
                />
              ))}
            </div>

            <div className='w-full px-[1vw] py-[1vh] bg-[#2E1D17] rounded-[20px] border-[0.7vw] border-[#CE8C44]'>
              <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-4 sm:flex-row'
              >
                <MultimodalInput
                  className='text-base focus:ring-[#A165D7]'
                  input={input}
                  setInput={setInput}
                  handleSubmit={handleSubmit}
                  isLoading={isLoading}
                  stop={stop}
                  attachments={attachments}
                  setAttachments={setAttachments}
                  messages={messages}
                  setMessages={setMessages}
                  append={append}
                />
                <button
                  type='submit'
                  className='rounded-2xl w-[5vw] px-4 py-[10px] hover:animate-shake'
                >
                  <Image alt='' className='w-full' width={500} height={500} src={'/assets/chatbot/send.png'} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
