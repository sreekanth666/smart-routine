import { useEffect, useRef, useState } from "react";
import PromptInputForm from "./PromptInputForm";
import UserQuery from "./UserQuery";
import AiReply from "./AiReply";

type AIMessageType = {
  senderType: "user" | "AI";
  imageUrl: string;
  messageContent: string;
};

const SAMPLE_MESSAGES: AIMessageType[] = [
  {
    senderType: "user",
    imageUrl: "https://dummyimage.com/256x256/363536/ffffff&text=U",
    messageContent: `Explain quantum computing in simple terms`,
  },
  {
    senderType: "AI",
    imageUrl: "https://dummyimage.com/256x256/354ea1/ffffff&text=G",
    messageContent: `<p>
                Certainly! Quantum computing is a new type of computing that
                relies on the principles of quantum physics. Traditional
                computers, like the one you might be using right now, use bits
                to store and process information. These bits can represent
                either a 0 or a 1. In contrast, quantum computers use quantum
                bits, or qubits.
                <br />
                <br />
                Unlike bits, qubits can represent not only a 0 or a 1 but also a
                superposition of both states simultaneously. This means that a
                qubit can be in multiple states at once, which allows quantum
                computers to perform certain calculations much faster and more
                efficiently
              </p>`,
  },
  {
    senderType: "user",
    imageUrl: "https://dummyimage.com/256x256/363536/ffffff&text=U",
    messageContent: `What are three great applications of quantum computing?`,
  },
  {
    senderType: "AI",
    imageUrl: "https://dummyimage.com/256x256/354ea1/ffffff&text=G",
    messageContent: `<p>
                Three great applications of quantum computing are: Optimization
                of complex problems, Drug Discovery and Cryptography.
              </p>`,
  },
];

function PromptContainer() {
  const [messages, setMessages] = useState<AIMessageType[]>(SAMPLE_MESSAGES);

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

  // Function to handle sending user message
  const handleSendMessage = (userMessage: string) => {
    const newUserMessage: AIMessageType = {
      senderType: "user",
      imageUrl: "https://dummyimage.com/256x256/363536/ffffff&text=U",
      messageContent: userMessage,
    };

    // Add user's message to the chat
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    // Add AI reply after a delay
    setTimeout(() => {
      const aiReply: AIMessageType = {
        senderType: "AI",
        imageUrl: "https://dummyimage.com/256x256/354ea1/ffffff&text=G",
        messageContent: `<p>Thank you for your message! Here's a custom AI response.</p>`,
      };

      setMessages((prevMessages) => [...prevMessages, aiReply]);
    }, 1500); // 1.5-second delay for AI response
  };

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
    <div className="h-">
      {/* Prompt Messages Container - Modify the height according to your need */}
      <div className="flex h-[85dvh] w-full flex-col">
        {/* Prompt Messages */}
        <div className=" flex-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-corner-rounded-full scrollbar-thumb-slate-400 scrollbar-track-slate-300 rounded-xl bg-slate-200 p-4 text-sm leading-6 text-slate-900 sm:text-base sm:leading-7 hover:scrollbar-thumb-slate-500 active:scrollbar-thumb-slate-600">
          {chat}
          {/* Dummy div to scroll into view */}
          <div ref={messagesEndRef}></div>
        </div>
        {/* Prompt message input */}
        <PromptInputForm onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default PromptContainer;
