import { AspectRatio, Flex, Grid, Image, Overlay, Title } from "@mantine/core";
import classes from "./ImageGrid.module.css";
import { Imagetype } from "../types/SuggestionType";
import ImageGridCell from "./ImageGridCell";

type ImageGridProps = {
  images: Imagetype[];
};

function ImageGrid({ images }: ImageGridProps) {
  return (
    <Grid grow gutter="lg">
      <ImageGridCell image={images[0]} />
      <ImageGridCell image={images[1]} />
      <ImageGridCell image={images[2]} />
      <Grid.Col span={{ base: 12, md: 6 }} ta="center">
        <AspectRatio ratio={1} maw={200} mx="auto" pos="relative">
          <Image
            src={images[3].image}
            height={200}
            alt={images[3].altDescription}
          />
          <Overlay
            color="#000"
            backgroundOpacity={0.35}
            blur={15}
            h={270}
            w={270}
            zIndex={5}
          />
          <Flex
            h="100%"
            justify="center"
            align="center"
            className={classes["child-flex-box"]}
          >
            <Title order={1} c="white">
              +{images.length - 3}
            </Title>
          </Flex>
        </AspectRatio>
      </Grid.Col>
    </Grid>
  );
}

export default ImageGrid;
