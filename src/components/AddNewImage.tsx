import { Button, Group, Image, ScrollArea, Space } from "@mantine/core";
import { useState } from "react";
import Webcam, { WebcamProps } from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

function AddNewImage() {
  const [image, setImage] = useState<string | null>(null);
  const handleScreenshot = (getScreenshot: () => string | null) => {
    const imageSrc = getScreenshot();
    if (imageSrc) {
      console.log("Captured image source:", imageSrc);
      setImage(imageSrc);
    }
  };

  return (
    <ScrollArea h={400}>
      <Webcam
        audio={false}
        height={720}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
        children={
          (({ getScreenshot }: { getScreenshot: () => string | null }) => (
            <>
              <Space h="md" />
              <Group justify="center">
                <Button
                  variant="filled"
                  color="green"
                  onClick={() => handleScreenshot(getScreenshot)}
                >
                  Capture photo
                </Button>
              </Group>
            </>
          )) as WebcamProps["children"]
        }
      />
      <Space h="md" />
      {image && <Image mb="sm" radius="md" src={image} />}
    </ScrollArea>
  );
}

export default AddNewImage;
