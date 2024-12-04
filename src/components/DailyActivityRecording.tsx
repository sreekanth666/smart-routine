import {
  Accordion,
  ActionIcon,
  Card,
  Group,
  Modal,
  ScrollArea,
  Title,
  Tooltip,
} from "@mantine/core";
import IconPlus from "./UI/icons/IconPlus";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { SAMPLE_DAILY_ACTIVITIES } from "../sample-data/SampleData";
import { DailyActivity } from "../types/SuggestionType";
import { generateRandomID } from "../utils/helpers";
import AddNewDailyActivityForm from "./AddNewDailyActivityForm";

function DailyActivityRecording() {
  const [dailyActivities, setDailyActivities] = useState<DailyActivity[]>(
    SAMPLE_DAILY_ACTIVITIES
  );
  const [opened, { open, close }] = useDisclosure();

  const handleNewDailyActivity = (title: string, description: string) => {
    setDailyActivities((prevActivities) => [
      ...prevActivities,
      { title, description, id: generateRandomID() },
    ]);
    close();
  };

  const activities = dailyActivities.map((activity) => (
    <Accordion.Item
      key={activity.id}
      value={activity.title}
      bg={"var(--mantine-color-gray-4)"}
    >
      <Accordion.Control>{activity.title}</Accordion.Control>
      <Accordion.Panel>{activity.description}</Accordion.Panel>
    </Accordion.Item>
  ));

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
              Add New Daily Routine
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddNewDailyActivityForm
              onAddingNewDailyActivity={handleNewDailyActivity}
            />
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
        <Card.Section p="sm">
          <ScrollArea h={250}>
            <Accordion variant="separated">{activities}</Accordion>
          </ScrollArea>
        </Card.Section>
      </Card>
    </>
  );
}

export default DailyActivityRecording;
