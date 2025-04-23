"use client";

import Header from "@/components/header";
import { blade, brute, bee, useCharacterStore } from "@/store/character-store";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Container() {
  const [isBladeHovered, setIsBladeHovered] = useState(false);
  const [isBruteHovered, setIsBruteHovered] = useState(false);
  const [isBeeHovered, setIsBeeHovered] = useState(false);

  const { setCharacter } = useCharacterStore();

  return (
    <main className="relative h-screen w-full bg-[url('/assets/select-character/bg.png')] bg-cover bg-center">
      <Header />

      <div className="flex h-full w-full items-center justify-center gap-[2vw]">
        <div className="flex flex-col items-center gap-[2vw]">
          <div className="relative h-fit w-fit">
            <Image
              src={"/assets/select-character/char-frame.png"}
              alt="title"
              width={480}
              height={480}
              className="h-auto w-[15vw]"
            />

            {isBladeHovered ? (
              <div>
                <Image
                  src={"/assets/select-character/blade1.gif"}
                  alt="blade-gif"
                  width={480}
                  height={480}
                  className="absolute bottom-[1vw] left-[0.1vw] h-auto w-[30vw] scale-125"
                />
              </div>
            ) : (
              <div>
                <Image
                  src={"/assets/select-character/blade-silhouette.png"}
                  alt="blade-silhouette"
                  width={480}
                  height={480}
                  className="absolute bottom-[3vw] left-[2.5vw] h-auto w-[10vw] cursor-pointer"
                />
              </div>
            )}
          </div>

          <Link
            className="relative h-fit w-fit hover:animate-shake"
            href={"/home"}
            onClick={() => setCharacter(blade)}
            onMouseEnter={() => setIsBladeHovered(true)}
            onMouseLeave={() => setIsBladeHovered(false)}
          >
            <Image
              src={"/assets/homepage/button.png"}
              width={500}
              height={500}
              alt="Button"
              className="w-[14vw]"
            />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[2vw] font-bold text-[#2E1D18]">
              BLADE
            </span>
          </Link>
        </div>

        <div className="flex flex-col items-center gap-[2vw]">
          <div className="relative h-fit w-fit">
            <Image
              src={"/assets/select-character/char-frame.png"}
              alt="title"
              width={480}
              height={480}
              className="h-auto w-[15vw]"
            />

            {isBruteHovered ? (
              <div>
                <Image
                  src={"/assets/select-character/brute1.gif"}
                  alt="brute-gif"
                  width={480}
                  height={480}
                  className="absolute bottom-[1vw] left-[0.1vw] h-auto w-[30vw] scale-125"
                />
              </div>
            ) : (
              <div>
                <Image
                  src={"/assets/select-character/brute-silhouette.png"}
                  alt="brute-silhouette"
                  width={480}
                  height={480}
                  className="absolute bottom-[3vw] left-[1.4vw] h-auto w-[12vw] cursor-pointer"
                />
              </div>
            )}
          </div>

          <Link
            className="relative h-fit w-fit hover:animate-shake"
            href={"/home"}
            onClick={() => setCharacter(brute)}
            onMouseEnter={() => setIsBruteHovered(true)}
            onMouseLeave={() => setIsBruteHovered(false)}
          >
            <Image
              src={"/assets/homepage/button.png"}
              width={500}
              height={500}
              alt="Button"
              className="w-[14vw]"
            />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[2vw] font-bold text-[#2E1D18]">
              BRUTE
            </span>
          </Link>
        </div>

        <div className="flex flex-col items-center gap-[2vw]">
          <div className="relative h-fit w-fit">
            <Image
              src={"/assets/select-character/char-frame.png"}
              alt="title"
              width={480}
              height={480}
              className="h-auto w-[15vw]"
            />

            {isBeeHovered ? (
              <div>
                <Image
                  src={"/assets/select-character/bee1.gif"}
                  alt="bee-gif"
                  width={480}
                  height={480}
                  className="absolute bottom-[1vw] left-[0.1vw] h-auto w-[30vw] scale-125"
                />
              </div>
            ) : (
              <div>
                <Image
                  src={"/assets/select-character/bee-silhouette.png"}
                  alt="bee-silhouette"
                  width={480}
                  height={480}
                  className="absolute bottom-[3vw] left-[1.7vw] h-auto w-[11vw] cursor-pointer"
                />
              </div>
            )}
          </div>

          <Link
            className="relative h-fit w-fit hover:animate-shake"
            href={"/home"}
            onClick={() => setCharacter(bee)}
            onMouseEnter={() => setIsBeeHovered(true)}
            onMouseLeave={() => setIsBeeHovered(false)}
          >
            <Image
              src={"/assets/homepage/button.png"}
              width={500}
              height={500}
              alt="Button"
              className="w-[14vw]"
            />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[2vw] font-bold text-[#2E1D18]">
              BEE
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
