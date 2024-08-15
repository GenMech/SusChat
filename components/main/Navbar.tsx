"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center gap-5 justify-between py-4 px-3 rounded-xl z-10 ml-3 h-[95%] w-64 bg-gradient-to-tr from-[#00a766]/10 to-[#999999]/10 overflow-hidden transition-all">
      <div className="flex items-center justify-center w-full z-10">
        <div className="flex items-center gap-6 py-4 pl-4 w-full">
          <button className="">
            <Image
              src="/voyex-logo.png"
              alt="voyex logo"
              width={24}
              height={24}
            />
          </button>
          <Link href="/" className="text-xl text-white font-bold">
            Voyex.
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full items-center justify-center overflow-y-scroll pb-2">
        {/* <div className="w-full">
          <button className="flex items-center w-full px-4 py-3 bg-none">
            <Image
              src="/chatgpt.png"
              alt="chatgpt logo"
              width={24}
              height={24}
            />
            <span className="text-base text-white font-medium ml-2">
              ChatGPT
            </span>
            <span className="text-xs text-white font-normal ml-[10px]">
              Text
            </span>
          </button>
          <button className="flex items-center w-full px-4 py-3 bg-none">
            <Image src="/gemini.png" alt="gemini logo" width={24} height={24} />
            <span className="text-base text-white font-medium ml-2">
              Gemini
            </span>
            <span className="text-xs text-white font-normal ml-[10px]">
              Text/Image
            </span>
          </button>
          <button className="flex items-center w-full px-4 py-3 bg-none">
            <Image
              src="/synthesia.png"
              alt="synthesia logo"
              width={24}
              height={24}
            />
            <span className="text-base text-white font-medium ml-2">
              Synthesia
            </span>
            <span className="text-xs text-white font-normal ml-[10px]">
              Image
            </span>
          </button>
        </div> */}

        <div className="flex flex-col items-center w-full gap-2 z-10">
          <Link
            href="/search"
            className={`flex items-center w-full py-3 pl-5 bg-none hover:text-fontlight ${
              pathname.includes("search") ? "text-fontlight" : "text-fontfaded"
            }`}
          >
            <Image
              src="/search.png"
              alt="search logo"
              width={24}
              height={24}
              className={`i ${pathname.includes("search") ? "img" : ""}`}
              // className="img"
            />
            <span className="text-base font-medium ml-2">Search</span>
          </Link>
          <Link
            href="/templates"
            className={`flex items-center w-full py-3 pl-5 bg-none hover:text-fontlight 
            ${
              pathname.includes("templates")
                ? "text-fontlight"
                : "text-fontfaded"
            }
          `}
          >
            <Image
              src="/clipboard-text.png"
              alt="chatgpt logo"
              width={24}
              height={24}
              className={`i ${pathname.includes("templates") ? "img" : ""}`}
              // className="img"
            />
            <span className="text-base font-medium ml-2">Templates</span>
          </Link>
          <Link
            href="/galactimart"
            className={`flex items-center w-full py-3 pl-5 bg-none hover:text-fontlight ${
              pathname.includes("galactimart")
                ? "text-fontlight"
                : "text-fontfaded"
            }`}
          >
            <Image
              src="/shopping-bag.png"
              alt="shopping-bag logo"
              width={24}
              height={24}
              className={`i ${pathname.includes("galactimart") ? "img" : ""}`}
              // className="img"
            />
            <span className="text-base font-medium ml-2">GalactiMart</span>
          </Link>
          <Link
            href="/workspace"
            className={`flex items-center w-full py-3 pl-5 bg-none hover:text-fontlight ${
              pathname.includes("workspace")
                ? "text-fontlight"
                : "text-fontfaded"
            }`}
          >
            <Image
              src="/lock.png"
              alt="lock logo"
              width={24}
              height={24}
              className={`i ${pathname.includes("workspace") ? "img" : ""}`}
              // className="img"
            />
            <span className="text-base font-medium ml-2">Workspace</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 w-full z-10">
        <button className="text-btnlime text-base font-medium py-3 w-full rounded-xl bg-none capitalize">
          sign up
        </button>
        <button className="text-fontlight text-base font-medium py-3 w-full rounded-xl bg-btnlime capitalize">
          log in
        </button>
      </div>
    </div>
  );
}

export default Navbar;
