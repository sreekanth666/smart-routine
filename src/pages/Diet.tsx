import { useMemo, useState } from "react";
import AiChatContainer, {
  AIMessageType,
} from "../components/ai-based-components/AiChatContainer";
import { Alert } from "@mantine/core";
import { useAuth } from "../context/AuthContext";
import { trackDietChat } from "../services/apiTrackDiet";
import { notifications } from "@mantine/notifications";

// type ServerChatMessageDataType = {
//   _id: string;
//   message: string;
//   sender: string;
//   type: "user" | "model";
//   createdAt: string;
//   updatedAt: string;
// };

const BASE_CHAT_IMAGE_URL = "https://dummyimage.com/256x256/363536/ffffff";

function Diet() {
  const [isChatDisabled, setIsChatDisabled] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<AIMessageType[]>([]);

  const { userName } = useAuth();
  const userAvatarUrl = useMemo(() => {
    return `${BASE_CHAT_IMAGE_URL}&text=${userName
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("")}`;
  }, [userName]);

  const modelAvatarUrl = useMemo(() => `${BASE_CHAT_IMAGE_URL}&text=AI`, []);

  const handleSendMessage = async (userMessage: string) => {
    console.log(userMessage);
    setIsChatDisabled(true);
    setChatMessages((prevmessages) => {
      return [
        ...prevmessages,
        {
          senderType: "user",
          messageContent: userMessage,
          imageUrl: userAvatarUrl,
        },
      ];
    });
    try {
      const response = await trackDietChat(userMessage);

      notifications.show({
        id: "track-diet-success-notification",
        title: "Congratulations 👍",
        message: "Your have asked AI for tracking diet",
        position: "bottom-right",
        color: "green",
      });

      setChatMessages((prevChat) => {
        return [
          ...prevChat,

          {
            senderType: "model",
            messageContent: response.data.data,
            imageUrl: modelAvatarUrl,
          },
        ];
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        notifications.show({
          id: "chat-with-ai-error-notification",
          title: "SORRY 🛑",
          message: `ERROR: ${error.message}`,
          color: "red",
          position: "bottom-right",
        });
      } else {
        notifications.show({
          id: "chat-with-ai-error-notification",
          title: "SORRY 🛑",
          message: "An unknown error occurred",
          color: "red",
          position: "bottom-right",
        });
      }
      const icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
      );

      return (
        <Alert
          variant="white"
          color="red"
          title="Track Diet Chat Error"
          icon={icon}
          styles={{
            label: { fontSize: "1.2rem" },
            message: { fontSize: "1.2rem" },
          }}
        >
          Error: Something bad happened at chatting with AI for tracking diet.
        </Alert>
      );
    } finally {
      setIsChatDisabled(false);
    }
  };

  return (
    <AiChatContainer
      messages={chatMessages}
      onSendMessage={handleSendMessage}
      isChatDisabled={isChatDisabled}
    />
  );
}

export default Diet;
