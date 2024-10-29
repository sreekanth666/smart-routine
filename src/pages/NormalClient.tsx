import { Grid } from "@mantine/core";
import PersonalisedSuggestions from "../components/PersonalisedSuggestions";
import MentalHealth from "../components/MentalHealth";
import Goals from "../components/Goals";
import SustainableInsights from "../components/SustainableInsights";

function NormalClient() {
  return (
    <Grid>
      <Grid.Col span={12}>
        <Goals />
      </Grid.Col>
      <Grid.Col span={12}>
        <Grid mt={20}>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <SustainableInsights />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <MentalHealth />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <PersonalisedSuggestions />
          </Grid.Col>
        </Grid>
      </Grid.Col>
    </Grid>
  );
}

export default NormalClient;
