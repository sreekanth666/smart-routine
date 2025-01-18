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
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [opened, { open, close }] = useDisclosure();

  const { isUserGoalsLoading, userGoals, userGoalsError } = useGetUserGoals();
  const { isAddingNewGoal, addGoal, addGoalError } = useAddNewGoal();
  const { isAchievingGoal, achieveUserGoal } = useAchieveGoal();

  useEffect(() => {
    if (!isUserGoalsLoading && userGoals) {
      const receivedUserGoals: UserGoalType[] = userGoals?.data || [];
      setGoals(
        receivedUserGoals.map((goalItem) => ({
          id: goalItem._id,
          goal: goalItem.goal,
          didAchieve: goalItem.isAchieved,
        }))
      );
    }
  }, [isUserGoalsLoading, userGoals]);

  const handleGoalAchievement = (id: string) => {
    achieveUserGoal(id);
  };

  const handleNewGoal = async (newGoal: string) => {
    setIsFormSubmitting(true);
    try {
      await addGoal(newGoal);
    } catch (error) {
      setIsFormSubmitting(false);
    } finally {
      setIsFormSubmitting(false);
    }
  };

  const sortedGoals = goals.sort((a, b) => (a.didAchieve === b.didAchieve ? 0 : a.didAchieve ? 1 : -1));

  const lifeGoals = sortedGoals.map((goalItem) => (
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
  ));

  const renderContent = () => {
    if (isUserGoalsLoading) {
      return (
        <Stack>
          <Skeleton height={12} width="30%" radius="xl" />
          <Skeleton height={8} radius="xl" />
        </Stack>
      );
    }

    if (userGoalsError) {
      return (
        <Title order={4} c="red">
          Error: Unable to retrieve goals.
        </Title>
      );
    }

    if (goals.length === 0) {
      return (
        <Title order={4}>No goals available. Please add some goals.</Title>
      );
    }

    return (
      <ScrollArea h={240}>{lifeGoals}</ScrollArea>
    );
  };

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
            {isFormSubmitting && addGoalError ? (
              <Title order={4} c="red">
                Error: Unable to add new goal.
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
        miw="15rem"
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
          {renderContent()}
        </Card.Section>
      </Card>
    </>
  );
}

export default GoalSettings;
