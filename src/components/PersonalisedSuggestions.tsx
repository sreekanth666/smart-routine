import { Carousel } from "@mantine/carousel";
import { SAMPLE_PERSONALISED_SUGGESTIONS } from "./SampleData";
import SuggestionCard from "./SuggestionCard";
import { Paper } from "@mantine/core";

function PersonalisedSuggestions() {
  const suggestions = SAMPLE_PERSONALISED_SUGGESTIONS.map((suggestion) => (
    <SuggestionCard key={suggestion.title} suggestion={suggestion} />
  ));

  return (
    <Paper shadow="xs" withBorder p="xl">
      <Carousel
        slideSize="70%"
        height={200}
        slideGap="xl"
        align="start"
        dragFree
      >
        {suggestions}
      </Carousel>
    </Paper>
  );
}

export default PersonalisedSuggestions;
