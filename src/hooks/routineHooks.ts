import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createNewRoutine,
  CreateNewRoutineParams,
  deleteRoutine,
  getRoutine,
  getUserRoutines,
  updateRoutine,
  UpdateRoutineParams,
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

export function useGetRoutine(id: string) {
  const {
    isLoading: isGettingRoutine,
    data: userRoutine,
    error: userRoutineError,
  } = useQuery({
    queryKey: ["routines", id],
    queryFn: () => getRoutine(id),
  });

  return { isGettingRoutine, userRoutine, userRoutineError };
}

export function useUpdateRoutine() {
  const queryClient = useQueryClient();

  const {
    isPending: isEditingRoutine,
    mutate: editRoutine,
    error: editRoutineError,
  } = useMutation({
    mutationKey: ["routines"],
    mutationFn: ({
      id,
      name,
      description,
      time,
      images,
    }: UpdateRoutineParams) =>
      updateRoutine({
        id,
        name,
        description,
        time,
        images,
      }),
    onSuccess: () => {
      console.log("Success");
      notifications.show({
        id: "edit-routine-success-notification",
        title: "Congratulations 👍",
        message: "Your have edited the routine",
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
          id: "edit-routine-error-notification",
          title: "SORRY 🛑",
          message: `ERROR: ${error.message}`,
          color: "red",
          position: "bottom-right",
        });
      } else {
        notifications.show({
          id: "edit-routine-error-notification",
          title: "SORRY 🛑",
          message: "An unknown error occurred",
          color: "red",
          position: "bottom-right",
        });
      }
    },
  });

  return {
    isEditingRoutine,
    editRoutine,
    editRoutineError,
  };
}

export function useDeleteRoutine() {
  const queryClient = useQueryClient();

  const {
    isPending: isDeletingUserRoutine,
    mutate: deleteUserRoutine,
    error: deleteUserRoutineError,
  } = useMutation({
    mutationKey: ["routines"],
    mutationFn: (id: string) => deleteRoutine(id),
    onSuccess: () => {
      console.log("Success");
      notifications.show({
        id: "delete-routine-success-notification",
        title: "Congratulations 👍",
        message: "Your have deleted the routine",
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
          id: "delete-routine-error-notification",
          title: "SORRY 🛑",
          message: `ERROR: ${error.message}`,
          color: "red",
          position: "bottom-right",
        });
      } else {
        notifications.show({
          id: "delete-routine-error-notification",
          title: "SORRY 🛑",
          message: "An unknown error occurred",
          color: "red",
          position: "bottom-right",
        });
      }
    },
  });

  return {
    isDeletingUserRoutine,
    deleteUserRoutine,
    deleteUserRoutineError,
  };
}
