import { Button, Paper, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

type DailyActivityForm = {
  title: string;
  description: string;
};

type AddNewDailyActivityParams = {
  onAddingNewDailyActivity: (title: string, description: string) => void;
};

function AddNewDailyActivityForm({
  onAddingNewDailyActivity,
}: AddNewDailyActivityParams) {
  const form = useForm<DailyActivityForm>({
    initialValues: { title: "", description: "" },
    validate: {},
  });

  const addDailyActivityHandler = () => {
    onAddingNewDailyActivity(form.values.title, form.values.description);
    form.reset();
  };

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <form
        onSubmit={form.onSubmit(() => {
          addDailyActivityHandler();
        })}
      >
        <TextInput
          label="Title"
          placeholder="Add title of the daily activity"
          value={form.values.title}
          onChange={(event) =>
            form.setFieldValue("title", event.currentTarget.value)
          }
          required
        />
        <Textarea
          label="Description"
          placeholder="Add description of the daily activity"
          value={form.values.description}
          onChange={(event) =>
            form.setFieldValue("description", event.currentTarget.value)
          }
        />

        <Button type="submit" fullWidth mt="xl">
          Add New Daily Activity
        </Button>
      </form>
    </Paper>
  );
}

export default AddNewDailyActivityForm;
