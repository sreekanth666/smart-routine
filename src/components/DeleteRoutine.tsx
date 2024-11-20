import { Button, Grid, Title } from "@mantine/core";
import { RoutineType } from "../types/SuggestionType";

type DeleteRoutineParams = {
  routine: Pick<RoutineType, "id" | "title">;
  onCloseModal: () => void;
  deleteRoutine: (id: number) => void;
};

function DeleteRoutine({
  routine,
  onCloseModal,
  deleteRoutine,
}: DeleteRoutineParams) {
  const handleDelete = () => {
    deleteRoutine(routine.id);
  };

  return (
    <>
      <Title order={4}>Do you really wanted to delete {routine.title}?</Title>
      <Grid>
        <Grid.Col span={6}>
          <Button
            onClick={onCloseModal}
            c="green"
            fullWidth
            mt="xl"
            color="green"
          >
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

export default DeleteRoutine;
