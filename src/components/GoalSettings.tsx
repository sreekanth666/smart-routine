import { Card, Title } from "@mantine/core";

function GoalSettings() {
  return (
    <Card
      shadow="sm"
      padding="lg"
      miw={"15rem"}
      radius="md"
      withBorder
      mx="sm"
      h="50dvh"
    >
      <Card.Section p="md">
        <Title order={4}>Goal Settings</Title>
      </Card.Section>
    </Card>
  );
}

export default GoalSettings;
