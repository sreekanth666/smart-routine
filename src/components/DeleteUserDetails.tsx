import { Button, Grid, Skeleton, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDeleteUser, useGetUser } from "../hooks/userHooks";
import { ServerUserDataTypeWithoutId } from "./ViewUserDetails";

type DeleteUserDetailsParams = {
  id: string;
  onCloseModal: () => void;
};

function DeleteUserDetails({ id, onCloseModal }: DeleteUserDetailsParams) {
  const [fullName, setFullName] = useState<string>("");
  const { isGettingUserData, userData, userDataError } = useGetUser(id);
  const { deleteUserDetails } = useDeleteUser();

  useEffect(
    function () {
      if (!isGettingUserData && userDataError === null) {
        const serverUserData: ServerUserDataTypeWithoutId = userData?.data;
        setFullName(serverUserData?.name);
      }
    },
    [isGettingUserData, userData, userDataError]
  );

  if (isGettingUserData) {
    return (
      <>
        <Skeleton height={12} radius="xl" />
        <Grid>
          <Grid.Col span={6}>
            <Skeleton height={15} radius="xl" />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={15} radius="xl" />
          </Grid.Col>
        </Grid>
      </>
    );
  }

  if (userDataError !== null) {
    return (
      <Title order={4} c="red" ta="center">
        There was some error while retreiving the user details.
      </Title>
    );
  }

  const handleDelete = () => {
    deleteUserDetails(id);
    onCloseModal();
  };

  return (
    <>
      <Title order={4}>Do you really wanted to delete {fullName}?</Title>
      <Grid>
        <Grid.Col span={6}>
          <Button onClick={onCloseModal} fullWidth mt="xl" color="green">
            Cancel
          </Button>
        </Grid.Col>
        <Grid.Col span={6}>
          <Button onClick={handleDelete} fullWidth mt="xl" color="red">
            Delete
          </Button>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default DeleteUserDetails;
