import { Accordion } from "@mantine/core";
import { SAMPLE_SUSTAINABILITY_INSIGHTS } from "./SampleData";
import SuggestionItem from "./SuggestionItem";
import SuggestionContainerCard from "./SuggestionContainerCard";

function SustainableInsights() {
  const insights = SAMPLE_SUSTAINABILITY_INSIGHTS.map((insight) => (
    <SuggestionItem key={insight.title} item={insight} />
  ));
  return (
    <SuggestionContainerCard title="Sustainable Insights & Reports">
      <Accordion variant="separated">{insights}</Accordion>
    </SuggestionContainerCard>
  );
}

export default SustainableInsights;
