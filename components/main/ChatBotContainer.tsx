import ChatInput from "@/components/main/ChatInput";
import ChatTop from "@/components/main/ChatTop";
import ChatBotMessage from "@/components/main/ChatBotMessage";
import ChatAside from "@/components/main/ChatAside";

interface ChatBotContainerProp {
  messages: any[];
  error: string | null;
  userInput: string;
  setUserInput: Function;
  handleSendMessage: Function;
  handleNewConversation: Function;
  isLoading: boolean;
}

function ChatBotContainer({
  messages,
  error,
  userInput,
  setUserInput,
  handleSendMessage,
  handleNewConversation,
  isLoading,
}: ChatBotContainerProp) {
  return (
    <div className="relative flex flex-col justify-between w-full h-full mb-24">
      <ChatTop messages={messages} />

      <div className="flex items-start justify-between gap-8 w-full px-5 mt-5">
        <ChatBotMessage
          messages={messages}
          error={error}
          isLoading={isLoading}
        />
        <ChatAside />
      </div>

      <ChatInput
        userInput={userInput}
        setUserInput={setUserInput}
        handleSendMessage={handleSendMessage}
        handleNewConversation={handleNewConversation}
      />
    </div>
  );
}

export default ChatBotContainer;
