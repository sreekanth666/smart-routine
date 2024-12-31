import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createNewRoutine,
  CreateNewRoutineParams,
  getUserRoutines,
} from "../services/apiRoutines";
import { notifications } from "@mantine/notifications";

export function useGetRoutines() {
  const {
    isLoading: isGettingRoutines,
    data: userRoutines,
    error: userRoutinesError,
  } = useQuery({
    queryKey: ["routines"],
    queryFn: () => getUserRoutines(),
  });

  return { isGettingRoutines, userRoutines, userRoutinesError };
}

export function useCreateRoutine() {
  const queryClient = useQueryClient();

  const {
    isPending: isCreatingRoutine,
    mutate: createRoutine,
    error: createRoutineError,
  } = useMutation({
    mutationKey: ["routines"],
    mutationFn: ({ name, description, time, images }: CreateNewRoutineParams) =>
      createNewRoutine({
        name,
        description,
        time,
        images,
      }),
    onSuccess: () => {
      console.log("Success");
      notifications.show({
        id: "create-routine-success-notification",
        title: "Congratulations 👍",
        message: "Your have added a new routine",
        position: "bottom-right",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["routines"] });
    },
    onError: (error) => {
      console.log(error.message);
      console.log("failed");
      if (error instanceof Error) {
        notifications.show({
          id: "create-routine-error-notification",
          title: "SORRY 🛑",
          message: `ERROR: ${error.message}`,
          color: "red",
          position: "bottom-right",
        });
      } else {
        notifications.show({
          id: "create-routine-error-notification",
          title: "SORRY 🛑",
          message: "An unknown error occurred",
          color: "red",
          position: "bottom-right",
        });
      }
    },
  });

  return {
    isCreatingRoutine,
    createRoutine,
    createRoutineError,
  };
}
