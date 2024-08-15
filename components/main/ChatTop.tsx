import React from "react";
import { BsClockHistory } from "react-icons/bs";
import { HiOutlineDownload } from "react-icons/hi";
import { HiOutlineSpeakerWave } from "react-icons/hi2";

interface ChatInputProp {
  messages: any[];
}

function ChatTop({ messages }: ChatInputProp) {
  return (
    <div className="sticky top-0 flex items-center justify-between py-1 px-10">
      <h1 className="">
        {messages[0]?.text || "Begin chatting with Voyex AI..."}
      </h1>
      <div className="flex items-center gap-3 text-xl">
        <button className="p-2">
          <BsClockHistory />
        </button>
        <button className="p-2">
          <HiOutlineSpeakerWave />
        </button>
        <button className="p-2">
          <HiOutlineDownload />
        </button>
      </div>
    </div>
  );
}

export default ChatTop;
