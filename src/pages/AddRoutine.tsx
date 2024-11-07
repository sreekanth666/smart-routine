import {
  ActionIcon,
  Button,
  Card,
  FileInput,
  FileInputProps,
  Flex,
  Grid,
  Image,
  Paper,
  Pill,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import IconFile from "../components/icons/IconFile";
import IconX from "../components/icons/IconX";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PreviewComponentProps {
  files: File[];
  onRemove: (index: number) => void;
}

const ValueComponent: FileInputProps["valueComponent"] = ({ value }) => {
  if (value === null) {
    return null;
  }

  if (Array.isArray(value)) {
    return (
      <Pill.Group>
        {value.map((file, index) => (
          <Pill key={index}>{file.name}</Pill>
        ))}
      </Pill.Group>
    );
  }

  return <Pill>{value.name}</Pill>;
};

const PreviewComponent: React.FC<PreviewComponentProps> = ({
  files,
  onRemove,
}) => {
  if (files.length === 0) return null;

  return (
    <Flex gap="xs" wrap="wrap">
      {files.map((file, index) => (
        <Card
          key={index}
          w="100px"
          h="100px"
          bd="1px solid #e0e0e0"
          radius="xs"
          style={{ overflow: "hidden" }}
          pos="relative"
          p={0}
        >
          <Image
            w="100%"
            h="100%"
            src={URL.createObjectURL(file)}
            alt={file.name}
          />

          <ActionIcon
            variant="default"
            pos="absolute"
            top="4px"
            right="4px"
            radius="50%"
            color="white"
            style={{ cursor: "pointer" }}
            onClick={() => onRemove(index)}
          >
            <IconX size="1.4rem" stroke={1.5} />
          </ActionIcon>
        </Card>
      ))}
    </Flex>
  );
};

function AddRoutine() {
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();

  const handleFileChange = (newFiles: File[] | null) => {
    if (newFiles) {
      setFiles(newFiles);
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <Title order={2} ta="center">
        Add Routine
      </Title>
      <form action="">
        <Stack>
          <TextInput
            label="Routine Name"
            placeholder="Name of the routine"
            required
          />
          <Textarea
            label="Routine Description"
            placeholder="Description of the routine"
            required
          />
          <FileInput
            label="Routine Images"
            placeholder="Upload routine images"
            multiple
            accept="image/png,image/jpeg"
            clearable
            value={files}
            onChange={handleFileChange}
            valueComponent={ValueComponent}
            leftSection={<IconFile size="1.4rem" stroke={1.5} />}
            leftSectionPointerEvents="none"
            required
          />
          <PreviewComponent files={files} onRemove={handleRemoveFile} />
          <Grid>
            <Grid.Col span={6}>
              <Button fullWidth mt="xl" color="red" onClick={handleCancel}>
                Cancel
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button fullWidth mt="xl" color="green">
                Add Routine
              </Button>
            </Grid.Col>
          </Grid>
        </Stack>
      </form>
    </Paper>
  );
}

export default AddRoutine;
