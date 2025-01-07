import { Card, Title } from "@mantine/core";
import AiChatContainer, {
  AIMessageType,
} from "./ai-based-components/AiChatContainer";
import { useAnalyseRoutine } from "../hooks/routineHooks";
import { useEffect, useState } from "react";
import { convertAnalysisData } from "../utils/helpers";

type RoutineChatParams = {
  routineId: string;
};

type OverallFeedback = {
  goodsSummary: string;
  badsSummary: string;
  generalRecommendations: string;
};

type Product = {
  product: string;
  category: string;
  good: string;
  bad: string;
  recommendation: string;
};

type RoutineAnalysis = {
  time: string;
  products: Product[];
};

export type ServerRoutineAnalysisData = {
  overallFeedback: OverallFeedback;
  routineAnalysis: RoutineAnalysis[];
};

function RoutineChat({ routineId }: RoutineChatParams) {
  const { isAnalysingRoutine, routineAnalysis, routineAnalysisError } =
    useAnalyseRoutine(routineId);
  const [messages, setMessages] = useState<AIMessageType[]>([]);

  console.log(routineId);

  useEffect(
    function () {
      if (isAnalysingRoutine && routineId !== "") {
        const loadingMessage: AIMessageType = {
          senderType: "user",
          imageUrl: "https://dummyimage.com/256x256/363536/ffffff&text=U",
          messageContent: `Analysing routine with ID ${routineId}`,
        };
        setMessages([loadingMessage]);
      }
    },
    [isAnalysingRoutine, routineId]
  );

  useEffect(
    function () {
      if (routineAnalysisError !== null && routineId !== "") {
        const aiErrorReply: AIMessageType = {
          senderType: "AI",
          imageUrl: "https://dummyimage.com/256x256/354ea1/ffffff&text=G",
          messageContent: `<strong style="color:red;">Error: Something bad happened at retrieving routine analysis</strong>`,
        };

        setMessages((prevMessages) => [...prevMessages, aiErrorReply]);
      }
    },
    [routineAnalysisError, routineId]
  );

  useEffect(
    function () {
      if (
        !isAnalysingRoutine &&
        routineAnalysisError === null &&
        routineId !== ""
      ) {
        const serverRoutineAnalysedData: ServerRoutineAnalysisData =
          routineAnalysis?.data;
        const message: string = convertAnalysisData(serverRoutineAnalysedData);
        console.log(message);
        const aiReply: AIMessageType = {
          senderType: "AI",
          imageUrl: "https://dummyimage.com/256x256/354ea1/ffffff&text=G",
          messageContent: message,
        };

        setMessages((prevMessages) => [...prevMessages, aiReply]);
      }
    },
    [isAnalysingRoutine, routineAnalysisError, routineId, routineAnalysis]
  );

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
    <Card shadow="sm" padding="lg" radius="md" withBorder h="100dvh">
      <Card.Section p="xs">
        <Title ta="center">Routine Chat</Title>
      </Card.Section>
      <Card.Section p="xs">
        <AiChatContainer
          messages={messages}
          onSendMessage={handleSendMessage}
          isRoutinePage
        />
      </Card.Section>
    </Card>
  );
}

export default RoutineChat;
