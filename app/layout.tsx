import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";
import StarsCanvas from "@/components/main/StarBackground";
import Image from "next/image";
import Animate from "@/components/sub/animate";
import StoreProvider from "./StoreProvider";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Voyex | Search for anything",
  description:
    "AI website for easy search with well detailed results in text, image or graphs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body
        className={`${inter.className} relative flex items-center justify-center text-fontlight h-screen w-screen overflow-hidden`}
      >
        <NextTopLoader showSpinner={false} color="#46BA3C" />
        <StarsCanvas />
        <Image
          className="absolute top-0 bottom-0 right-0 left-0 z-0 w-screen h-screen bg-contain"
          src="/background.png"
          alt="background image"
          width={1419}
          height={766}
        />
        <Animate />
        <div className="relative w-full h-full z-[2]">
          <StoreProvider>{children}</StoreProvider>
        </div>
      </body>
    </html>
  );
}
