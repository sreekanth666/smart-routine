import { Button, Group, Image, Paper, ScrollArea, Space } from "@mantine/core";
import { useState } from "react";
import Webcam, { WebcamProps } from "react-webcam";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { dataURLToFile } from "../utils/helpers";
import { analyseProduct } from "../services/apiAnalyseProduct";
import { notifications } from "@mantine/notifications";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

function AddNewImage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalysing, setIsAnalysing] = useState<boolean>(false);
  // const { analyseProductImage } = useAnalyseProduct();

  const handleScreenshot = (getScreenshot: () => string | null) => {
    const imageSrc = getScreenshot();
    if (imageSrc) {
      // console.log("Captured image source:", imageSrc);
      setImageUrl(imageSrc);
    }
  };

  const handleProductAnalysis = async () => {
    if (imageUrl) {
      setIsAnalysing(true);
      try {
        const image: File = dataURLToFile(imageUrl, "captured-image.jpg");
        const response = await analyseProduct({ image });
        console.log("Success");
        notifications.show({
          id: "product-image-analysis-success-notification",
          title: "Congratulations 👍",
          message: "Your product analysis is here",
          position: "bottom-right",
          color: "green",
        });
        if (response?.statusCode === 201 && response?.data) {
          setAnalysis(response?.data); // Populate the analysis data from the server
        }
      } catch (error) {
        console.log(error);
        console.log("failed");
        if (error instanceof Error) {
          notifications.show({
            id: "product-image-analysis-error-notification",
            title: "SORRY 🛑",
            message: `ERROR: ${error.message}`,
            color: "red",
            position: "bottom-right",
          });
        } else {
          notifications.show({
            id: "product-image-analysis-error-notification",
            title: "SORRY 🛑",
            message: "An unknown error occurred",
            color: "red",
            position: "bottom-right",
          });
        }
      } finally {
        setIsAnalysing(false);
      }
    }
  };

  const handleRetake = () => {
    setAnalysis(null);
    setImageUrl(null);
  };

  return (
    <ScrollArea h={400}>
      {imageUrl === null ? (
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
      ) : (
        <>
          <Image mb="sm" radius="md" src={imageUrl} />
          <Space h="md" />
          <Group justify="center">
            <Button
              variant="filled"
              color="green"
              onClick={handleProductAnalysis}
              disabled={isAnalysing}
            >
              {isAnalysing ? "Loading..." : "Analyse Product"}
            </Button>
            <Button
              variant="filled"
              color="red"
              onClick={handleRetake}
              disabled={isAnalysing}
            >
              {isAnalysing ? "Loading..." : "Retake Photo"}
            </Button>
          </Group>
          {analysis && (
            <Paper shadow="xs" p="xl">
              <Markdown remarkPlugins={[remarkGfm]}>{analysis}</Markdown>
            </Paper>
          )}
        </>
      )}
    </ScrollArea>
  );
}

export default AddNewImage;
