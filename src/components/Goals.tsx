import { Carousel } from "@mantine/carousel";
import GoalCard from "./GoalCard";
import { GoalType } from "../types/SuggestionType";
import { useEffect, useState } from "react";
import { useGetUserGoals } from "../hooks/goalsHooks";
import { UserGoalType } from "./GoalSettings";
import { Card, Skeleton, Title } from "@mantine/core";

function Goals() {
  const [userGoalList, setUserGoalList] = useState<GoalType[]>([]);
  const { isUserGoalsLoading, userGoals, userGoalsError } = useGetUserGoals();

  useEffect(() => {
    if (!isUserGoalsLoading && userGoalsError === null) {
      const receivedUserGoals: UserGoalType[] = userGoals?.data;
      setUserGoalList(
        receivedUserGoals.map((goalItem) => {
          return {
            id: goalItem._id,
            goal: goalItem.goal,
            didAchieve: goalItem.isAchieved,
          };
        })
      );
    }
  }, [isUserGoalsLoading, userGoalsError, userGoals]);

  const goals = userGoalList.map((goalItem) => (
    <GoalCard key={goalItem.id} goalText={goalItem.goal} />
  ));

  if (isUserGoalsLoading) {
    return (
      <Carousel slideSize="70%" align="start" height={150}>
        <Skeleton height={15}></Skeleton>
        <Skeleton height={15}></Skeleton>
        <Skeleton height={15}></Skeleton>
        <Skeleton height={15}></Skeleton>
      </Carousel>
    );
  }

  if (userGoalsError !== null) {
    return (
      <Card
        shadow="sm"
        padding="lg"
        miw={"15rem"}
        radius="md"
        withBorder
        mx="sm"
      >
        <Card.Section p="sm">
          <Title order={4} c="red">
            Error: Something bad happened at retrieving user goals
          </Title>
        </Card.Section>
      </Card>
    );
  }

  if (userGoalList.length === 0) {
    return (
      <Card
        shadow="sm"
        padding="lg"
        miw={"15rem"}
        radius="md"
        withBorder
        mx="sm"
      >
        <Card.Section p="sm">
          <Title order={4}>Add some goals to display content here.</Title>
        </Card.Section>
      </Card>
    );
  }

  return (
    <Carousel slideSize="70%" align="start" height={150}>
      {goals}
    </Carousel>
  );
}

export default Goals;
