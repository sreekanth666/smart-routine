import { Card, Image, ScrollArea, Text } from "@mantine/core";
import { SAMPLE_ROUTINES } from "./SampleData";

function RoutinesList() {
  const routines = SAMPLE_ROUTINES.map((routine) => (
    <Card mb="md" key={routine.title}>
      <Card.Section>
        <Image src={routine.image} height={200} alt={routine.altDescription} />
      </Card.Section>
      <Text mt="md" mb="xs" fw={500}>
        {routine.title}
      </Text>
      <Text size="sm" c="dimmed">
        {routine.description}
      </Text>
    </Card>
  ));
  return (
    <ScrollArea h={500} type="never" scrollbarSize={2} scrollHideDelay={0}>
      {routines}
    </ScrollArea>
  );
}

export default RoutinesList;
