import {
  AspectRatio,
  Badge,
  Container,
  Group,
  Image,
  Paper,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { Imagetype, RoutineTypeWithoutId } from "../types/SuggestionType";
import { useGetRoutine } from "../hooks/routineHooks";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

type ViewUserDetailsParams = {
  id: string;
};

export type ServerRoutineDataType = {
  name: string;
  description: string;
  image: string[];
  time: string;
};

function ViewRoutineDetails({ id }: ViewUserDetailsParams) {
  const { isGettingRoutine, userRoutine, userRoutineError } = useGetRoutine(id);
  const [routine, setRoutine] = useState<RoutineTypeWithoutId | null>(null);

  useEffect(
    function () {
      if (!isGettingRoutine && userRoutineError === null) {
        const serverRoutine: ServerRoutineDataType = userRoutine?.data;
        const images: Imagetype[] = serverRoutine.image.map((item) => {
          return {
            image: `${BASE_URL}/file/routine/${item}`,
            altDescription: item,
          };
        });
        setRoutine({
          title: serverRoutine.name,
          description: serverRoutine.description,
          images: images,
          time: serverRoutine.time,
        });
      }
    },
    [isGettingRoutine, userRoutine, userRoutineError]
  );

  if (isGettingRoutine) {
    return (
      <Paper shadow="xs" p="xl">
        <Skeleton height={50} mb="xl" />
        <Container mt="md">
          <Skeleton height={12} radius="xl" />
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} radius="xl" />
        </Container>
      </Paper>
    );
  }

  if (userRoutineError !== null) {
    return (
      <Paper shadow="xs" p="xl">
        <Container mt="md">
          <Title order={4}>Routine</Title>
          <Text c="red">
            There was some error while retreiving the routine details.
          </Text>
        </Container>
      </Paper>
    );
  }

  return (
    <Paper shadow="xs" p="xl">
      <Carousel withIndicators height={200} loop>
        {routine?.images.map((image) => (
          <Carousel.Slide key={image.altDescription}>
            <AspectRatio ratio={1}>
              <Image
                src={image.image}
                height={200}
                alt={image.altDescription}
              />
            </AspectRatio>
          </Carousel.Slide>
        ))}
      </Carousel>
      <Container mt="md">
        <Group justify="space-between">
          <Title order={4}>{routine?.title}</Title>
          <Badge
            color={
              routine?.time === "MORNING"
                ? "blue"
                : routine?.time === "AFTERNOON"
                ? "yellow"
                : "red"
            }
            size="xl"
          >
            {routine?.time}
          </Badge>
        </Group>
        <Text>{routine?.description}</Text>
      </Container>
    </Paper>
  );
}

export default ViewRoutineDetails;
