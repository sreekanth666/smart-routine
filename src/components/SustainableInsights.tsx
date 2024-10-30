import { Accordion, ScrollArea } from "@mantine/core";
import { SAMPLE_SUSTAINABILITY_INSIGHTS } from "./SampleData";
import SuggestionItem from "./SuggestionItem";
import SuggestionContainerCard from "./SuggestionContainerCard";

function SustainableInsights() {
  const insights = SAMPLE_SUSTAINABILITY_INSIGHTS.map((insight) => (
    <SuggestionItem key={insight.title} item={insight} />
  ));
  return (
    <SuggestionContainerCard title="Sustainable Insights & Reports">
      <ScrollArea h={380} scrollbarSize={2} scrollHideDelay={0}>
        <Accordion variant="separated">{insights}</Accordion>
      </ScrollArea>
    </SuggestionContainerCard>
  );
}

export default SustainableInsights;
