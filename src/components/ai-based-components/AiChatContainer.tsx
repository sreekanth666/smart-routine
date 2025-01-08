import { useEffect, useRef } from "react";
import PromptInputForm from "./PromptInputForm";

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

const Message = ({ message }: { message: AIMessageType }) => {
  const isUser = message.senderType === "user";

  return (
    <div
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`flex max-w-[80%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        } items-end gap-2`}
      >
        <img
          src={message.imageUrl}
          alt={`${message.senderType} avatar`}
          className="h-8 w-8 rounded-full object-cover"
        />
        <div
          className={`rounded-2xl px-4 py-2 ${
            isUser
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-gray-200 text-gray-900 rounded-bl-none"
          }`}
          dangerouslySetInnerHTML={{ __html: message.messageContent }}
        ></div>
      </div>
    </div>
  );
};

function AiChatContainer({
  messages,
  onSendMessage,
  isRoutinePage = false,
}: AiChatContainerParams) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToLatestMessage = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToLatestMessage();
  }, [messages]);

  return (
    <div className="relative h-screen flex flex-col bg-white">
      {/* Messages container with bottom padding to prevent messages from being hidden behind input */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="p-4 space-y-4">
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Fixed input container at the bottom */}
      {!isRoutinePage && (
        <div className="fixed bottom-0 w-[78%] left-[19.7rem] bg-white border-t shadow-lg">
          <div className="max-w-screen-xl mx-auto p-4">
            <PromptInputForm onSendMessage={onSendMessage} isHidden={false} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AiChatContainer;
