import { Button, Grid, Title } from "@mantine/core";

type DeleteUserDetailsParams = {
  userId: string;
  onCloseModal: () => void;
  deleteUser: (userId: string) => void;
};

function DeleteUserDetails({
  userId,
  onCloseModal,
  deleteUser,
}: DeleteUserDetailsParams) {
  const handleDelete = () => {
    deleteUser(userId);
  };

  return (
    <>
      <Title order={4}>Do you really wanted to delete user data?</Title>
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
