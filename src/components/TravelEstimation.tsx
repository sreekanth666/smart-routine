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
      w="98%"
      h="35dvh"
    >
      <Card.Section p="md">
        <Title order={4}>Travel Estimation</Title>
      </Card.Section>
    </Card>
  );
}

export default TravelEstimation;
