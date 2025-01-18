import {
  Accordion,
  ActionIcon,
  Card,
  Group,
  Modal,
  ScrollArea,
  Skeleton,
  Title,
  Tooltip,
} from "@mantine/core";
import IconPlus from "./UI/icons/IconPlus";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { DailyActivity } from "../types/SuggestionType";
import AddNewDailyActivityForm from "./AddNewDailyActivityForm";
import {
  useAddDailyActivity,
  useGetUserDailyActivities,
} from "../hooks/dailyActivityHooks";

type UserDailyActivityType = {
  title: string;
  description: string;
  _id: string;
};

function DailyActivityRecording() {
  const [dailyActivities, setDailyActivities] = useState<DailyActivity[]>([]);
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);

  const {
    isGetUserDailyActivities,
    userDailyActivities,
    userDailyActivitiesError,
  } = useGetUserDailyActivities();

  const {
    isCreatingDailyActivity,
    addDailyActivity,
    createDailyActivityError,
  } = useAddDailyActivity();

  const [opened, { open, close }] = useDisclosure();

  useEffect(() => {
    if (!isGetUserDailyActivities && !userDailyActivitiesError) {
      const userActivities: UserDailyActivityType[] =
        userDailyActivities?.data || [];

      setDailyActivities(
        userActivities.map((activity) => ({
          title: activity.title,
          description: activity.description,
          id: activity._id,
        }))
      );
    }
  }, [isGetUserDailyActivities, userDailyActivitiesError, userDailyActivities]);

  const renderContent = () => {
    if (isGetUserDailyActivities) {
      return (
        <Card.Section p="md">
          <Group>
            <Skeleton height={12} width="30%" radius="xl" />
            <Skeleton height={8} width="40%" radius="xl" />
          </Group>
          <Card.Section p="sm">
            <Skeleton height={8} radius="xl" />
            <Skeleton height={8} radius="xl" />
            <Skeleton height={8} radius="xl" />
            <Skeleton height={8} radius="xl" />
          </Card.Section>
        </Card.Section>
      );
    }

    if (userDailyActivitiesError) {
      return (
        <Card.Section p="sm">
          <Title order={4} c="red">
            Error: Unable to fetch daily activities
          </Title>
        </Card.Section>
      );
    }

    if (dailyActivities.length === 0) {
      return (
        <Card.Section p="sm">
          <Title order={4}>No Daily Activities available. Please add some.</Title>
        </Card.Section>
      );
    }

    return (
      <Card.Section p="sm">
        <ScrollArea h={250} pb="md">
          <Accordion variant="separated">
            {dailyActivities.map((activity) => (
              <Accordion.Item
                key={activity.id}
                value={activity.title}
                bg={"var(--mantine-color-gray-4)"}
              >
                <Accordion.Control>{activity.title}</Accordion.Control>
                <Accordion.Panel>{activity.description}</Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </ScrollArea>
      </Card.Section>
    );
  };

  const handleNewDailyActivity = (title: string, description: string) => {
    setIsFormSubmitting(true);
    addDailyActivity({ title, description });
    setIsFormSubmitting(false);
    close();
  };

  return (
    <>
      <Modal.Root opened={opened} onClose={() => { setIsFormSubmitting(false); close(); }}>
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
              Add New Daily Routine
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {isFormSubmitting && createDailyActivityError ? (
              <Title order={4} c="red">
                Error: Unable to add daily activity
              </Title>
            ) : (
              <AddNewDailyActivityForm
                onAddingNewDailyActivity={handleNewDailyActivity}
                isFormSubmitting={isCreatingDailyActivity}
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
            <Title order={2}>Daily Activity Recording</Title>
            <Tooltip label="Add new daily activity">
              <ActionIcon variant="default" onClick={open}>
                <IconPlus size="3rem" stroke={1.5} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Card.Section>
        {renderContent()}
      </Card>
    </>
  );
}

export default DailyActivityRecording;
