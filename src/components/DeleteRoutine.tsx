import { Button, Grid, Title } from "@mantine/core";
import { RoutineType } from "../types/SuggestionType";
import { useDeleteRoutine } from "../hooks/routineHooks";

type DeleteRoutineParams = {
  routine: Pick<RoutineType, "id" | "title">;
  onCloseModal: () => void;
};

function DeleteRoutine({ routine, onCloseModal }: DeleteRoutineParams) {
  const { isDeletingUserRoutine, deleteUserRoutine } = useDeleteRoutine();
  const handleDelete = () => {
    deleteUserRoutine(routine.id);
    onCloseModal();
  };

  return (
    <>
      <Title order={4}>Do you really wanted to delete {routine.title}?</Title>
      <Grid>
        <Grid.Col span={6}>
          <Button
            onClick={onCloseModal}
            c="white"
            fullWidth
            mt="xl"
            color="green"
          >
            {isDeletingUserRoutine ? "Loading..." : "Cancel"}
          </Button>
        </Grid.Col>
        <Grid.Col span={6}>
          <Button onClick={handleDelete} fullWidth mt="xl" color="red">
            {isDeletingUserRoutine ? "Loading..." : "Delete"}
          </Button>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default DeleteRoutine;
