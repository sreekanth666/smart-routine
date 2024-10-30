import { Button, Flex, Grid, Title } from "@mantine/core";
import RoutineChat from "../components/RoutineChat";
import RoutinesList from "../components/RoutinesList";

function Routines() {
  return (
    <Grid>
      <Grid.Col span={12}>
        <Grid>
          <Grid.Col span={6}>
            <Title order={2}>Routines</Title>
          </Grid.Col>
          <Grid.Col style={{ justifyContent: "end" }} span={6}>
            <Flex justify="end">
              <Button mr={2}>Add Routine</Button>
              <Button ml={2}>Plan Routine</Button>
            </Flex>
          </Grid.Col>
        </Grid>
      </Grid.Col>
      <Grid.Col span={6}>
        <RoutinesList />
      </Grid.Col>
      <Grid.Col span={6}>
        <RoutineChat />
      </Grid.Col>
    </Grid>
  );
}

export default Routines;
