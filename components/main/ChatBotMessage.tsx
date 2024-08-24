import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { FcFaq } from "react-icons/fc";

interface MessageProp {
  messages: any[];
  error: string | null;
  isLoading: boolean;
  setBotTyping: Function;
}

export const typeText = (
  setTypedMessage: React.Dispatch<React.SetStateAction<string>>,
  text: string,
  speed: number,
  setBotTyping: Function
) => {
  setBotTyping(true);
  let charIndex = 0;

  const interval = setInterval(() => {
    const newText = text.slice(0, charIndex + 1);
    setTypedMessage(newText);

    if (charIndex >= text.length - 1) {
      clearInterval(interval);
      setBotTyping(false);
    }

    charIndex++;
  }, speed);
};

function ChatBotMessage({
  messages,
  error,
  isLoading,
  setBotTyping,
}: MessageProp) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [typedMessage, setTypedMessage] = useState<string>("");
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  const isNearBottom = () => {
    if (!scrollContainerRef.current) return false;
    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;
    return scrollHeight - scrollTop - clientHeight < 50;
  };

  useEffect(() => {
    if (shouldAutoScroll) {
      scrollContainerRef.current?.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        // behavior: "smooth",
      });
    }
  }, [messages, typedMessage, shouldAutoScroll]);

  // Detect user scrolling and determine if auto-scroll should be enabled
  useEffect(() => {
    const handleScroll = () => {
      if (isNearBottom()) {
        setShouldAutoScroll(true);
      } else {
        setShouldAutoScroll(false);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const latestMessage = messages[messages.length - 1];
    if (latestMessage && latestMessage.role !== "user") {
      typeText(setTypedMessage, latestMessage.text, 10, setBotTyping);
    }
  }, [messages]);

  const renderedMessages = useMemo(() => {
    return messages.map((msg, index) => (
      <div
        key={index}
        className={`pb-3 ${msg.role === "user" ? "self-end" : "self-start"}`}
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
              {msg.role === "user"
                ? msg.text
                : index === messages.length - 1
                ? typedMessage
                : msg.text}
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
    ));
  }, [messages, typedMessage]);

  return (
    <div
      className="relative w-full h-[80vh] pt-3 overflow-y-auto"
      ref={scrollContainerRef}
    >
      {renderedMessages}
      {(isLoading || error) && (
        <div className="flex flex-col items-start gap-2 pb-3">
          <div className="flex flex-row-reverse gap-2 items-center">
            <p className="">Voyex AI</p>
            <span className="w-7 h-7 rounded-full overflow-hidden">
              <Image alt="emoji" height={40} width={40} src="/emoji.png" />{" "}
            </span>
          </div>
          <div
            className={`flex text-fontlight text-base font-normal px-4 py-2 rounded-lg ${
              isLoading ? "bg-botbubble" : "bg-red-500 border border-red-400"
            } min-w-[18%]`}
          >
            {isLoading ? (
              <>
                Typing<span className="animate-pulse">...</span>
              </>
            ) : (
              <span>{error}</span>
            )}
          </div>
        </div>
      )}
      {messages.length === 0 && (
        <div className="absolute flex items-center justify-center w-full h-full">
          <div className="flex flex-col items-center text-white/50">
            <FcFaq className="text-7xl" />
            <h1 className="text-3xl capitalize">nothing here!!!</h1>
          </div>
        </div>
      )}
      {/* {error && <div className="text-red-500 text-sm mb-4">{error}</div>} */}
    </div>
  );
}

export default ChatBotMessage;
