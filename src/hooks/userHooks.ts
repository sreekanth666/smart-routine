import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  UpdateUserParams,
} from "../services/apiUser";
import { notifications } from "@mantine/notifications";

export function useGetUsers() {
  const {
    isLoading: isGettingUsers,
    data: usersData,
    error: usersDataError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 900000,
  });

  return { isGettingUsers, usersData, usersDataError };
}

export function useGetUser(id: string) {
  const {
    isLoading: isGettingUserData,
    data: userData,
    error: userDataError,
  } = useQuery({
    queryKey: ["users", id],
    queryFn: () => getUser(id),
  });

  return { isGettingUserData, userData, userDataError };
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const {
    isPending: isUpdatingUser,
    mutate: updateUserDetails,
    error: updateUserDetailsError,
  } = useMutation({
    mutationKey: ["users"],
    mutationFn: ({ id, email, fullName, phone }: UpdateUserParams) =>
      updateUser({ id, email, fullName, phone }),
    onSuccess: () => {
      console.log("Success");
      notifications.show({
        id: "update-user-details-success-notification",
        title: "Congratulations 👍",
        message: "Your have updated user details",
        position: "bottom-right",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.log(error.message);
      console.log("failed");
      if (error instanceof Error) {
        notifications.show({
          id: "update-user-details-error-notification",
          title: "SORRY 🛑",
          message: `ERROR: ${error.message}`,
          color: "red",
          position: "bottom-right",
        });
      } else {
        notifications.show({
          id: "update-user-details-error-notification",
          title: "SORRY 🛑",
          message: "An unknown error occurred",
          color: "red",
          position: "bottom-right",
        });
      }
    },
  });

  return { isUpdatingUser, updateUserDetails, updateUserDetailsError };
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const {
    isPending: isDeletingUser,
    mutate: deleteUserDetails,
    error: deleteUserDetailsError,
  } = useMutation({
    mutationKey: ["users"],
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      console.log("Success");
      notifications.show({
        id: "delete-user-details-success-notification",
        title: "Congratulations 👍",
        message: "Your have deleted user details",
        position: "bottom-right",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.log(error.message);
      console.log("failed");
      if (error instanceof Error) {
        notifications.show({
          id: "delete-user-details-error-notification",
          title: "SORRY 🛑",
          message: `ERROR: ${error.message}`,
          color: "red",
          position: "bottom-right",
        });
      } else {
        notifications.show({
          id: "delete-user-details-error-notification",
          title: "SORRY 🛑",
          message: "An unknown error occurred",
          color: "red",
          position: "bottom-right",
        });
      }
    },
  });

  return { isDeletingUser, deleteUserDetails, deleteUserDetailsError };
}
