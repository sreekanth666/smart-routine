import {
  Card,
  Container,
  Flex,
  Grid,
  Image,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";
import { SAMPLE_ROUTINES } from "./SampleData";

function RoutinesList() {
  const routines = SAMPLE_ROUTINES.map((routine) => (
    <Card mb="md" key={routine.title}>
      <Card.Section>
        <Grid grow gutter="lg">
          <Grid.Col span={6}>
            <Image
              src={routine.images[0].image}
              height={200}
              alt={routine.images[0].altDescription}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Image
              src={routine.images[1].image}
              height={200}
              alt={routine.images[1].altDescription}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Image
              src={routine.images[2].image}
              height={200}
              alt={routine.images[2].altDescription}
            />
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
      <Title mt="md" mb="xs" fw={500}>
        {routine.title}
      </Title>
      <Text size="sm" c="dimmed" truncate="end">
        {routine.description}
      </Text>
    </Card>
  ));
  return (
    <ScrollArea h={500} type="scroll" scrollbarSize={5} scrollHideDelay={0}>
      {routines}
    </ScrollArea>
  );
}

export default RoutinesList;
