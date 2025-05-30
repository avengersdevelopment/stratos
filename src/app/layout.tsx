import Aos from "@/components/aos";
import Providers from "@/components/providers";
import { createClient } from "@/utils/supabase/server";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import { twMerge } from "tailwind-merge";
import "./globals.css";


const main = localFont({
  src: [
    {
      path: "../../public/assets/fonts/Penthouse-Serial.ttf",
      weight: "400",
    },
  ],
  variable: "--font-main",
});

export const metadata: Metadata = {
  title: "Stratos",
  description: "App Description",
  openGraph: {
    title: "Stratos",
    description: "App Description",
    url: "/",
    images: [
      {
        url: "/preview.png",
        alt: "App Preview",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: configs } = await supabase.from("configs").select();

  return (
    <>
      <Aos />
      <html lang="en" className="relative">
        <body className={twMerge(main.variable, "font-main antialiased")}>
          <Providers config={configs?.[0] || null}>{children}</Providers>
        </body>
      </html>
    </>
  );
}
