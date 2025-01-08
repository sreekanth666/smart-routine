import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDailyActivity,
  CreateDailyActivityParams,
  getUserDailyActivity,
} from "../services/apiDailyActivity";
import { notifications } from "@mantine/notifications";

export function useGetUserDailyActivities() {
  const {
    isLoading: isGetUserDailyActivities,
    data: userDailyActivities,
    error: userDailyActivitiesError,
  } = useQuery({
    queryKey: ["daily-activities"],
    queryFn: getUserDailyActivity,
    staleTime: 900000,
  });

  return {
    isGetUserDailyActivities,
    userDailyActivities,
    userDailyActivitiesError,
  };
}

export function useAddDailyActivity() {
  const queryClient = useQueryClient();
  const {
    isPending: isCreatingDailyActivity,
    mutate: addDailyActivity,
    isError: createDailyActivityError,
  } = useMutation({
    mutationFn: ({ title, description }: CreateDailyActivityParams) =>
      createDailyActivity({ title, description }),
    onSuccess: () => {
      console.log("Success");
      notifications.show({
        id: "create-daily-activity-success-notification",
        title: "Congratulations 👍",
        message: "Your have added a new daily activity",
        position: "bottom-right",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["daily-activities"] });
    },
    onError: (error) => {
      console.log(error.message);
      console.log("failed");
      if (error instanceof Error) {
        notifications.show({
          id: "create-daily-activity-error-notification",
          title: "SORRY 🛑",
          message: `ERROR: ${error.message}`,
          color: "red",
          position: "bottom-right",
        });
      } else {
        notifications.show({
          id: "create-daily-activity-error-notification",
          title: "SORRY 🛑",
          message: "An unknown error occurred",
          color: "red",
          position: "bottom-right",
        });
      }
    },
  });

  return {
    isCreatingDailyActivity,
    addDailyActivity,
    createDailyActivityError,
  };
}
