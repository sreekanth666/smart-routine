import { Accordion, ScrollArea } from "@mantine/core";
import { SAMPLE_MENTAL_HEALTH_SUGGESTIONS } from "./SampleData";
import SuggestionItem from "./SuggestionItem";
import SuggestionContainerCard from "./SuggestionContainerCard";

function MentalHealth() {
  const insights = SAMPLE_MENTAL_HEALTH_SUGGESTIONS.map((suggestion) => (
    <SuggestionItem key={suggestion.title} item={suggestion} />
  ));
  return (
    <SuggestionContainerCard title="Mental Health Suggestions">
      <ScrollArea h={330} scrollbarSize={2} scrollHideDelay={0}>
        <Accordion variant="separated">{insights}</Accordion>
      </ScrollArea>
    </SuggestionContainerCard>
  );
}

export default MentalHealth;
