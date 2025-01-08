import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTravelEstimation,
  CreateTravelEstimationParams,
  getUserTravelEstimation,
} from "../services/apiTravelEstimation";
import { notifications } from "@mantine/notifications";

export function useGetUserTravelEstimation() {
  const {
    isLoading: isUserTravelEstimationLoading,
    data: userTravelEstimation,
    error: userTravelEstimationError,
  } = useQuery({
    queryKey: ["travel-estimation"],
    queryFn: () => getUserTravelEstimation(),
    staleTime: 900000,
  });

  return {
    isUserTravelEstimationLoading,
    userTravelEstimation,
    userTravelEstimationError,
  };
}

export function useCreateTravelEstimation() {
  const queryClient = useQueryClient();

  const {
    isPending: isCreatingTravelEstimation,
    mutate: addTravelEstimation,
    isError: isCreatingTravelEstimationError,
  } = useMutation({
    mutationFn: ({
      starting,
      destination,
      distance,
      duration,
      commutation,
    }: CreateTravelEstimationParams) =>
      createTravelEstimation({
        starting,
        destination,
        distance,
        duration,
        commutation,
      }),
    onSuccess: () => {
      console.log("Success");
      notifications.show({
        id: "create-travel-estimation-success-notification",
        title: "Congratulations 👍",
        message: "Your have added a new travel estimation",
        position: "bottom-right",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["travel-estimation"] });
    },
    onError: (error) => {
      console.log(error.message);
      console.log("failed");
      if (error instanceof Error) {
        notifications.show({
          id: "create-travel-estimation-error-notification",
          title: "SORRY 🛑",
          message: `ERROR: ${error.message}`,
          color: "red",
          position: "bottom-right",
        });
      } else {
        notifications.show({
          id: "create-travel-estimation-error-notification",
          title: "SORRY 🛑",
          message: "An unknown error occurred",
          color: "red",
          position: "bottom-right",
        });
      }
    },
  });

  return {
    isCreatingTravelEstimation,
    addTravelEstimation,
    isCreatingTravelEstimationError,
  };
}
