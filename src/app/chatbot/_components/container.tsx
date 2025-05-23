"use client";

import { IStory, stories } from "@/utils/stories";
import { cn } from "@/utils/classname";
import { generateUUID } from "@/utils/string";
import axios from "axios";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeftIcon, SendIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Tooltip } from "react-tooltip";

interface IChat {
  messageNo: number;
  timestamp: string;
  character: string;
  role: string;
  character_id: string;
  message: string;
  characterDescription: string;
  characterTagline: string;
}

interface IModalOpen {
  isOpen: boolean;
  title: string;
  description: string;
  type: string;
}

interface IContainerProps {
  chapterId: string;
}

const defaultChapterId = "presidential-crisis";
const totalMessage = 50;

export default function Container({
  chapterId = defaultChapterId,
}: IContainerProps) {
  const isBranch = chapterId !== defaultChapterId;

  const router = useRouter();
  const listRef = useRef<HTMLDivElement>(null);

  const [sessionId, setSessionId] = useState<string>(
    localStorage.getItem("sessionId") || "",
  );
  const [detail, setDetail] = useState<IStory | null>(null);
  const [chats, setChats] = useState<IChat[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isRefresh, setIsRefresh] = useState<boolean>(false);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isUserChatLoading, setIsUserChatLoading] = useState<boolean>(false);
  const [isBotChatLoading, setIsBotChatLoading] = useState<boolean>(false);
  const [isAllDisabled, setIsAllDisabled] = useState<boolean>(false);
  const [endingModal, setEndingModal] = useState<IModalOpen>({
    isOpen: false,
    title: "",
    description: "",
    type: "",
  });

  const handleGetChats = async () => {
    const body = {
      chapter_id: chapterId,
      session_id: sessionId,
    };

    await axios.get("/api/get_chat", { params: body }).then((res) => {
      const data = res?.data?.data || [];

      if (!isUserChatLoading) {
        setChats(data || []);
        if (isBotChatLoading) {
          setIsBotChatLoading(false);
        }

        if (data?.[data?.length - 1]?.messageNo >= totalMessage) {
          setIsAllDisabled(true);
        } else {
          setTimeout(
            () => {
              handlePostBotChat();
              setIsLoaded(true);
            },
            !isLoaded ? 0 : 2000 + Math.random() * 2000,
          );
        }
      }
    });
  };

  const handlePostBotChat = async () => {
    setIsBotChatLoading(true);

    const body = {
      chapter_id: chapterId,
      session_id: sessionId,
    };

    await axios.post("/api/bot_chat", body).then((res) => {
      if (!isUserChatLoading) {
        setIsRefresh(!isRefresh);
      }
    });
  };

  const handlePostUserChat = async () => {
    setIsUserChatLoading(true);

    const body = {
      chapter_id: chapterId,
      session_id: sessionId,
      message: message ?? "",
    };

    await axios.post("/api/user_chat", body).then((res) => {
      setMessage("");
      setIsUserChatLoading(false);

      const lastMessage = chats?.[chats?.length - 1];
      const newMessage = {
        messageNo: lastMessage?.messageNo + 1,
        timestamp: new Date().toISOString(),
        character: "President Trump",
        role: "President",
        character_id: "99",
        message: message,
        characterDescription: "",
        characterTagline: "",
      };

      setChats([...chats, newMessage]);
      setIsRefresh(!isRefresh);
    });
  };

  const handleRetry = () => {
    const uuid = generateUUID();
    localStorage.setItem("sessionId", uuid);

    router.push("/chatbot");
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [chats]);

  useEffect(() => {
    if (sessionId) {
      setSessionId(localStorage.getItem("sessionId") || "");
    } else {
      const uuid = generateUUID();
      localStorage.setItem("sessionId", uuid);
      setSessionId(uuid);
    }
  }, [sessionId]);

  useEffect(() => {
    if (sessionId && chapterId) {
      setDetail(stories?.find((item) => item?.id === chapterId) || null);
    }
  }, [sessionId, chapterId]);

  useEffect(() => {
    if (sessionId && chapterId) {
      handleGetChats();
    }
  }, [sessionId, chapterId, isRefresh]);

  useEffect(() => {
    if (isAllDisabled && isBranch) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isAllDisabled]);

  return (
    <main className="relative">
      <section className="relative h-screen w-full bg-[url('/assets/chatbot/bg3.png')] bg-cover bg-no-repeat">
        <div className="absolute left-1/2 top-[-0.5vh] w-[48vw] -translate-x-1/2">
          <div className="relative size-full">
            <Image
              alt=""
              className="size-full"
              width={500}
              height={500}
              src={"/assets/chatbot/header-addendum.png"}
            />
            <span className="absolute left-1/2 top-[8vh] -translate-x-1/2 text-[5vw] font-black text-[#CD8C41]">
              Chat/Title
            </span>
          </div>
        </div>
        {/* <div className="mx-auto w-full max-w-full px-4 py-4 md:max-w-[90vw]">
          <Link href="/">
            <button className="flex items-center gap-2 py-2 hover:animate-shake">
              <ChevronLeftIcon className="h-6 w-6 text-[#0CC7F6]" />
              <span className="text-sm font-medium text-[#0CC7F6] md:text-base">
                BACK TO HOMEPAGE
              </span>
            </button>
          </Link>
        </div> */}
        {/* <div className="flex flex-col items-center justify-center">
          <Image
            src="/assets/chatbot/line-top.svg"
            alt="ARC 1"
            width={480}
            height={480}
            className="h-auto w-full"
          />
          <div className="flex flex-col items-center justify-center px-4 py-4">
            <div className="mb-2 flex items-center gap-2">
              <Image
                src="/assets/chatbot/header-icon.svg"
                alt="ARC 1"
                width={480}
                height={480}
                className="h-5 w-auto md:h-6"
              />
              <h4 className="text-base font-bold text-[#0CC7F6] md:text-lg">
                ARC {isBranch ? "2" : "1"}: {detail?.title}
              </h4>
            </div>
            <p className="max-w-[640px] text-center text-xs text-[#0CC7F6] md:text-sm">
              {detail?.description}
            </p>
          </div>
          <Image
            src="/assets/chatbot/line-bottom.svg"
            alt="ARC 1"
            width={480}
            height={480}
            className="h-auto w-full"
          />
        </div> */}
        <div className="mx-auto flex h-full w-full max-w-full items-end overflow-hidden px-4 py-4 md:max-w-[60vw]">
          <div className={cn("flex h-full w-full flex-col justify-between")}>
            <div
              ref={listRef}
              className={cn(
                "mt-[11vw] w-full overflow-y-auto pt-8",
                isAllDisabled ? "h-full" : "h-full",
              )}
              style={{ scrollbarWidth: "none" }}
            >
              <div className="flex flex-col gap-4">
                {chats?.map((item, index) => {
                  if (item?.role === "President") {
                    return (
                      <div className="flex justify-end" key={index}>
                        <div className="flex max-w-[90%] gap-2">
                          <div className="">
                            <div className="flex items-end gap-2">
                              <h4 className="text-sm font-bold text-[#CD8C41]">
                                Me
                              </h4>
                              <p className="text-nowrap text-xs text-[#94A3B8] md:text-sm">
                                {format(new Date(item?.timestamp), "HH:mm a")}
                              </p>
                            </div>
                            <div className="mt-2 rounded bg-[#CD8C41] p-2">
                              <p className="text-[2vw] text-[#2E1D17]">
                                {item?.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div className="flex justify-start" key={index}>
                        <div className="flex max-w-[90%] gap-2">
                          <Image
                            src={`/assets/character-list/portrait-0${item?.character_id}.png`}
                            alt="ARC 1"
                            width={480}
                            height={480}
                            className="h-10 w-10 bg-cover md:h-12 md:w-12"
                            data-tooltip-id={`tooltip-${index}`}
                          />
                          <Tooltip
                            id={`tooltip-${index}`}
                            place="right"
                            disableStyleInjection
                            opacity={1}
                            className="w-full max-w-[280px] md:max-w-[480px]"
                          >
                            <div className="w-full max-w-[480px] border border-[#CD8C41] bg-[#2E1D17] p-4 font-main font-semibold">
                              <div className="mb-4 flex items-center gap-2">
                                <Image
                                   src={`/assets/character-list/portrait-0${item?.character_id}.png`}
                                  alt="ARC 1"
                                  width={480}
                                  height={480}
                                  className="h-10 w-10 bg-cover md:h-12 md:w-12"
                                />
                                <div>
                                  <h4 className="text-sm font-bold text-[#CD8C41] md:text-base">
                                    {item?.character}
                                  </h4>
                                  <p className="text-nowrap text-xs text-[#CD8C41]">
                                    {item?.role}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <p className="text-xs text-[#CD8C41]">
                                  {item?.characterDescription}
                                </p>
                              </div>
                            </div>
                          </Tooltip>
                          <div className="">
                            <div className="flex items-end gap-2">
                              <h4 className="text-sm font-bold text-[#CD8C41] md:text-base">
                                {item?.character} - {item?.role}
                              </h4>
                              <p className="text-nowrap text-xs text-[#CD8C41]/80 md:text-sm">
                                {format(new Date(item?.timestamp), "HH:mm a")}
                              </p>
                            </div>
                            <div className="mt-2 rounded bg-[#633F33] p-2">
                              <p className="text-[2vw] text-[#CD8C41]">
                                {item?.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
                <AnimatePresence>
                  {isBotChatLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex animate-pulse items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#0CC7F6]/50"></div>
                        <div className="h-2 w-2 rounded-full bg-[#0CC7F6]/50"></div>
                        <div className="h-2 w-2 rounded-full bg-[#0CC7F6]/50"></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="py-4">
              <AnimatePresence>
                {isAllDisabled && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="mb-4"
                  >
                    <div>
                      <p className="mb-2 text-sm text-[#CD8C41] md:text-base">
                        Choose the answer to repond:
                      </p>
                      <div className="grid grid-cols-3 gap-4">
                        {detail?.options?.map((item, index) => {
                          if (!item?.url) {
                            return (
                              <button
                                key={index}
                                className="min-h-full w-full rounded-lg border border-[#CD8C41] bg-[#633F33] p-1 text-xs text-[#CD8C41] transition-all"
                                onClick={() =>
                                  setEndingModal({
                                    isOpen: true,
                                    title: item?.title,
                                    description: item?.description,
                                    type: item?.type,
                                  })
                                }
                              >
                                {item?.option}
                              </button>
                            );
                          }

                          return (
                            <Link href={item?.url ?? ""} key={index}>
                              <button
                                key={index}
                                className="p-1text-sm min-h-full w-full rounded-lg border border-[#CD8C41] bg-[#633F33] text-[#CD8C41] transition-all hover:brightness-125"
                              >
                                {item?.option}
                              </button>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-x-[0.5vw] border-y-[0.5vw] border-[#CD8C41] bg-[#2E1D17] px-4 py-4 text-[#CD8C41] text-[2vw] focus:outline-none placeholder:text-[#CD8C41]/50"
                  placeholder="Ask anything from here"
                  value={message}
                  disabled={isUserChatLoading || isAllDisabled}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && message && !isAllDisabled) {
                      handlePostUserChat();
                    }
                  }}
                />
                <div className="absolute right-[2vw] top-1/2 -translate-y-1/2">
                  <button
                    className="flex h-10 w-10 items-center justify-center"
                    disabled={isUserChatLoading || !message || isAllDisabled}
                    onClick={() => {
                      if (message && !isAllDisabled) {
                        handlePostUserChat();
                      }
                    }}
                  >
                    <Image
                      alt=""
                      height={500}
                      width={500}
                      src="/assets/chatbot/send.png"
                      className="h-full w-full hover:animate-shake"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AnimatePresence>
        {isAllDisabled && isBranch && endingModal?.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-0 top-0 h-screen w-full bg-black/50"
          >
            <div className="flex h-full w-full items-center justify-center">
              <div className="w-full max-w-[640px] px-4">
                <motion.div
                  initial={{ y: 80 }}
                  animate={{ y: 0 }}
                  exit={{ y: 100 }}
                  className="h-full w-full border border-[#0CC7F6] bg-[#062630] px-4 py-8"
                >
                  <div className="flex flex-col items-center gap-4">
                    <h2 className="text-center text-2xl font-bold text-[#0CC7F6] md:text-4xl">
                      {endingModal?.title}
                    </h2>
                    <p className="mb-4 text-center text-sm text-[#0CC7F6]">
                      {endingModal?.description}
                    </p>
                    <p className="mb-4 text-center text-sm text-[#0CC7F6]">
                      You have {endingModal?.type} Ending, Play Again to see
                      Another 8 Ending!
                    </p>
                    <button
                      className="box-border w-[160px] border border-[#0CC7F6] bg-[#063B49] px-4 py-4 text-sm text-[#94A3B8] hover:animate-shake md:w-[240px] md:text-base"
                      onClick={() => handleRetry()}
                    >
                      Retry
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
