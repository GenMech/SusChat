"use client";

import React from "react";
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

import { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";

import SearchMain from "./SearchMain";
import ChatBotContainer from "@/components/main/ChatBotContainer";

interface Message {
  text: string;
  role: string;
  timestamp: Date;
}

function SearchPageContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [chat, setChat] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showChat, setShowChat] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const apiKey = "AIzaSyB-28-4XA34UY8hIhtuT6FFyA108WiiJWU";
  // const MODEL_NAME = "gemini-1.5-pro";
  // const genAI = new GoogleGenerativeAI(apiKey);

  // const generationConfig = {
  //   temperature: 0.9,
  //   topP: 1,
  //   topK: 1,
  //   maxOutputTokens: 1000,
  //   responseMimeType: "text/plain",
  // };

  // const safetySettings = [
  //   {
  //     category: HarmCategory.HARM_CATEGORY_HARASSMENT,
  //     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  //   },
  //   {
  //     category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
  //     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  //   },
  //   {
  //     category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
  //     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  //   },
  //   {
  //     category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
  //     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  //   },
  // ];

  // useEffect(() => {
  //   const initChat = async () => {
  //     try {
  //       const newChat = await genAI
  //         .getGenerativeModel({ model: MODEL_NAME })
  //         .startChat({
  //           generationConfig,
  //           safetySettings,
  //           history: messages.map((msg) => ({
  //             role: msg.role,
  //             parts: [
  //               {
  //                 text: msg.text,
  //               },
  //             ],
  //             // text: msg.text,
  //           })),
  //         });
  //       setChat(newChat);
  //     } catch (error) {
  //       setError("Failed to initialize chat. Please try again.");
  //     }
  //   };
  //   initChat();
  // }, []);

  const handleSendMessage = async () => {
    try {
      if (!userInput.trim()) {
        return;
      }
      setIsLoading(true);
      const userMessage: Message = {
        text: userInput,
        role: "user",
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setUserInput("");

      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userInput }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      const data = await response.json();
      console.log("data:", data);
      const botMessage: Message = {
        text: data.answer ?? "Failed to get response. Please try again!",
        role: "bot",
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      setError("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewConversation = () => {
    setMessages([]);
    // setChat(null);
  };
  return !showChat ? (
    <SearchMain
      messages={messages}
      error={error}
      userInput={userInput}
      setUserInput={setUserInput}
      setShowChat={setShowChat}
      handleSendMessage={handleSendMessage}
    />
  ) : (
    <ChatBotContainer
      messages={messages}
      error={error}
      userInput={userInput}
      setUserInput={setUserInput}
      handleSendMessage={handleSendMessage}
      handleNewConversation={handleNewConversation}
      isLoading={isLoading}
    />
  );
}

export default SearchPageContainer;
