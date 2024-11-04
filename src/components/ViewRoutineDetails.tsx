import {
  AspectRatio,
  Container,
  Image,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { RoutineTypeWithoutId } from "../types/SuggestionType";

type ViewUserDetailsParams = {
  routine: RoutineTypeWithoutId;
};

function ViewRoutineDetails({ routine }: ViewUserDetailsParams) {
  return (
    <Paper shadow="xs" p="xl">
      <Carousel withIndicators height={200} loop>
        {routine.images.map((image) => (
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
        <Title order={4}>{routine.title}</Title>
        <Text>{routine.description}</Text>
      </Container>
    </Paper>
  );
}

export default ViewRoutineDetails;
