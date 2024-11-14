import {
  ActionIcon,
  Card,
  Group,
  Modal,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { SAMPLE_TRAVEL_ROUTINE } from "./SampleData";
import { useState } from "react";
import {
  CommutationMethod,
  TravelRoutineType,
} from "../types/TravelRotineType";
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
            <Stack>
              <Group>
                <IconMotrobike size="3rem" stroke={1.5} />
                <Text fz={20}>Bike</Text>
              </Group>
              <Text ta="center">{routine.distance} KM</Text>
            </Stack>
          );
        case "car":
          return (
            <Stack>
              <Group>
                <IconCar size="3rem" stroke={1.5} />
                <Text fz={20}>Car</Text>
              </Group>
              <Text ta="center">{routine.distance} KM</Text>
            </Stack>
          );
        case "walking":
          return (
            <Stack>
              <Group>
                <IconWalk size="3rem" stroke={1.5} />
                <Text fz={20}>Walking</Text>
              </Group>
              <Text ta="center">{routine.distance} KM</Text>
            </Stack>
          );
        case "public transport":
          return (
            <Stack>
              <Group>
                <IconBus size="3rem" stroke={1.5} />
                <Text fz={20}>Public Transport</Text>
              </Group>
              <Text ta="center">{routine.distance} KM</Text>
            </Stack>
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
            <ActionIcon variant="default" onClick={open}>
              <IconPlus size="3rem" stroke={1.5} />
            </ActionIcon>
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
