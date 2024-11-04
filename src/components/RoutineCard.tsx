import {
  ActionIcon,
  AspectRatio,
  Card,
  Container,
  Flex,
  Grid,
  Image,
  Menu,
  Text,
  Title,
} from "@mantine/core";
import { RoutineType } from "../types/SuggestionType";
import IconMenu2 from "./icons/IconMenu2";
import IconEye from "./icons/IconEye";
import IconEdit from "./icons/IconEdit";
import IconTrash from "./icons/IconTrash";
import IconAnalyze from "./icons/IconAnalyze";
import IconZoomScan from "./icons/IconZoomScan";

type RoutineCardProps = {
  routine: RoutineType;
  viewRoutine: (id: number) => void;
};

function RoutineCard({ routine, viewRoutine }: RoutineCardProps) {
  return (
    <Card mb="md" key={routine.id}>
      <Card.Section>
        <Grid grow gutter="lg">
          <Grid.Col span={6}>
            <AspectRatio ratio={1}>
              <Image
                src={routine.images[0].image}
                height={200}
                alt={routine.images[0].altDescription}
              />
            </AspectRatio>
          </Grid.Col>
          <Grid.Col span={6}>
            <AspectRatio ratio={1}>
              <Image
                src={routine.images[1].image}
                height={200}
                alt={routine.images[1].altDescription}
              />
            </AspectRatio>
          </Grid.Col>
          <Grid.Col span={6}>
            <AspectRatio ratio={1}>
              <Image
                src={routine.images[2].image}
                height={200}
                alt={routine.images[2].altDescription}
              />
            </AspectRatio>
          </Grid.Col>
          <Grid.Col span={6} ta="center">
            <Container bg="rgb(222, 226, 230, 0.6)" h="100%" ta="center">
              <Flex h="100%" justify="center" align="center">
                <Title order={1}>+3</Title>
              </Flex>
            </Container>
          </Grid.Col>
        </Grid>
      </Card.Section>
      <Card.Section mt="xs" mb="xs" ml="xs">
        <Grid>
          <Grid.Col span={9}>
            <Title mt="md" mb="xs" fw={500}>
              {routine.title}
            </Title>
            <Text size="sm" c="dimmed" truncate="end">
              {routine.description}
            </Text>
          </Grid.Col>
          <Grid.Col span={3}>
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
                >
                  Edit Routine
                </Menu.Item>
                <Menu.Item
                  color="red"
                  leftSection={<IconTrash size="1rem" stroke={1.5} />}
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
