import {
  Button,
  FileInput,
  Grid,
  Paper,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import IconFile from "../components/UI/icons/IconFile";
import { useNavigate, useParams } from "react-router-dom";
import ValueComponent from "../components/ValueComponent";
import PreviewComponent from "../components/PreviewComponent";
import { useForm } from "@mantine/form";

type AddRoutineForm = {
  title: string;
  description: string;
  images: File[];
};

function AddRoutine() {
  const params = useParams();
  const navigate = useNavigate();
  const form = useForm<AddRoutineForm>({
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
    validateInputOnBlur: false,
    initialValues: {
      title: "",
      description: "",
      images: [],
    },
    validate: {
      title: (value) => (value ? null : "Title required"),
      description: (value) => (value ? null : "Description required"),
      images: (value) => {
        if (value.length === 0) {
          return "Routine images are mandatory";
        } else if (value.length > 7) {
          return "You can upload up to 7 images only";
        } else {
          let status = false,
            index = 0;
          while (index < value.length) {
            if (value[index].size > 512000) {
              status = true;
              break;
            }
            index++;
          }
          if (status) {
            return "Only images upto 500kb are allowed.";
          } else {
            return null;
          }
        }
      },
    },
  });

  const removeFileHandler = (index: number) => {
    const updatedFiles = form.getValues().images;
    updatedFiles.splice(index, 1);
    form.setFieldValue("images", updatedFiles);

    if (updatedFiles.length > 7) {
      form.setFieldError("images", "You can upload up to 7 images only");
    } else {
      form.clearFieldError("images");
    }
  };

  const cancelHandler = () => {
    navigate(-1);
  };

  const routineSubmitHandler = () => {};

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <Title order={2} ta="center">
        {params["action"] === "add" && "Add Routine"}
        {params["action"] === "edit" && "Edit Routine"}
        {params["action"] === "view" && "View Routine"}
      </Title>
      <form
        onSubmit={form.onSubmit(() => {
          routineSubmitHandler();
        })}
      >
        <Stack>
          <TextInput
            label="Routine Title"
            placeholder="Title of the routine"
            value={form.values.title}
            {...form.getInputProps("title")}
            error={form.errors.title}
          />

          <Textarea
            label="Routine Description"
            placeholder="Description of the routine"
            value={form.values.description}
            {...form.getInputProps("description")}
            error={form.errors.description}
          />

          <FileInput
            label="Routine Images"
            placeholder="Upload routine images"
            multiple
            accept="image/png,image/jpeg"
            clearable
            value={form.values.images}
            {...form.getInputProps("images")}
            error={form.errors.images}
            valueComponent={ValueComponent}
            leftSection={<IconFile size="1.4rem" stroke={1.5} />}
            leftSectionPointerEvents="none"
            // disabled={isEdit}
            required
          />
          <PreviewComponent
            files={form.values.images}
            onRemove={removeFileHandler}
          />

          <Grid>
            <Grid.Col span={6}>
              <Button fullWidth mt="xl" color="red" onClick={cancelHandler}>
                Cancel
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button type="submit" fullWidth mt="xl" color="green">
                {params["action"] === "add" && "Add Routine"}
                {params["action"] === "edit" && "Edit Routine"}
                {params["action"] === "view" && "View Routine"}
              </Button>
            </Grid.Col>
          </Grid>
        </Stack>
      </form>
    </Paper>
  );
}

export default AddRoutine;
