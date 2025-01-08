import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { chatToAi, deleteChat, getChatMessages } from "../services/apiChat";

export function useGetChats() {
  const {
    isLoading: isGettingChats,
    data: chatData,
    error: chatDataError,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: getChatMessages,
    staleTime: 900000,
  });

  return { isGettingChats, chatData, chatDataError };
}

export function useChatWithAi() {
  const queryClient = useQueryClient();
  const {
    isPending: isChattingWithAi,
    mutate: chatWithAi,
    error: chatWithAiError,
  } = useMutation({
    mutationKey: ["chat"],
    mutationFn: (message: string) => chatToAi(message),
    onSuccess: () => {
      console.log("Success");
      notifications.show({
        id: "chat-with-ai-success-notification",
        title: "Congratulations 👍",
        message: "Your have sent a message to AI",
        position: "bottom-right",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["chat"] });
    },
    onError: (error) => {
      console.log(error.message);
      console.log("failed");
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
    },
  });

  return {
    isChattingWithAi,
    chatWithAi,
    chatWithAiError,
  };
}

export function useDeleteChat() {
  const queryClient = useQueryClient();
  const {
    isPending: isDeletingChat,
    mutate: deleteAiChat,
    error: deleteAiChatError,
  } = useMutation({
    mutationKey: ["chat"],
    mutationFn: deleteChat,
    onSuccess: () => {
      console.log("Success");
      notifications.show({
        id: "delete-chat-success-notification",
        title: "Congratulations 👍",
        message: "Your have deleted your chat",
        position: "bottom-right",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["chat"] });
    },
    onError: (error) => {
      console.log(error.message);
      console.log("failed");
      if (error instanceof Error) {
        notifications.show({
          id: "delete-chat-error-notification",
          title: "SORRY 🛑",
          message: `ERROR: ${error.message}`,
          color: "red",
          position: "bottom-right",
        });
      } else {
        notifications.show({
          id: "delete-chat-error-notification",
          title: "SORRY 🛑",
          message: "An unknown error occurred",
          color: "red",
          position: "bottom-right",
        });
      }
    },
  });

  return {
    isDeletingChat,
    deleteAiChat,
    deleteAiChatError,
  };
}
