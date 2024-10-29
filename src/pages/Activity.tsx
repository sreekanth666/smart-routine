import { Grid } from "@mantine/core";
import TravelEstimation from "../components/TravelEstimation";
import DailyActivityRecording from "../components/DailyActivityRecording";
import GoalSettings from "../components/GoalSettings";

function Activity() {
  return (
    <Grid>
      <Grid.Col span={6}>
        <Grid>
          <Grid.Col span={12}>
            <DailyActivityRecording />
          </Grid.Col>
          <Grid.Col span={12}>
            <GoalSettings />
          </Grid.Col>
        </Grid>
      </Grid.Col>
      <Grid.Col span={6}>
        <TravelEstimation />
      </Grid.Col>
    </Grid>
  );
}

export default Activity;
