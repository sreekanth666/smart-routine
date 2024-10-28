import { Card, Text, Title } from "@mantine/core";
import { SuggestionType } from "../types/SuggestionType";

type GoalCardProp = {
  goal: SuggestionType;
};

function GoalCard({ goal }: GoalCardProp) {
  return (
    <Card shadow="sm" padding="lg" miw={"15rem"} radius="md" withBorder mx="sm">
      <Card.Section p="md">
        <Title order={4}>{goal.title}</Title>
      </Card.Section>
      <Card.Section p="md">
        <Text>{goal.description}</Text>
      </Card.Section>
    </Card>
  );
}

export default GoalCard;
