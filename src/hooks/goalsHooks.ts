import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { achieveGoal, addNewGoal, getUserGoals } from "../services/apiGoal";
import { notifications } from "@mantine/notifications";

export function useGetUserGoals() {
  const {
    isLoading: isUserGoalsLoading,
    data: userGoals,
    error: userGoalsError,
  } = useQuery({
    queryKey: ["goals"],
    queryFn: getUserGoals,
  });

  return { isUserGoalsLoading, userGoals, userGoalsError };
}

export function useAddNewGoal() {
  const queryClient = useQueryClient();
  const {
    isPending: isAddingNewGoal,
    mutate: addGoal,
    isError: addGoalError,
  } = useMutation({
    mutationFn: (goal: string) => addNewGoal(goal),
    onSuccess: () => {
      console.log("Success");
      notifications.show({
        id: "create-new-goal-success-notification",
        title: "Congratulations 👍",
        message: "Your have added a new goal",
        position: "bottom-right",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: (error) => {
      console.log(error.message);
      console.log("failed");
      if (error instanceof Error) {
        notifications.show({
          id: "create-new-goal-error-notification",
          title: "SORRY 🛑",
          message: `ERROR: ${error.message}`,
          color: "red",
          position: "bottom-right",
        });
      } else {
        notifications.show({
          id: "create-new-goal-error-notification",
          title: "SORRY 🛑",
          message: "An unknown error occurred",
          color: "red",
          position: "bottom-right",
        });
      }
    },
  });

  return {
    isAddingNewGoal,
    addGoal,
    addGoalError,
  };
}

export function useAchieveGoal() {
  const queryClient = useQueryClient();
  const {
    isPending: isAchievingGoal,
    mutate: achieveUserGoal,
    isError: achieveUserGoalError,
  } = useMutation({
    mutationFn: (id: string) => achieveGoal(id),
    onSuccess: () => {
      console.log("Success");
      notifications.show({
        id: "achieve-goal-success-notification",
        title: "Congratulations 👍",
        message: "Your have achieved this goal",
        position: "bottom-right",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: (error) => {
      console.log(error.message);
      console.log("failed");
      if (error instanceof Error) {
        notifications.show({
          id: "achieve-goal-error-notification",
          title: "SORRY 🛑",
          message: `ERROR: ${error.message}`,
          color: "red",
          position: "bottom-right",
        });
      } else {
        notifications.show({
          id: "achieve-goal-error-notification",
          title: "SORRY 🛑",
          message: "An unknown error occurred",
          color: "red",
          position: "bottom-right",
        });
      }
    },
  });

  return {
    isAchievingGoal,
    achieveUserGoal,
    achieveUserGoalError,
  };
}
