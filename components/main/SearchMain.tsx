"use client";

import { ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import TypewriterComponent from "typewriter-effect";
import { BsSend } from "react-icons/bs";
import { UseCases } from "@/lib/constant";

interface SearchMainProp {
  messages: any[];
  error: string | null;
  userInput: string;
  setShowChat: Function;
  setUserInput: Function;
  handleSendMessage: Function;
}

function SearchMain({
  messages,
  error,
  userInput,
  setShowChat,
  setUserInput,
  handleSendMessage,
}: SearchMainProp) {
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (userInput === "") {
        return;
      }
      setShowChat(true);
      handleSendMessage();
    }
  };

  const handleButtonPress = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowChat(true);
    handleSendMessage();
  };

  return (
    <div className="flex flex-col items-center max-w-[500px] w-full">
      <h1 className="text-8xl text-white font-bold">Voyex.</h1>
      <div className="flex items-center gap-1 text-2xl font-normal mt-5">
        Search for
        <span className="text-green-600">
          <TypewriterComponent
            options={{
              strings: UseCases,
              autoStart: true,
              loop: true,
              delay: 80,
            }}
          />
        </span>
      </div>

      <form
        action=""
        className="flex items-center justify-between gap-2 w-full mt-5 px-3 border border-[#d0d5dd] rounded-full"
      >
        <CiSearch className="text-4xl" />
        <input
          type="text"
          value={userInput}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUserInput(e.target.value)
          }
          onKeyDown={handleKeyPress}
          className="outline-none bg-transparent py-3 w-full placeholder:text-base placeholder:text-fontlight placeholder:font-normal"
          placeholder="Start your search voyex 🚀"
        />
        <button
          className={`py-3 flex items-center justify-center w-9 h-8 rounded-full ${
            userInput ? "bg-white text-black" : "bg-transparent text-white"
          } border`}
          onClick={handleButtonPress}
        >
          <BsSend />
        </button>
      </form>

      <div className="flex flex-col-reverse gap-2 text-base text-fontlight font-normal w-full mt-6">
        <button className="italic p-3 border border-[#d0d5dd] rounded-full">
          🔥 Recently Added
        </button>
        <div className="flex items-center gap-2 w-full">
          <button className=" italic p-3 border border-[#d0d5dd] rounded-full w-1/2">
            🔥 Surprise ME!
          </button>
          <button className="italic p-3 border border-[#d0d5dd] rounded-full w-1/2">
            🔥 Trending Searches
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchMain;
