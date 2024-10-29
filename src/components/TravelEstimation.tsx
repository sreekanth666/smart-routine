import { Card, Title } from "@mantine/core";

function TravelEstimation() {
  return (
    <Card
      shadow="sm"
      padding="lg"
      miw={"15rem"}
      radius="md"
      withBorder
      mx="sm"
      h="100dvh"
    >
      <Card.Section p="md">
        <Title order={4}>Travel Estimation</Title>
      </Card.Section>
    </Card>
  );
}

export default TravelEstimation;
