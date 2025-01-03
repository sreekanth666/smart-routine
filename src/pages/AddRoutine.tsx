import {
  Button,
  FileInput,
  Grid,
  NativeSelect,
  Paper,
  Skeleton,
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
import { ChangeEvent, useEffect, useState } from "react";
import {
  useCreateRoutine,
  useGetRoutine,
  useUpdateRoutine,
} from "../hooks/routineHooks";
import { ServerRoutineDataType } from "../components/ViewRoutineDetails";
import { Imagetype } from "../types/SuggestionType";
import { BASE_URL } from "../utils/constants";
import { isFile } from "../utils/helpers";

type AddRoutineForm = {
  title: string;
  description: string;
  time: "MORNING" | "AFTERNOON" | "NIGHT";
  images: File[] | Imagetype[];
};

function AddRoutine() {
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const params = useParams();
  const navigate = useNavigate();
  const action = params["action"];
  const id = action === "edit" ? params["id"] : "";
  const { isGettingRoutine, userRoutine, userRoutineError } = useGetRoutine(
    id || ""
  );
  const { createRoutine } = useCreateRoutine();
  const { editRoutine } = useUpdateRoutine();
  const form = useForm<AddRoutineForm>({
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
    validateInputOnBlur: false,
    initialValues: {
      title: "",
      description: "",
      time: "MORNING",
      images: [] as File[],
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
          const invalidFile = value.find(
            (item) => isFile(item) && (item as File).size > 512000
          );
          if (invalidFile) {
            return "Only images up to 500kb are allowed.";
          }
          return null;
        }
      },
    },
  });

  useEffect(
    function () {
      if (action === "edit" && userRoutineError === null && !isGettingRoutine) {
        const serverRoutine: ServerRoutineDataType = userRoutine?.data;

        // Avoid redundant updates
        if (serverRoutine) {
          const time: "MORNING" | "AFTERNOON" | "NIGHT" =
            serverRoutine.time === "MORNING"
              ? "MORNING"
              : serverRoutine.time === "AFTERNOON"
              ? "AFTERNOON"
              : "NIGHT";

          const images: Imagetype[] = serverRoutine.image.map((item) => ({
            image: `${BASE_URL}/file/routine/${item}`,
            altDescription: item,
          }));

          if (
            form.values.title !== serverRoutine.name ||
            form.values.description !== serverRoutine.description ||
            form.values.time !== time ||
            JSON.stringify(form.values.images) !== JSON.stringify(images)
          ) {
            form.setValues({
              title: serverRoutine.name,
              description: serverRoutine.description,
              time,
              images,
            });
          }
        }
      }
    },
    [action, userRoutine, isGettingRoutine, userRoutineError, form]
  );

  const buttonText: string = isFormSubmitting
    ? "Submitting..."
    : action === "add"
    ? "Add Routine"
    : "Edit Routine";

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

  const routineSubmitHandler = () => {
    setIsFormSubmitting(true);
    const images = form.values.images.filter(isFile) as File[]; // Filter out non-File items
    if (action === "add") {
      createRoutine({
        name: form.values.title,
        description: form.values.description,
        images,
        time: form.values.time,
      });
    } else {
      editRoutine({
        id: id ? id : "",
        name: form.values.title,
        description: form.values.description,
        images,
        time: form.values.time,
      });
    }
    setIsFormSubmitting(false);
    navigate("/routines");
  };

  function selectTimeHandler(event: ChangeEvent<HTMLSelectElement>): void {
    switch (event.target.value) {
      case "MORNING":
        form.setFieldValue("time", "MORNING");
        break;
      case "AFTERNOON":
        form.setFieldValue("time", "AFTERNOON");
        break;
      case "NIGHT":
        form.setFieldValue("time", "NIGHT");
        break;
    }
  }

  if (action === "edit" && isGettingRoutine) {
    return (
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title order={2} ta="center">
          Edit Routine
        </Title>
        <Stack>
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} radius="xl" />
        </Stack>
      </Paper>
    );
  }

  if (action === "edit" && userRoutineError !== null) {
    return (
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title order={2} ta="center">
          Edit Routine
        </Title>
        <Title order={4} c="red" ta="center">
          There was some error while retreiving the routine details.
        </Title>
      </Paper>
    );
  }

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <Title order={2} ta="center">
        {action === "add" && "Add Routine"}
        {action === "edit" && "Edit Routine"}
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
            disabled={isFormSubmitting}
          />

          <Textarea
            label="Routine Description"
            placeholder="Description of the routine"
            value={form.values.description}
            {...form.getInputProps("description")}
            error={form.errors.description}
            disabled={isFormSubmitting}
          />

          <NativeSelect
            label="Routine Time"
            value={form.values.time}
            onChange={selectTimeHandler}
            withAsterisk
            data={[
              { label: "MORNING", value: "MORNING" },
              { label: "AFTERNOON", value: "AFTERNOON" },
              { label: "NIGHT", value: "NIGHT" },
            ]}
            required
            disabled={isFormSubmitting}
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
            disabled={isFormSubmitting}
            required
          />
          <PreviewComponent
            files={form.values.images}
            onRemove={removeFileHandler}
          />
          {params["action"] !== "view" && (
            <Grid>
              <Grid.Col span={6}>
                <Button fullWidth mt="xl" color="red" onClick={cancelHandler}>
                  Cancel
                </Button>
              </Grid.Col>
              <Grid.Col span={6}>
                <Button type="submit" fullWidth mt="xl" color="green">
                  {buttonText}
                </Button>
              </Grid.Col>
            </Grid>
          )}
        </Stack>
      </form>
    </Paper>
  );
}

export default AddRoutine;
