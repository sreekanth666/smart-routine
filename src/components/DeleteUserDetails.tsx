import { Button, Grid, Title } from "@mantine/core";
import { UserType } from "../types/UserType";

type DeleteUserDetailsParams = {
  user: Pick<UserType, "id" | "fullName">;
  onCloseModal: () => void;
  deleteUser: (userId: string) => void;
};

function DeleteUserDetails({
  user,
  onCloseModal,
  deleteUser,
}: DeleteUserDetailsParams) {
  const handleDelete = () => {
    deleteUser(user.id);
  };

  return (
    <>
      <Title order={4}>Do you really wanted to delete {user.fullName}?</Title>
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
