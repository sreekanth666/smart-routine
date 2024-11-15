import { Carousel } from "@mantine/carousel";
import { SAMPLE_GOALS } from "../sample-data/SampleData";
import GoalCard from "./GoalCard";

function Goals() {
  const goals = SAMPLE_GOALS.map((goal) => (
    <GoalCard key={goal.title} goal={goal} />
  ));
  return (
    <Carousel slideSize="70%" align="start" height={200}>
      {goals}
    </Carousel>
  );
}

export default Goals;
