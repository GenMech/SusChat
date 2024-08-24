import ChatInput from "@/components/main/ChatInput";
import ChatTop from "@/components/main/ChatTop";
import ChatBotMessage from "@/components/main/ChatBotMessage";
import ChatAside from "@/components/main/ChatAside";
import { useState } from "react";

interface ChatBotContainerProp {
  messages: any[];
  error: string | null;
  userInput: string;
  setUserInput: Function;
  handleSendMessage: Function;
  handleNewConversation: Function;
  isLoading: boolean;
  setShowChat: Function;
}

function ChatBotContainer({
  messages,
  error,
  userInput,
  setUserInput,
  handleSendMessage,
  handleNewConversation,
  isLoading,
  setShowChat,
}: ChatBotContainerProp) {
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);

  return (
    <div className="relative flex flex-col justify-between w-full h-full mb-24">
      <ChatTop messages={messages} setShowChat={setShowChat} />

      <div className="flex items-start justify-between gap-8 w-full px-5 mt-5">
        <ChatBotMessage
          messages={messages}
          error={error}
          isLoading={isLoading}
          setBotTyping={setIsBotTyping}
        />
        <ChatAside />
      </div>

      <ChatInput
        userInput={userInput}
        setUserInput={setUserInput}
        handleSendMessage={handleSendMessage}
        handleNewConversation={handleNewConversation}
        isLoading={isLoading}
        isBotTyping={isBotTyping}
      />
    </div>
  );
}

export default ChatBotContainer;
