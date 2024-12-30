import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createNewCommunityPost,
  getAllCommunityPosts,
} from "../services/apiCommunity";
import { notifications } from "@mantine/notifications";

export function useGetAllCommunityPosts() {
  const {
    isLoading: isGettingAllCommunityPosts,
    data: allCommunityPosts,
    error: allCommunityPostsError,
  } = useQuery({
    queryKey: ["community-posts"],
    queryFn: () => getAllCommunityPosts(),
  });

  return {
    isGettingAllCommunityPosts,
    allCommunityPosts,
    allCommunityPostsError,
  };
}

export function useCreateNewCommunityPost() {
  const queryClient = useQueryClient();

  const {
    isPending: isCreateNewPostPending,
    mutate: createNewPost,
    error: createNewPostError,
  } = useMutation({
    mutationFn: (content: string) => createNewCommunityPost(content),
    onSuccess: () => {
      console.log("Success");
      notifications.show({
        id: "create-community-post-success-notification",
        title: "Congratulations 👍",
        message: "Your have added a new community post",
        position: "bottom-right",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["community-posts"] });
    },
    onError: (error) => {
      console.log(error.message);
      console.log("failed");
      if (error instanceof Error) {
        notifications.show({
          id: "create-community-post-error-notification",
          title: "SORRY 🛑",
          message: `ERROR: ${error.message}`,
          color: "red",
          position: "bottom-right",
        });
      } else {
        notifications.show({
          id: "create-community-post-error-notification",
          title: "SORRY 🛑",
          message: "An unknown error occurred",
          color: "red",
          position: "bottom-right",
        });
      }
    },
  });

  return {
    isCreateNewPostPending,
    createNewPost,
    createNewPostError,
  };
}
