import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { FcFaq } from "react-icons/fc";

interface MessageProp {
  messages: any[];
  error: string | null;
}

export const typeText = (
  setBotMessage: React.Dispatch<React.SetStateAction<Record<number, string>>>,
  index: number,
  text: string,
  speed: number
) => {
  let charIndex = 0;
  const interval = setInterval(() => {
    setBotMessage((prev) => {
      const currentText = prev[index] || "";
      const newText = currentText + text.charAt(charIndex);
      if (charIndex >= text.length - 1) {
        clearInterval(interval);
      }
      return {
        ...prev,
        [index]: newText,
      };
    });
    charIndex++;
  }, speed);
};

function ChatBotMessage({ messages, error }: MessageProp) {
  const ref = useRef<HTMLDivElement>(null);
  const [botMessage, setBotMessage] = useState<Record<number, string>>({});

  useEffect(() => {
    if (ref.current === null) return;
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  useEffect(() => {
    messages.forEach((msg, index) => {
      if (msg.role !== "user" && !botMessage[index]) {
        typeText(setBotMessage, index, msg.text, 20);
      }
    });
  }, [messages, botMessage]);

  return (
    <>
      <ScrollArea className="relative w-full h-[80vh] pt-3 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`pb-3 ${
              msg.role === "user" ? "self-end" : "self-start"
            }`}
            ref={index + 1 == messages.length ? ref : null} // If the message is last one or latest one
          >
            <div
              className={`flex flex-col gap-2 ${
                msg.role === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`flex items-center gap-2 ${
                  msg.role === "user" ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <p className="">{msg.role === "user" ? "You" : "Voyex AI"}</p>
                <span className="w-7 h-7 rounded-full overflow-hidden">
                  <Image alt="emoji" height={40} width={40} src="/emoji.png" />{" "}
                </span>
              </div>
              <>
                <p
                  className={`text-base text-fontlight font-normal px-4 py-2 rounded-lg ${
                    msg.role === "user"
                      ? "bg-userbubble w-max"
                      : "bg-botbubble max-w-[80%]"
                  } whitespace-pre-line`}
                >
                  {msg.role === "user" ? msg.text : botMessage[index] || ""}
                </p>
                <p
                  className={`text-xs italic w-full ${
                    msg.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  {msg.timestamp.toLocaleString()}
                </p>
              </>
            </div>
          </div>
        ))}
        <div ref={ref} />
        {messages.length === 0 && (
          <div className="absolute flex items-center justify-center w-full h-full">
            <div className="flex flex-col items-center text-white/50">
              <FcFaq className="text-7xl" />
              <h1 className="text-3xl capitalize">nothing here!!!</h1>
            </div>
          </div>
        )}
      </ScrollArea>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
    </>
  );
}

export default ChatBotMessage;
