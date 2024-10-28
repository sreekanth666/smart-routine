// import { Tabs, Text } from "@mantine/core";
import { Group } from "@mantine/core";
import PersonalisedSuggestions from "../components/PersonalisedSuggestions";
import MentalHealth from "../components/MentalHealth";
import Goals from "../components/Goals";
import SustainableInsights from "../components/SustainableInsights";

function NormalClient() {
  return (
    <>
      <Goals />
      <Group my="md">
        <SustainableInsights />
        <MentalHealth />
        <PersonalisedSuggestions />
      </Group>
    </>
  );
}

export default NormalClient;
