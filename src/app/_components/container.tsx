"use client";

import Header from "@/components/header";
import { Section1 } from "@/app/_components/section-1";
import { useConfig } from "@/store/config";

export default function Container() {
  // Example useConfig :
  // const xCoinUrl = useConfig()((state) => state.config.x_coin_url);
  // const buyUrl = useConfig()((state) => state.config.buy_url);

  return (
    <main className="relative h-full w-full">
      <Header />
      <Section1 />
    </main>
  );
}
