import { Accordion, Title } from "@mantine/core";
import { SAMPLE_MENTAL_HEALTH_SUGGESTIONS } from "./SampleData";
import SuggestionItem from "./SuggestionItem";
import SuggestionContainer from "./SuggestionContainer";

function MentalHealth() {
  const insights = SAMPLE_MENTAL_HEALTH_SUGGESTIONS.map((suggestion) => (
    <SuggestionItem key={suggestion.title} item={suggestion} />
  ));
  return (
    <SuggestionContainer>
      <>
        <Title order={3} mb="xs">
          Mental Health Suggestions
        </Title>
        <Accordion variant="separated">{insights}</Accordion>
      </>
    </SuggestionContainer>
  );
}

export default MentalHealth;
