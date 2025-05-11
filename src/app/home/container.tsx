"use client";

import Header from "@/components/header";
import { useCharacterStore } from "@/store/character-store";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { useState } from "react";

export default function Container() {
  const [isHovered, setIsHovered] = useState(false);
  const { character } = useCharacterStore();

  const CharImage: Record<string, string> = {
    blade: "/assets/homepage/char/blade.png",
    brute: "/assets/homepage/char/brute.png",
    bee: "/assets/homepage/char/bee.png",
  };

  const CharGif: Record<string, string> = {
    blade: "/assets/select-character/blade1.gif",
    brute: "/assets/select-character/brute1.gif",
    bee: "/assets/select-character/bee1.gif",
  };

  const imgSrc = CharImage[character!];
  const gifSrc = CharGif[character!];

  return (
    <>
      <section className="h-auto">
        <section className="relative h-[37.5dvh] w-full bg-[url('/assets/homepage/bg.png')] bg-cover bg-center md:h-[75dvh]">
          <Header />
          <Image
            src={"/assets/homepage/bigframe.png"}
            alt="bg-1"
            width={480}
            height={480}
            className="absolute bottom-0 left-[36.7vw] w-[25.5vw]"
          />
          <div className="absolute bottom-[10vh] left-[20vw] flex w-[9vw] flex-col items-center">
            <Image
              src={"/assets/homepage/logo.png"}
              alt="bg-1"
              width={480}
              height={480}
              className="h-auto w-[20vw]"
            />
            <p className="text-[3.5vw] font-bold text-[#CD8C41]">STRATOS</p>
          </div>

          <div className="absolute bottom-[5vh] right-[20vw] flex-col items-center gap-[1vw]">
            <div className="relative h-fit w-fit">
              <Image
                src={"/assets/select-character/char-frame.png"}
                alt="title"
                width={480}
                height={480}
                className="h-auto w-[12vw]"
              />
              {isHovered ? (

                <div>
                  <Image
                    src={gifSrc}
                    alt="blade-gif"
                    width={480}
                    height={480}
                    className="absolute bottom-[0.8vw] left-[0.1vw] h-auto w-[30vw] scale-[1.3]"
                  />
                </div>
              ) : (
                <div>
                  <Image
                    src={imgSrc}
                    alt="blade-silhouette"
                    width={480}
                    height={480}
                    className="absolute bottom-[2.4vw] left-[-0.8vw] h-auto w-[13.5vw] max-w-[13.5vw] cursor-pointer"
                  />
                </div>
              )}
            </div>

            <Link
              className="relative mt-3 h-fit flex justify-center items-center w-fit hover:animate-shake"
              href={"/select-character"}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Image
                src={"/assets/homepage/button.png"}
                width={500}
                height={500}
                alt="Button"
                className="w-[12vw]"
              />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[1.4vw] font-bold uppercase text-[#2E1D18]">
                {character}
              </span>
            </Link>
          </div>
        </section>
        <section className="flex w-full overflow-hidden">
          {/* <Marquee speed={60} className="h-full"> */}
            {Array.from({ length: 9 }).map((_, i) => (
              <Image
                key={i}
                src={`/assets/character-list/portrait-0${i + 1}.png`}
                alt="bg-1"
                width={400}
                height={400}
                className="h-[12.5dvh] w-auto md:h-[24.2vh]"
              />
            ))}
          {/* </Marquee> */}
        </section>
      </section>
      <section className="relative h-[50dvh] w-full bg-[url('/assets/chatbot/bg3.png')] bg-cover bg-center md:h-screen">
        <div className="mb-[6vh] flex h-full w-full gap-[2vw] px-[2vw] pb-[6vh] pt-[18vh]">
          <div className="relative h-full w-1/3 rounded-xl bg-[#CD8C41]">
            <Image
              src={"/assets/homepage/section2/CHAR2.png"}
              alt="bg-1"
              width={480}
              height={480}
              className="absolute bottom-0 right-0 w-[10vw]"
            />
          </div>
          <div className="relative h-full w-1/3 rounded-xl bg-[#CD8C41]">
            <Image
              src={"/assets/homepage/section2/CHAR1.png"}
              alt="bg-1"
              width={480}
              height={480}
              className="absolute yop-0 left-0 w-[10vw]"
            />
          </div>
          <div className="relative h-full w-1/3 rounded-xl bg-[#CD8C41]">
            <Image
              src={"/assets/homepage/section2/CHAR3.png"}
              alt="bg-1"
              width={480}
              height={480}
              className="absolute bottom-0 right-0 w-[10vw]"
            />
          </div>
        </div>
      </section>
      <section className="relative flex h-[50dvh] w-full items-center justify-center bg-[url('/assets/homepage/bg2.png')] bg-cover bg-center md:h-screen">
        <div className="flex w-[30vw] items-center justify-center rounded-lg bg-black/30 p-5">
          <div className="text-[2.5vw] font-bold text-[#CD8C41]">
            Text or Something
          </div>
        </div>

        <Image
          src={"/assets/homepage/char-left.png"}
          alt="bg-1"
          width={480}
          height={480}
          className="absolute bottom-0 left-0 w-[30vw]"
        />

        <Image
          src={"/assets/homepage/char-right.png"}
          alt="bg-1"
          width={480}
          height={480}
          className="absolute bottom-0 right-0 w-[30vw]"
        />
      </section>
    </>
  );
}
