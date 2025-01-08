import {
  ActionIcon,
  Card,
  Checkbox,
  Group,
  LoadingOverlay,
  Modal,
  ScrollArea,
  Skeleton,
  Stack,
  Title,
  Tooltip,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { GoalType } from "../types/SuggestionType";
import { useDisclosure } from "@mantine/hooks";
import IconPlus from "./UI/icons/IconPlus";
import AddNewGoalForm from "./AddNewGoalForm";
import {
  useAchieveGoal,
  useAddNewGoal,
  useGetUserGoals,
} from "../hooks/goalsHooks";

export type UserGoalType = {
  _id: string;
  goal: string;
  isAchieved: boolean;
};

function GoalSettings() {
  const [goals, setGoals] = useState<GoalType[]>([]);
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure();
  // const [loaderOpened, { toggle: loaderToggle }] = useDisclosure();
  const { isUserGoalsLoading, userGoals, userGoalsError } = useGetUserGoals();
  const { isAddingNewGoal, addGoal, addGoalError } = useAddNewGoal();
  const { isAchievingGoal, achieveUserGoal } = useAchieveGoal();
  console.log(goals);

  useEffect(
    function () {
      if (!isUserGoalsLoading && !userGoalsError) {
        const receivedUserGoals: UserGoalType[] = userGoals?.data;
        setGoals(
          receivedUserGoals.map((goalItem) => {
            return {
              id: goalItem._id,
              goal: goalItem.goal,
              didAchieve: goalItem.isAchieved,
            };
          })
        );
      }
    },
    [isUserGoalsLoading, userGoalsError, userGoals]
  );

  if (isUserGoalsLoading) {
    return (
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
          <Skeleton height={12} width="30%" radius="xl" />
        </Card.Section>
        <Card.Section p="md">
          <Stack>
            <Skeleton height={8} radius="xl" />
            <Skeleton height={8} radius="xl" />
            <Skeleton height={8} radius="xl" />
            <Skeleton height={8} radius="xl" />
          </Stack>
        </Card.Section>
      </Card>
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
        h="50dvh"
      >
        <Card.Section p="md">
          <Title order={2}>Goal Settings</Title>
        </Card.Section>
        <Card.Section p="md">
          <Title order={4} c="red">
            Error: Something bad happened at retrieving user goals
          </Title>
        </Card.Section>
      </Card>
    );
  }

  if (goals.length === 0) {
    return (
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
          <Title order={2}>Goal Settings</Title>
        </Card.Section>
        <Card.Section p="md">
          <Title order={4}>No goals available. Please add some goals</Title>
        </Card.Section>
      </Card>
    );
  }

  const handleGoalAchievement = (id: string) => {
    achieveUserGoal(id);
  };

  const handleNewGoal = (newGoal: string) => {
    setIsFormSubmitting(true);
    addGoal(newGoal);
    handleModalClose();
  };

  const handleModalClose = () => {
    setIsFormSubmitting(false);
    close();
  };

  const lifeGoals = goals
    .sort((a, b) => {
      if (a.didAchieve === b.didAchieve) {
        return 0;
      }
      return a.didAchieve ? 1 : -1;
    })
    .map((goalItem) => {
      return (
        <Checkbox
          color="green"
          key={goalItem.id}
          checked={goalItem.didAchieve}
          label={goalItem.goal}
          disabled={goalItem.didAchieve}
          onChange={() => handleGoalAchievement(goalItem.id)}
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
            {isFormSubmitting && addGoalError !== null ? (
              <Title order={4} c="red">
                Error: Something bad happened while adding new goal
              </Title>
            ) : (
              <AddNewGoalForm
                onAddingNewGoal={handleNewGoal}
                isFormSubmitting={isAddingNewGoal}
              />
            )}
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
        <Card.Section p="xs" pos="relative">
          <LoadingOverlay
            visible={isAchievingGoal}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <ScrollArea h={240}>{lifeGoals}</ScrollArea>
        </Card.Section>
      </Card>
    </>
  );
}

export default GoalSettings;
