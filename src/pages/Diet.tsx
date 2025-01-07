import { useState } from "react";
import AiChatContainer, {
  AIMessageType,
} from "../components/ai-based-components/AiChatContainer";
import { SAMPLE_MESSAGES } from "../sample-data/SampleData";

function Diet() {
  const [messages, setMessages] = useState<AIMessageType[]>(SAMPLE_MESSAGES);

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

  return (
    <AiChatContainer messages={messages} onSendMessage={handleSendMessage} />
  );
}

export default Diet;
