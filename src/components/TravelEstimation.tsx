import {
  ActionIcon,
  Card,
  Container,
  Group,
  Modal,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { SAMPLE_TRAVEL_ROUTINE } from "../sample-data/SampleData";
import { useState } from "react";
import {
  CommutationMethod,
  TravelRoutineType,
} from "../types/TravelRoutineType";
import IconMotrobike from "./icons/IconMotrobike";
import IconCar from "./icons/IconCar";
import IconWalk from "./icons/IconWalk";
import IconBus from "./icons/IconBus";
import IconPlus from "./icons/IconPlus";
import { useDisclosure } from "@mantine/hooks";
import AddTravelDetailsForm from "./AddTravelDetailsForm";

function TravelEstimation() {
  const [travelRoutine, setTravelRoutine] = useState<TravelRoutineType>(
    SAMPLE_TRAVEL_ROUTINE
  );
  const [opened, { open, close }] = useDisclosure();

  const handleTravel = (method: CommutationMethod, distance: number) => {
    setTravelRoutine((prevRoutine) => {
      const newTravelRoutine: TravelRoutineType = { ...prevRoutine };
      newTravelRoutine["totalDistance"] += distance;
      newTravelRoutine["distanceCoveredByEachCategory"] = newTravelRoutine[
        "distanceCoveredByEachCategory"
      ].map((routine) => {
        return {
          ...routine,
          distance:
            routine.method === method
              ? routine.distance + distance
              : routine.distance,
        };
      });
      return newTravelRoutine;
    });
    close();
  };

  const categorizedTravelRoutine =
    travelRoutine.distanceCoveredByEachCategory.map((routine) => {
      switch (routine.method) {
        case "bike":
          return (
            <Container className="border-r-2 border-gray-500">
              <Stack>
                <Group>
                  <IconMotrobike size="3rem" stroke={1.5} />
                  <Text fz={20}>Bike</Text>
                </Group>
                <Text ta="center">{routine.distance} KM</Text>
              </Stack>
            </Container>
          );
        case "car":
          return (
            <Container className="border-r-2 border-gray-500">
              <Stack>
                <Group>
                  <IconCar size="3rem" stroke={1.5} />
                  <Text fz={20}>Car</Text>
                </Group>
                <Text ta="center">{routine.distance} KM</Text>
              </Stack>
            </Container>
          );
        case "walking":
          return (
            <Container>
              <Stack>
                <Group>
                  <IconWalk size="3rem" stroke={1.5} />
                  <Text fz={20}>Walking</Text>
                </Group>
                <Text ta="center">{routine.distance} KM</Text>
              </Stack>
            </Container>
          );
        case "public transport":
          return (
            <Container className="border-r-2 border-gray-500">
              <Stack>
                <Group>
                  <IconBus size="3rem" stroke={1.5} />
                  <Text fz={20}>Public Transport</Text>
                </Group>
                <Text ta="center">{routine.distance} KM</Text>
              </Stack>
            </Container>
          );
      }
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
              Add Travel Info
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddTravelDetailsForm onAddingTravelDetails={handleTravel} />
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
        w="98%"
        h="35dvh"
      >
        <Card.Section p="md">
          <Group>
            <Title order={2}>Travel Estimation</Title>
            <Tooltip label="Add new travel details">
              <ActionIcon
                variant="default"
                onClick={open}
                styles={{ icon: {} }}
              >
                <IconPlus size="3rem" stroke={1.5} />
              </ActionIcon>
            </Tooltip>
          </Group>
          <Text fz={20}>
            Total Distance Covered: {travelRoutine.totalDistance} KM
          </Text>
        </Card.Section>
        <Card.Section p="md">
          <Group>{categorizedTravelRoutine}</Group>
        </Card.Section>
      </Card>
    </>
  );
}

export default TravelEstimation;
