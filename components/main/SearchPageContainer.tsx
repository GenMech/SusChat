"use client";

import React from "react";

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
  const [sessionID, setSessionID] = useState<number | null>(null);

  useEffect(() => {
    const generateSessionID = (): number => {
      return Date.now() + Math.floor(Math.random() * 10000);
    };

    setSessionID(generateSessionID());
  }, []);

  const handleSendMessage = async () => {
    try {
      if (!userInput.trim()) {
        return;
      }
      setIsLoading(true);
      setError(null);
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
        body: JSON.stringify({ user_input: userInput, session_id: sessionID }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      const data = await response.json();
      console.log("data:", data);
      const botMessage: Message = {
        text: data.content ?? "Failed to get response. Please try again!",
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
      setShowChat={setShowChat}
      isLoading={isLoading}
    />
  );
}

export default SearchPageContainer;
