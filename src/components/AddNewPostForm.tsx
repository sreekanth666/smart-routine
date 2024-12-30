import { Button, Paper, Progress, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";

type NewPostForm = {
  content: string;
};

type AddNewPostFormParams = {
  onAddingNewPost: (content: string) => void;
  isFormSubmitting: boolean;
};

function AddNewPostForm({
  onAddingNewPost,
  isFormSubmitting,
}: AddNewPostFormParams) {
  const form = useForm<NewPostForm>({
    initialValues: { content: "" },
    validate: {
      content: (value) =>
        value.length > 160
          ? "Content length must be up to 160 characters"
          : null,
    },
  });

  const addDailyActivityHandler = () => {
    onAddingNewPost(form.values.content);
    form.reset();
  };

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <form
        onSubmit={form.onSubmit(() => {
          addDailyActivityHandler();
        })}
      >
        <Textarea
          maxLength={160}
          label="Content"
          placeholder="Add post content"
          value={form.values.content}
          onChange={(event) => {
            if (event.currentTarget.value.length > 160)
              form.setFieldError(
                "content",
                "Content length must be up to 160 characters"
              );
            form.setFieldValue("content", event.currentTarget.value);
          }}
          error={form.errors.content}
          required
          disabled={isFormSubmitting}
        />
        <Progress
          mt="md"
          value={(form.values.content.length / 160) * 100}
          color={form.values.content.length <= 160 ? "green" : "red"}
        />

        <Button type="submit" color="green" fullWidth mt="xl">
          {isFormSubmitting ? "Loading..." : "Add New Post"}
        </Button>
      </form>
    </Paper>
  );
}

export default AddNewPostForm;
