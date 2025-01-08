import { Card, Text } from "@mantine/core";

type GoalCardProp = {
  goalText: string;
};

function GoalCard({ goalText }: GoalCardProp) {
  return (
    <Card shadow="sm" padding="lg" miw={"15rem"} radius="md" withBorder mx="sm">
      <Card.Section p="sm">
        <Text fz={20}>
          <strong>Goal</strong>: {goalText}
        </Text>
      </Card.Section>
    </Card>
  );
}

export default GoalCard;
