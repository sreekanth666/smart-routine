import { SAMPLE_PERSONALISED_SUGGESTIONS } from "./SampleData";
import { Accordion, ScrollArea } from "@mantine/core";
import SuggestionItem from "./SuggestionItem";
import SuggestionContainerCard from "./SuggestionContainerCard";

function PersonalisedSuggestions() {
  const suggestions = SAMPLE_PERSONALISED_SUGGESTIONS.map((suggestion) => (
    <SuggestionItem key={suggestion.title} item={suggestion} />
  ));

  return (
    <SuggestionContainerCard title="Personalized Suggestions">
      <ScrollArea h={330} scrollbarSize={2} scrollHideDelay={0}>
        <Accordion variant="separated">{suggestions}</Accordion>
      </ScrollArea>
    </SuggestionContainerCard>
  );
}

export default PersonalisedSuggestions;
