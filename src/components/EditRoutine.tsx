import { Button, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  RoutineType,
  RoutineTypeWithoutIdAndImages,
} from "../types/SuggestionType";

type EditRoutineParams = {
  routine: RoutineType;
  editRoutine: (id: number, newUser: RoutineTypeWithoutIdAndImages) => void;
};

function EditRoutine({ routine, editRoutine }: EditRoutineParams) {
  const form = useForm({
    initialValues: {
      title: routine.title,
      description: routine.description,
    },
  });

  const editFormHandler = () => {
    const updatedRoutine: RoutineTypeWithoutIdAndImages = {
      title: form.values.title,
      description: form.values.description,
    };

    editRoutine(routine.id, updatedRoutine);
  };

  return (
    <form onSubmit={form.onSubmit(() => editFormHandler())}>
      <TextInput
        label="Title"
        placeholder="Enter new routine title"
        value={form.values.title}
        onChange={(event) =>
          form.setFieldValue("title", event.currentTarget.value)
        }
        required
      />
      <Textarea
        label="Routine Description"
        placeholder="Enter new routine description"
        value={form.values.description}
        onChange={(event) =>
          form.setFieldValue("description", event.currentTarget.value)
        }
        required
      />

      <Button type="submit" bg="green" fullWidth mt="xl">
        Update
      </Button>
    </form>
  );
}

export default EditRoutine;
