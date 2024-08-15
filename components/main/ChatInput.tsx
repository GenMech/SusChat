import React, { ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { CiSearch } from "react-icons/ci";
import { TfiReload } from "react-icons/tfi";
import { VscSend } from "react-icons/vsc";

interface ChatInputProp {
  userInput: string;
  setUserInput: Function;
  handleSendMessage: Function;
  handleNewConversation: Function | any;
}

function ChatInput({
  userInput,
  setUserInput,
  handleSendMessage,
  handleNewConversation,
}: ChatInputProp) {
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleButtonPress = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <div className="flex items-center justify-start gap-4 w-full ml-5">
      <form
        action=""
        className="flex items-center justify-between gap-2 max-w-[700px] w-full px-3 border border-[#d0d5dd] bg-fade/10 rounded-lg"
      >
        <div className="flex items-center gap-2 w-full">
          <CiSearch className="text-3xl" />
          <input
            type="text"
            value={userInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUserInput(e.target.value)
            }
            onKeyDown={handleKeyPress}
            className="outline-none bg-transparent py-2 w-full placeholder:text-sm placeholder:text-fontlight placeholder:font-normal"
            placeholder="Message Voyex"
          />
        </div>
        <button className="pl-3 py-3" onClick={handleButtonPress}>
          <VscSend className="-rotate-45" />
        </button>
      </form>
      <button
        className="text-base text-center text-fontlight font-medium rounded-xl bg-btnlime px-4 py-3"
        onClick={handleNewConversation}
      >
        <TfiReload />
      </button>
    </div>
  );
}

export default ChatInput;
