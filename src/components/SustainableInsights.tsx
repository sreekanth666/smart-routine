import { Accordion, Title } from "@mantine/core";
import { SAMPLE_SUSTAINABILITY_INSIGHTS } from "./SampleData";
import SuggestionItem from "./SuggestionItem";
import SuggestionContainer from "./SuggestionContainer";

function SustainableInsights() {
  const insights = SAMPLE_SUSTAINABILITY_INSIGHTS.map((insight) => (
    <SuggestionItem key={insight.title} item={insight} />
  ));
  return (
    <SuggestionContainer>
      <>
        <Title order={3} mb="xs">
          Sustainable Insights & Reports
        </Title>
        <Accordion variant="separated">{insights}</Accordion>
      </>
    </SuggestionContainer>
  );
}

export default SustainableInsights;
