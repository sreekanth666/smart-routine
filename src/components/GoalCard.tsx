import { Card, Text, Title } from "@mantine/core";
import { SuggestionType } from "../types/SuggestionType";

type GoalCardProp = {
  goal: SuggestionType;
};

function GoalCard({ goal }: GoalCardProp) {
  return (
    <Card shadow="sm" padding="lg" miw={"15rem"} radius="md" withBorder mx="sm">
      <Card.Section p="sm">
        <Title order={4} ta="center">
          {goal.title}
        </Title>
      </Card.Section>
      <Card.Section p="sm">
        <Text>{goal.description}</Text>
      </Card.Section>
    </Card>
  );
}

export default GoalCard;
