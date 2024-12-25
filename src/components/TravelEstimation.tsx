import {
  ActionIcon,
  Card,
  Grid,
  Group,
  Modal,
  Skeleton,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useEffect, useState } from "react";
import {
  CommutationMethod,
  TravelRoutineType,
} from "../types/TravelRoutineType";
import IconMotrobike from "./UI/icons/IconMotrobike";
import IconCar from "./UI/icons/IconCar";
import IconWalk from "./UI/icons/IconWalk";
import IconBus from "./UI/icons/IconBus";
import IconPlus from "./UI/icons/IconPlus";
import { useDisclosure } from "@mantine/hooks";
import AddTravelDetailsForm from "./AddTravelDetailsForm";
import {
  useCreateTravelEstimation,
  useGetUserTravelEstimation,
} from "../hooks/travelEstimationHooks";

type UserTravelEstimationType = {
  commutation: CommutationMethod;
  createdAt: string;
  destination: string;
  distance: string;
  duration: string;
  starting: string;
  updatedAt: string;
  userId: string;
  _id: string;
};

const TRAVEL_ROUTINE: TravelRoutineType = {
  totalDistance: 0,
  distanceCoveredByEachCategory: [
    {
      method: "bike",
      distance: 0,
    },
    {
      method: "car",
      distance: 0,
    },
    {
      method: "public transport",
      distance: 0,
    },
    {
      method: "walking",
      distance: 0,
    },
  ],
};

function TravelEstimation() {
  const [travelRoutine, setTravelRoutine] =
    useState<TravelRoutineType>(TRAVEL_ROUTINE);
  const [opened, { open, close }] = useDisclosure();
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const {
    isUserTravelEstimationLoading,
    userTravelEstimation,
    userTravelEstimationError,
  } = useGetUserTravelEstimation();

  const {
    isCreatingTravelEstimation,
    addTravelEstimation,
    isCreatingTravelEstimationError,
  } = useCreateTravelEstimation();

  useEffect(
    function () {
      if (!isUserTravelEstimationLoading && !userTravelEstimationError) {
        const travelEstimation: UserTravelEstimationType[] =
          userTravelEstimation?.data;
        let totalDistance = 0,
          bikeTravelDistance = 0,
          carTravelDistance = 0,
          publicTransportDistance = 0,
          walkingDistance = 0;
        travelEstimation.map((estimationData) => {
          const distance = Number(estimationData.distance);
          totalDistance += distance;
          switch (estimationData.commutation) {
            case "bike":
              bikeTravelDistance += distance;
              break;
            case "car":
              carTravelDistance += distance;
              break;
            case "public transport":
              publicTransportDistance += distance;
              break;
            default:
              walkingDistance += distance;
              break;
          }
        });
        setTravelRoutine({
          totalDistance: totalDistance,
          distanceCoveredByEachCategory: [
            {
              method: "bike",
              distance: bikeTravelDistance,
            },
            {
              method: "car",
              distance: carTravelDistance,
            },
            {
              method: "public transport",
              distance: publicTransportDistance,
            },
            {
              method: "walking",
              distance: walkingDistance,
            },
          ],
        });
      }
    },
    [
      isUserTravelEstimationLoading,
      userTravelEstimation,
      userTravelEstimationError,
    ]
  );

  if (isUserTravelEstimationLoading) {
    return (
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
          <Stack>
            <Skeleton height={12} width="30%" radius="xl" />
            <Skeleton height={8} width="40%" radius="xl" />
          </Stack>
        </Card.Section>
        <Card.Section p="md">
          <Grid>
            <Grid.Col span={3} className="border-r-2 border-gray-500">
              <Stack>
                <Group justify="space-evenly">
                  <Skeleton height={50} circle mb="xl" />
                  <Skeleton height={8} mt={6} width="30%" radius="xl" />
                </Group>
                <Skeleton height={8} radius="xl" />
              </Stack>
            </Grid.Col>
            <Grid.Col span={3} className="border-r-2 border-gray-500">
              <Stack>
                <Group justify="space-evenly">
                  <Skeleton height={50} circle mb="xl" />
                  <Skeleton height={8} mt={6} width="30%" radius="xl" />
                </Group>
                <Skeleton height={8} radius="xl" />
              </Stack>
            </Grid.Col>
            <Grid.Col span={3} className="border-r-2 border-gray-500">
              <Stack>
                <Group justify="space-evenly">
                  <Skeleton height={50} circle mb="xl" />
                  <Skeleton height={8} mt={6} width="30%" radius="xl" />
                </Group>
                <Skeleton height={8} radius="xl" />
              </Stack>
            </Grid.Col>
            <Grid.Col span={3}>
              <Stack>
                <Group justify="space-evenly">
                  <Skeleton height={50} circle mb="xl" />
                  <Skeleton height={8} mt={6} width="30%" radius="xl" />
                </Group>
                <Skeleton height={8} radius="xl" />
              </Stack>
            </Grid.Col>
          </Grid>
        </Card.Section>
      </Card>
    );
  }

  if (userTravelEstimationError !== null) {
    return (
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
          <Title order={2}>Travel Estimation</Title>
        </Card.Section>
        <Card.Section p="md">
          <Title order={4} c="red">
            Error: Something bad happened
          </Title>
        </Card.Section>
      </Card>
    );
  }

  const handleTravel = (
    startingPoint: string,
    endingPoint: string,
    distance: number,
    duration: number,
    method: CommutationMethod
  ) => {
    setIsFormSubmitted(true); // Set form as submitted
    addTravelEstimation({
      starting: startingPoint,
      destination: endingPoint,
      distance: distance.toString(),
      duration: duration.toString(),
      commutation: method,
    });
    close();
  };

  const handleModalClose = () => {
    setIsFormSubmitted(false);
    close();
  };

  const categorizedTravelRoutine =
    travelRoutine.distanceCoveredByEachCategory.map((routine) => {
      switch (routine.method) {
        case "bike":
          return (
            <Grid.Col
              key={routine.method}
              span={3}
              className="border-r-2 border-gray-500"
            >
              <Stack>
                <Group justify="space-evenly">
                  <IconMotrobike size="3rem" stroke={1.5} />
                  <Text fz={20}>Bike</Text>
                </Group>
                <Text ta="center">{routine.distance} KM</Text>
              </Stack>
            </Grid.Col>
          );
        case "car":
          return (
            <Grid.Col
              key={routine.method}
              span={3}
              className="border-r-2 border-gray-500"
            >
              <Stack>
                <Group justify="space-evenly">
                  <IconCar size="3rem" stroke={1.5} />
                  <Text fz={20}>Car</Text>
                </Group>
                <Text ta="center">{routine.distance} KM</Text>
              </Stack>
            </Grid.Col>
          );
        case "walking":
          return (
            <Grid.Col key={routine.method} span={3}>
              <Stack>
                <Group justify="space-evenly">
                  <IconWalk size="3rem" stroke={1.5} />
                  <Text fz={20}>Walking</Text>
                </Group>
                <Text ta="center">{routine.distance} KM</Text>
              </Stack>
            </Grid.Col>
          );
        case "public transport":
          return (
            <Grid.Col
              key={routine.method}
              span={3}
              className="border-r-2 border-gray-500"
            >
              <Stack>
                <Group justify="space-evenly">
                  <IconBus size="3rem" stroke={1.5} />
                  <Text fz={20}>Public Transport</Text>
                </Group>
                <Text ta="center">{routine.distance} KM</Text>
              </Stack>
            </Grid.Col>
          );
      }
    });

  return (
    <>
      <Modal.Root opened={opened} onClose={handleModalClose}>
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
            {isFormSubmitted && isCreatingTravelEstimationError !== null ? (
              <Title order={4} c="red">
                Error: Something bad happened while adding travel estimation
              </Title>
            ) : (
              <AddTravelDetailsForm
                onAddingTravelDetails={handleTravel}
                isFormSubmitting={isCreatingTravelEstimation}
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
          <Grid>{categorizedTravelRoutine}</Grid>
        </Card.Section>
      </Card>
    </>
  );
}

export default TravelEstimation;
