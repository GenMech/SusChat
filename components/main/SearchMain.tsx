"use client";

import { ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import TypewriterComponent from "typewriter-effect";
import { BsSend } from "react-icons/bs";
import { UseCases } from "@/lib/constant";
import { LuClock4 } from "react-icons/lu";

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
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  // Dummy as of now, Will be replaced by the response provided by API
  const suggestions = [
    "I want to create content for marketing",
    "I want to develop a marketing strategy",
    "I want to improve my marketing",
    "I want to learn about marketing",
  ];

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

      <div className="relative w-full">
        <form
          action=""
          className={`flex items-center justify-between gap-2 w-full mt-5 px-3 border ${
            showSuggestions && userInput
              ? "rounded-t-lg bg-[#31313140] backdrop-blur-[3.4px] border-x-[#46BA3C] border-t-[#46BA3C]"
              : "rounded-full border-[#d0d5dd] "
          }`}
        >
          <CiSearch className="text-4xl" />
          <input
            type="text"
            value={userInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setUserInput(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={handleKeyPress}
            className="outline-none bg-transparent py-3 w-full placeholder:text-base placeholder:text-fontlight placeholder:font-normal"
            placeholder="Start your search voyex 🚀"
          />
          <button
            className={`py-3 pr-[1px] flex items-center justify-center w-9 h-8 rounded-full ${
              userInput ? "bg-white text-black" : "bg-transparent text-white"
            } border`}
            onClick={handleButtonPress}
          >
            <BsSend />
          </button>
        </form>
        {showSuggestions && userInput && (
          <div className="absolute top-[65px] left-0 w-full bg-[#31313140] backdrop-blur-[3.4px] border border-x-[#46BA3C] border-b-[#46BA3C] border-t-transparent rounded-b-lg z-10 mt-1 p-2">
            <ul className="py-2">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 flex items-center text-white hover:bg-[#012b29] cursor-pointer"
                  onClick={() => {
                    setUserInput(suggestion);
                    setShowSuggestions(false);
                  }}
                >
                  <span className="mr-2">
                    <LuClock4 />
                  </span>
                  <span className="text-sm font-light">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

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
