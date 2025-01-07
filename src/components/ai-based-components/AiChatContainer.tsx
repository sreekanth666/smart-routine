import { useEffect, useRef } from "react";
import PromptInputForm from "./PromptInputForm";
import UserQuery from "./UserQuery";
import AiReply from "./AiReply";

export type AIMessageType = {
  senderType: "user" | "AI";
  imageUrl: string;
  messageContent: string;
};

type AiChatContainerParams = {
  messages: AIMessageType[];
  onSendMessage: (userMessage: string) => void;
  isRoutinePage?: boolean;
};

function AiChatContainer({
  messages,
  onSendMessage,
  isRoutinePage = false,
}: AiChatContainerParams) {
  // Ref to track the last message element
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Function to scroll to the latest message
  const scrollToLatestMessage = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToLatestMessage();
  }, [messages]);

  const chat = messages.map((message, index) => {
    if (message.senderType === "user") {
      return (
        <UserQuery
          key={index}
          imageUrl={message.imageUrl}
          query={message.messageContent}
        />
      );
    } else {
      return (
        <AiReply
          key={index}
          imageUrl={message.imageUrl}
          aiMessage={message.messageContent}
        />
      );
    }
  });

  return (
    <div className="h-8">
      {/* Prompt Messages Container - Modify the height according to your need */}
      <div className="flex h-[97vh] w-full flex-col">
        {/* Prompt Messages */}
        <div className="flex-1 space-y-6 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-corner-rounded-full scrollbar-thumb-slate-400 scrollbar-track-slate-300 hover:scrollbar-thumb-slate-500 active:scrollbar-thumb-slate-600 rounded-xl bg-slate-200 p-4 text-sm leading-6 text-slate-900 shadow-sm sm:text-base sm:leading-7">
          {chat}
          <div ref={messagesEndRef}></div>
        </div>
        {/* Prompt message input */}
        <PromptInputForm
          onSendMessage={onSendMessage}
          isHidden={isRoutinePage}
        />
      </div>
    </div>
  );
}

export default AiChatContainer;
