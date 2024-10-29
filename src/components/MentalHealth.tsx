import { Accordion } from "@mantine/core";
import { SAMPLE_MENTAL_HEALTH_SUGGESTIONS } from "./SampleData";
import SuggestionItem from "./SuggestionItem";
import SuggestionContainerCard from "./SuggestionContainerCard";

function MentalHealth() {
  const insights = SAMPLE_MENTAL_HEALTH_SUGGESTIONS.map((suggestion) => (
    <SuggestionItem key={suggestion.title} item={suggestion} />
  ));
  return (
    <SuggestionContainerCard title="Mental Health Suggestions">
      <Accordion variant="separated">{insights}</Accordion>
    </SuggestionContainerCard>
  );
}

export default MentalHealth;
