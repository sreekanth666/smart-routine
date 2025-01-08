import { Grid } from "@mantine/core";
import PersonalisedSuggestions from "../components/PersonalisedSuggestions";
import MentalHealth from "../components/MentalHealth";
import Goals from "../components/Goals";

function NormalClient() {
  return (
    <Grid>
      <Grid.Col span={12}>
        <Goals />
      </Grid.Col>
      <Grid.Col span={12}>
        <Grid mt={20}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <MentalHealth />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <PersonalisedSuggestions />
          </Grid.Col>
        </Grid>
      </Grid.Col>
    </Grid>
  );
}

export default NormalClient;
