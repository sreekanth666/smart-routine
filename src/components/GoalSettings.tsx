import {
  ActionIcon,
  Card,
  Checkbox,
  Group,
  Modal,
  ScrollArea,
  Title,
  Tooltip,
} from "@mantine/core";
import { useState } from "react";
import { SAMPLE_LIFE_GOALS } from "../sample-data/SampleData";
import { GoalType } from "../types/SuggestionType";
import { useDisclosure } from "@mantine/hooks";
import IconPlus from "./UI/icons/IconPlus";
import { generateRandomID } from "../utils/helpers";
import AddNewGoalForm from "./AddNewGoalForm";

function GoalSettings() {
  const [goals, setGoals] = useState<GoalType[]>(SAMPLE_LIFE_GOALS);
  const [opened, { open, close }] = useDisclosure();

  const handleGoalAchievement = (id: string) => {
    setGoals((prevGoals) => {
      return prevGoals.map((goal: GoalType): GoalType => {
        if (goal.id === id) {
          return { ...goal, didAchieve: !goal.didAchieve };
        } else {
          return goal;
        }
      });
    });
  };

  const handleNewGoal = (newGoal: string) => {
    setGoals((prevGoals) => [
      ...prevGoals,
      { goal: newGoal, didAchieve: false, id: generateRandomID() },
    ]);
    close();
  };

  const lifeGoals = goals.map((goal) => {
    return (
      <Checkbox
        color="green"
        key={goal.id}
        checked={goal.didAchieve}
        label={goal.goal}
        disabled={goal.didAchieve}
        onChange={() => handleGoalAchievement(goal.id)}
        p="sm"
        styles={{
          label: {
            fontSize: 15,
            fontWeight: "bold",
          },
        }}
      />
    );
  });

  return (
    <>
      <Modal.Root opened={opened} onClose={close}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header style={{ justifyContent: "center" }}>
            <Modal.Title
              style={{
                color: "blue",
                fontWeight: 600,
                fontSize: "xx-large",
                textAlign: "center",
              }}
            >
              Add New Goal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddNewGoalForm onAddingNewGoal={handleNewGoal} />
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      <Card
        shadow="sm"
        padding="lg"
        miw={"15rem"}
        radius="md"
        withBorder
        mx="sm"
        h="50dvh"
      >
        <Card.Section p="md">
          <Group>
            <Title order={2}>Goal Settings</Title>
            <Tooltip label="Add new goal">
              <ActionIcon variant="default" onClick={open}>
                <IconPlus size="3rem" stroke={1.5} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Card.Section>
        <Card.Section p="xs">
          <ScrollArea h={240}>{lifeGoals}</ScrollArea>
        </Card.Section>
      </Card>
    </>
  );
}

export default GoalSettings;
