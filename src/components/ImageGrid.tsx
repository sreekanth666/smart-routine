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
        <AspectRatio
          ratio={1}
          maw={200}
          mx="auto"
          className={classes["parent"]}
        >
          <Image
            src={images[3].image}
            height={200}
            alt={images[3].altDescription}
          />
          <Overlay
            color="#000"
            backgroundOpacity={0.35}
            blur={15}
            className={classes["child-overlay"]}
          />
          <Flex
            h="100%"
            justify="center"
            align="center"
            className={classes["child-flex-box"]}
          >
            <Title order={1} c="white" className={classes["child-text"]}>
              +{images.length - 3}
            </Title>
          </Flex>
        </AspectRatio>
      </Grid.Col>
    </Grid>
  );
}

export default ImageGrid;
