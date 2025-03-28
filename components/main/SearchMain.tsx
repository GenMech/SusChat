"use client";

import { ChangeEvent, KeyboardEvent, MouseEvent, useCallback } from "react";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import TypewriterComponent from "typewriter-effect";
import { BsSend } from "react-icons/bs";
import { UseCases } from "@/lib/constant";
import { LuClock4 } from "react-icons/lu";
import TrendingModal from "./TrendingModal";
import RecentlyAddedModal from "./RecentlyAddedModal";

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
  const [predictiveText, setPredictiveText] = useState<string>("");
  const [showTrendingModal, setShowTrendingModal] = useState<boolean>(false);
  const [showRecentlyAddedModal, setShowRecentlyAddedModal] =
    useState<boolean>(false);

  // Dummy as of now, Will be replaced by the response provided by API
  const suggestions = [
    "I want to create content for marketing",
    "I want to develop a marketing strategy",
    "I want to improve my marketing",
    "I want to learn about marketing",
  ];

  // For now Dummmy Data
  const trendingSearches = [
    "Tell me latest marketing strategies",
    "How can I Boost Sales in 2024?",
    "What are the Top 10 Marketing Tools?",
    "Suggest me tools to improve user retention",
    "What can I do to improve acquisition?",
    "What is the optimised was to improve SEO?",
    "Suggest me some tools to visualize my websites analytics",
    "What are popular tools for marketing?",
  ];

  // Dummy Data
  const recentlyAddedItems = [
    {
      image: "/gpt-png.png",
      name: "Chat GPT",
      description:
        "ChatGPT is a chatbot and virtual assistant developed by OpenAI and launched on November 30, 2022. Based on large language models, it enables users to refine and steer a conversation. We’ve trained a model called ChatGPT which interacts in a conversational way. The dialogue format makes it possible for ChatGPT to answer followup questions, admit its mistakes, challenge incorrect premises, and reject inappropriate requests.",
      link: "https://openai.com/blog/chatgpt/",
    },
    {
      image: "/gpt-png.png",
      name: "Chat GPT",
      description:
        "ChatGPT is a chatbot and virtual assistant developed by OpenAI and launched on November 30, 2022. Based on large language models, it enables users to refine and steer a conversation. We’ve trained a model called ChatGPT which interacts in a conversational way. The dialogue format makes it possible for ChatGPT to answer followup questions, admit its mistakes, challenge incorrect premises, and reject inappropriate requests.",
      link: "https://openai.com/blog/chatgpt/",
    },
    {
      image: "/gpt-png.png",
      name: "Chat GPT",
      description:
        "ChatGPT is a chatbot and virtual assistant developed by OpenAI and launched on November 30, 2022. Based on large language models, it enables users to refine and steer a conversation. We’ve trained a model called ChatGPT which interacts in a conversational way. The dialogue format makes it possible for ChatGPT to answer followup questions, admit its mistakes, challenge incorrect premises, and reject inappropriate requests..",
      link: "https://openai.com/blog/chatgpt/",
    },
    {
      image: "/gpt-png.png",
      name: "Chat GPT",
      description:
        "ChatGPT is a chatbot and virtual assistant developed by OpenAI and launched on November 30, 2022. Based on large language models, it enables users to refine and steer a conversation. We’ve trained a model called ChatGPT which interacts in a conversational way. The dialogue format makes it possible for ChatGPT to answer followup questions, admit its mistakes, challenge incorrect premises, and reject inappropriate requests.",
      link: "https://openai.com/blog/chatgpt/",
    },
  ];

  const handleTrendingClick = (query: string) => {
    setUserInput(query);
    setShowTrendingModal(false);
    setShowSuggestions(false);
  };

  const handleSurpriseClick = () => {
    const randomSearch =
      trendingSearches[Math.floor(Math.random() * trendingSearches.length)];
    setUserInput(randomSearch);
    setShowSuggestions(false);
  };

  const closeTrendingModal = useCallback(() => {
    setShowTrendingModal(false);
  }, []);

  const closeRecentlyAddedModal = useCallback(() => {
    setShowRecentlyAddedModal(false);
  }, []);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!userInput.trim()) {
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();

      setShowChat(true);
      handleSendMessage();
    } else if (e.key === "Tab" || e.key === "ArrowRight") {
      // To auto fill in search bar
      e.preventDefault();
      setUserInput(userInput + predictiveText);
      setPredictiveText("");
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUserInput(input);
    setShowSuggestions(true);

    if (input === "") {
      setPredictiveText("");
    } else {
      const match = suggestions.find((suggestion) =>
        suggestion.toLowerCase().startsWith(input.toLowerCase())
      );

      if (match) {
        setPredictiveText(match.substring(input.length));
      } else {
        setPredictiveText("");
      }
    }
  };

  const handleButtonPress = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!userInput.trim()) {
      return;
    }
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
          } hover:shadow-md hover:border-[#46BA3C] group`}
        >
          <CiSearch className="text-4xl" />
          <div className="relative w-full">
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              className="outline-none bg-transparent py-3 w-full placeholder:text-base placeholder:text-fontlight placeholder:font-normal"
              placeholder="Start your search voyex 🚀"
            />
            {predictiveText && (
              <span className="absolute top-0 left-0 py-3 pointer-events-none opacity-50 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                <span>{userInput}</span>
                <span className="text-[#ebe7e7]">{predictiveText}</span>
              </span>
            )}
          </div>
          <button
            className={`py-3 pr-[2px] flex items-center justify-center w-9 h-8 rounded-full ${
              userInput
                ? "bg-white text-black transform transition-transform duration-200 rotate-45"
                : "bg-transparent text-white transform transition-transform duration-200 group-hover:rotate-45 group-hover:text-[#46BA3C]"
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
                  className="px-4 py-2 flex items-center text-white hover:bg-[#012b29] rounded-lg cursor-pointer"
                  onClick={() => {
                    setUserInput(suggestion);
                    setShowSuggestions(false);
                    setPredictiveText("");
                  }}
                >
                  <span className="mr-2">
                    <LuClock4 />
                  </span>
                  <span className="text-sm font-normal">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div
        className={`flex flex-col-reverse gap-3 text-base text-fontlight font-normal w-full ${
          showSuggestions && userInput ? "mt-[196px]" : "mt-10"
        }`}
      >
        <button
          className="italic p-3 border border-[#d0d5dd] rounded-md transition-all duration-200 ease-in-out hover:shadow-md hover:border-[#46BA3C]"
          onClick={() => setShowRecentlyAddedModal(true)}
        >
          <span className="transition-transform duration-200 ease-in-out hover:scale-110 inline-block w-full">
            🔥 Recently Added
          </span>
        </button>
        <div className="flex items-center gap-3 w-full">
          <button
            className="italic p-3 border border-[#d0d5dd] rounded-md w-1/2 transition-all duration-200 ease-in-out hover:shadow-md hover:border-[#46BA3C]"
            onClick={handleSurpriseClick}
          >
            <span className="transition-transform duration-200 ease-in-out hover:scale-110 inline-block w-full">
              🔥 Surprise ME!
            </span>
          </button>
          <button
            className="italic p-3 border border-[#d0d5dd] rounded-lg w-1/2 transition-all duration-200 ease-in-out hover:shadow-md hover:border-[#46BA3C]"
            onClick={() => setShowTrendingModal(true)}
          >
            <span className="transition-transform duration-200 ease-in-out hover:scale-110 inline-block w-full">
              🔥 Trending Searches
            </span>
          </button>
        </div>
      </div>
      {showTrendingModal && (
        <>
          <TrendingModal
            trendingSearches={trendingSearches}
            onClose={closeTrendingModal}
            onQueryClick={handleTrendingClick}
          />
        </>
      )}
      {showRecentlyAddedModal && (
        <RecentlyAddedModal
          recentlyAddedItems={recentlyAddedItems}
          onClose={closeRecentlyAddedModal}
        />
      )}
    </div>
  );
}

export default SearchMain;
