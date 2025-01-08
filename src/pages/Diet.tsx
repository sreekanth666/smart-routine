import { useEffect, useState } from "react";
import AiChatContainer, {
  AIMessageType,
} from "../components/ai-based-components/AiChatContainer";
import { useGetChats, useChatWithAi } from "../hooks/chatHooks";
import { Alert, Loader } from "@mantine/core";

type ServerChatMessageDataType = {
  _id: string;
  message: string;
  sender: string;
  type: "user" | "model";
  createdAt: string;
  updatedAt: string;
};

function Diet() {
  const [isChatDisabled, setIsChatDisabled] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<AIMessageType[]>([]);

  const { isGettingChats, chatData, chatDataError } = useGetChats();
  const { chatWithAi } = useChatWithAi();

  useEffect(() => {
    if (!isGettingChats && chatDataError === null) {
      const serverData: ServerChatMessageDataType[] = chatData?.data;
      setChatMessages(
        serverData?.map((data) => {
          return {
            senderType: data.type,
            messageContent: data.message,
            imageUrl:
              data.type === "user"
                ? "https://dummyimage.com/256x256/363536/ffffff&text=U"
                : "https://dummyimage.com/256x256/354ea1/ffffff&text=G",
          };
        })
      );
    }
  }, [isGettingChats, chatData, chatDataError]);

  const handleSendMessage = (userMessage: string) => {
    console.log(userMessage);
    setIsChatDisabled(true);
    setChatMessages((prevmessages) => {
      return [
        ...prevmessages,
        {
          senderType: "user",
          messageContent: userMessage,
          imageUrl: "https://dummyimage.com/256x256/363536/ffffff&text=U",
        },
      ];
    });
    chatWithAi(userMessage, {
      onSuccess: (response) => {
        console.log(response.data.data);
        setChatMessages((prevChat) => {
          return [
            ...prevChat,

            {
              senderType: "model",
              messageContent: response.data.data,
              imageUrl: "https://dummyimage.com/256x256/354ea1/ffffff&text=G",
            },
          ];
        });
      },
      onError: (error) => {
        console.error(error);
      },
      onSettled: () => {
        setIsChatDisabled(false);
      },
    });
  };

  if (isGettingChats) {
    return <Loader color="green" />;
  }

  if (chatDataError !== null) {
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
        title="Chat Retreival Error"
        icon={icon}
        styles={{
          label: { fontSize: "1.2rem" },
          message: { fontSize: "1.2rem" },
        }}
      >
        Error: Something bad happened at retrieving chat messages
      </Alert>
    );
  }

  return (
    <AiChatContainer
      messages={chatMessages}
      onSendMessage={handleSendMessage}
      isChatDisabled={isChatDisabled}
    />
  );
}

export default Diet;
