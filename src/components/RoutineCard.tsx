import { ActionIcon, Card, Grid, Menu, Text, Title } from "@mantine/core";
import { RoutineType } from "../types/SuggestionType";
import IconMenu2 from "./icons/IconMenu2";
import IconEye from "./icons/IconEye";
import IconEdit from "./icons/IconEdit";
import IconTrash from "./icons/IconTrash";
import IconAnalyze from "./icons/IconAnalyze";
import IconZoomScan from "./icons/IconZoomScan";

import ImageGrid from "./ImageGrid";

type RoutineCardProps = {
  routine: RoutineType;
  viewRoutine: (id: number) => void;
  editRoutine: (id: number) => void;
  deleteRoutine: (id: number, title: string) => void;
};

function RoutineCard({
  routine,
  viewRoutine,
  editRoutine,
  deleteRoutine,
}: RoutineCardProps) {
  return (
    <Card mb="md">
      <Card.Section>
        <ImageGrid images={routine.images} />
      </Card.Section>
      <Card.Section mt="xs" mb="xs" ml="xs">
        <Grid>
          <Grid.Col span={{ base: 6, md: 9 }}>
            <Title mt="md" mb="xs" fw={500}>
              {routine.title}
            </Title>
            <Text size="sm" c="dimmed" truncate="end">
              {routine.description}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 6, md: 3 }}>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon variant="default" aria-label="Settings">
                  <IconMenu2 size={24} stroke={2} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Normal operations</Menu.Label>
                <Menu.Item
                  color="blue"
                  leftSection={<IconEye size="1rem" stroke={1.5} />}
                  onClick={() => viewRoutine(routine.id)}
                >
                  View Routine
                </Menu.Item>
                <Menu.Item
                  color="green"
                  leftSection={<IconEdit size="1rem" stroke={1.5} />}
                  onClick={() => editRoutine(routine.id)}
                >
                  Edit Routine
                </Menu.Item>
                <Menu.Item
                  color="red"
                  leftSection={<IconTrash size="1rem" stroke={1.5} />}
                  onClick={() => deleteRoutine(routine.id, routine.title)}
                >
                  Delete Routine
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label>AI based operations</Menu.Label>
                <Menu.Item
                  color="grape"
                  leftSection={<IconAnalyze size="1rem" stroke={1.5} />}
                >
                  Analyze Routine
                </Menu.Item>
                <Menu.Item
                  color="pink"
                  leftSection={<IconZoomScan size="1rem" stroke={1.5} />}
                >
                  Inspect Routine
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Grid.Col>
        </Grid>
      </Card.Section>
    </Card>
  );
}

export default RoutineCard;
