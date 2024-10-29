import { SAMPLE_PERSONALISED_SUGGESTIONS } from "./SampleData";
import { Accordion } from "@mantine/core";
import SuggestionItem from "./SuggestionItem";
import SuggestionContainerCard from "./SuggestionContainerCard";

function PersonalisedSuggestions() {
  const suggestions = SAMPLE_PERSONALISED_SUGGESTIONS.map((suggestion) => (
    <SuggestionItem key={suggestion.title} item={suggestion} />
  ));

  return (
    <SuggestionContainerCard title="Personalized Suggestions on Daily Activities">
      <Accordion variant="separated">{suggestions}</Accordion>
    </SuggestionContainerCard>
  );
}

export default PersonalisedSuggestions;
