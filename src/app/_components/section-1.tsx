"use client";

import Image from "next/image";
import Link from "next/link";

export const Section1 = () => {
  return (
    <section className="relative h-screen w-full bg-[url('/assets/homepage/bg.png')] bg-cover bg-no-repeat">
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

      <div className="flex h-full w-full flex-col items-center justify-center gap-[2vw]">
        <Image
          src={"/assets/homepage/logo.png"}
          alt="logo"
          width={480}
          height={480}
          className="h-auto w-[20vw]"
        />

        <p className="text-bold text-[4vw] text-[#CD8C41]">STRATOS</p>

        <Link className="relative h-fit w-fit hover:animate-shake" href={"/select-character"}>
          <Image
            src={"/assets/homepage/button.png"}
            width={500}
            height={500}
            alt="Button"
            className="w-[18vw]"
          />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[2.5vw] font-bold text-[#2E1D18]">
            EMBARK
          </span>
        </Link>
      </div>
    </section>
  );
};
