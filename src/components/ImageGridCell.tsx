import { AspectRatio, Grid, Image } from "@mantine/core";
import { Imagetype } from "../types/SuggestionType";

type ImageGridCellProps = {
  image: Imagetype;
};

function ImageGridCell({ image }: ImageGridCellProps) {
  return (
    <Grid.Col span={{ base: 12, md: 6 }}>
      <AspectRatio ratio={1}>
        <Image src={image.image} height={200} alt={image.altDescription} />
      </AspectRatio>
    </Grid.Col>
  );
}

export default ImageGridCell;
