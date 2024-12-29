import { Button, Paper, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

type GoalForm = {
  newGoal: string;
};

type AddNewGoalFormParams = {
  onAddingNewGoal: (goal: string) => void;
  isFormSubmitting: boolean;
};

function AddNewGoalForm({
  onAddingNewGoal,
  isFormSubmitting,
}: AddNewGoalFormParams) {
  const form = useForm<GoalForm>({
    initialValues: { newGoal: "" },
    validate: {},
  });

  const addGoalHandler = () => {
    onAddingNewGoal(form.values.newGoal);
    form.reset();
  };

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <form
        onSubmit={form.onSubmit(() => {
          addGoalHandler();
        })}
      >
        <TextInput
          label="New Goal"
          placeholder="Add new goal"
          value={form.values.newGoal}
          onChange={(event) =>
            form.setFieldValue("newGoal", event.currentTarget.value)
          }
          required
          disabled={isFormSubmitting}
        />

        <Button type="submit" color="green" fullWidth mt="xl">
          {isFormSubmitting ? "Loading..." : "Add New Goal"}
        </Button>
      </form>
    </Paper>
  );
}

export default AddNewGoalForm;
