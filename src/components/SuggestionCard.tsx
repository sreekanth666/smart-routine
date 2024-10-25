import { Card, Text, Title } from "@mantine/core";
import { SuggestionType } from "../types/SuggestionType";

type SuggestionCardProp = {
  suggestion: SuggestionType;
};

function SuggestionCard({ suggestion }: SuggestionCardProp) {
  return (
    <Card shadow="sm" radius="md" w={250} withBorder>
      <Card.Section p="xl">
        <Title order={4}>{suggestion.title}</Title>
      </Card.Section>
      <Text>{suggestion.description}</Text>
    </Card>
  );
}

export default SuggestionCard;
