import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  LoadingOverlay,
  Title,
  Card,
  Text,
  Group,
  Stack,
  Modal,
  ActionIcon,
  Alert,
  Image,
  Paper,
  Badge,
  Divider,
  SimpleGrid,
  Box,
  Accordion,
  Loader,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  PlusIcon,
  ClockIcon,
  PencilIcon,
  ChartBarIcon,
  TrashIcon,
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  LightBulbIcon,
  XCircleIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { useAnalyseRoutine, useGetRoutines } from "../hooks/routineHooks";
import { RoutineType } from "../types/SuggestionType";
import { BASE_URL } from "../utils/constants";

type ServerRoutineDataType = {
  _id: string;
  name: string;
  description: string;
  image: string[];
  time: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

type ApiResponse = {
  statusCode: number;
  data: ServerRoutineDataType[];
  message: string;
};

type AnalysisProduct = {
  product: string;
  category: string;
  good: string;
  bad: string;
  recommendation: string;
};

type AnalysisData = {
  routineAnalysis: {
    time: string;
    products: AnalysisProduct[];
  }[];
  overallFeedback: {
    goodsSummary: string;
    badsSummary: string;
    generalRecommendations: string;
  };
};

const Routines = () => {
  const [routinesList, setRoutinesList] = useState<RoutineType[]>([]);
  const [selectedRoutine, setSelectedRoutine] = useState<RoutineType | null>(
    null
  );
  const [
    detailModalOpened,
    { open: openDetailModal, close: closeDetailModal },
  ] = useDisclosure(false);
  const [selectedDetailRoutine, setSelectedDetailRoutine] =
    useState<RoutineType | null>(null);
  const navigate = useNavigate();
  const { isGettingRoutines, userRoutines, userRoutinesError } =
    useGetRoutines();
  const analysingRoutineId: string = selectedRoutine?.id ?? "";
  const { isAnalysingRoutine, routineAnalysis, routineAnalysisError } =
    useAnalyseRoutine(analysingRoutineId);

  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  useEffect(() => {
    if (
      !isGettingRoutines &&
      userRoutinesError === null &&
      userRoutines?.data
    ) {
      const response: ApiResponse = userRoutines;
      setRoutinesList(
        response.data.map((routineItem) => ({
          id: routineItem._id,
          title: routineItem.name,
          description: routineItem.description,
          images: routineItem.image.map((imageItem) => ({
            image: `${BASE_URL}/file/routine/${imageItem}`,
            altDescription: imageItem,
          })),
          time: routineItem.time,
          createdAt: new Date(routineItem.createdAt).toLocaleDateString(),
        }))
      );
    }
  }, [isGettingRoutines, userRoutinesError, userRoutines]);

  useEffect(() => {
    if (
      analysingRoutineId !== "" &&
      !isAnalysingRoutine &&
      routineAnalysisError === null
    ) {
      setAnalysisData(routineAnalysis?.data);
    }
  }, [
    analysingRoutineId,
    isAnalysingRoutine,
    routineAnalysis,
    routineAnalysisError,
  ]);

  const handleViewDetails = (routine: RoutineType) => {
    setSelectedDetailRoutine(routine);
    openDetailModal();
  };

  const getTimeColor = (time: string) => {
    switch (time.toUpperCase()) {
      case "MORNING":
        return "yellow";
      case "AFTERNOON":
        return "orange";
      case "EVENING":
        return "blue";
      case "NIGHT":
        return "indigo";
      default:
        return "gray";
    }
  };

  const RoutineCard = ({ routine }: { routine: RoutineType }) => (
    <Card shadow="sm" padding={0} radius="md" withBorder>
      <Card.Section style={{ position: "relative" }}>
        <Image
          src={routine.images[0].image}
          height={200}
          alt={routine.images[0].altDescription}
        />
        {routine.images.length > 1 && (
          <Badge
            className="absolute top-2 right-2"
            size="lg"
            variant="filled"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
            leftSection={<PhotoIcon className="w-4 h-4" />}
          >
            +{routine.images.length - 1}
          </Badge>
        )}
      </Card.Section>

      <Stack p="md">
        <Group mt="xs">
          <Title order={4} lineClamp={1}>
            {routine.title}
          </Title>
          <Badge
            color={getTimeColor(routine.time)}
            variant="light"
            size="sm"
            leftSection={<ClockIcon className="w-3 h-3" />}
          >
            {routine.time}
          </Badge>
        </Group>

        <Text size="sm" c="dimmed" lineClamp={2}>
          {routine.description}
        </Text>

        <Divider my="xs" />

        <Group>
          <Group>
            <ActionIcon
              variant="light"
              color="blue"
              onClick={() => navigate(`/routine/edit/${routine.id}`)}
              size="sm"
            >
              <PencilIcon className="w-4 h-4" />
            </ActionIcon>
            <ActionIcon
              variant="light"
              color="green"
              onClick={() => setSelectedRoutine(routine)}
              size="sm"
            >
              <ChartBarIcon className="w-4 h-4" />
            </ActionIcon>
            <ActionIcon variant="light" color="red" size="sm">
              <TrashIcon className="w-4 h-4" />
            </ActionIcon>
          </Group>
          <Button
            variant="light"
            size="xs"
            onClick={() => handleViewDetails(routine)}
            rightSection={<ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />}
          >
            View Details
          </Button>
        </Group>
      </Stack>
    </Card>
  );

  const DetailModal = () => (
    <Modal
      opened={detailModalOpened}
      onClose={closeDetailModal}
      size="lg"
      padding="md"
      title={
        <Group>
          <Title order={3}>{selectedDetailRoutine?.title}</Title>
          <Badge
            color={getTimeColor(selectedDetailRoutine?.time || "")}
            variant="light"
            size="lg"
            leftSection={<ClockIcon className="w-3.5 h-3.5" />}
          >
            {selectedDetailRoutine?.time}
          </Badge>
        </Group>
      }
    >
      <Stack>
        <SimpleGrid cols={2} spacing="md">
          {selectedDetailRoutine?.images.map((img, index) => (
            <Image
              key={index}
              src={img.image}
              height={200}
              radius="md"
              alt={img.altDescription}
            />
          ))}
        </SimpleGrid>

        <Box>
          <Title order={5} mb="xs">
            Description
          </Title>
          <Text>{selectedDetailRoutine?.description}</Text>
        </Box>
      </Stack>
    </Modal>
  );

  const AnalysisPanel = () => {
    // console.log(selectedRoutine);

    if (analysingRoutineId !== "" && isAnalysingRoutine) {
      return (
        <Paper shadow="sm" p="md" radius="md" withBorder h="100%">
          <Loader color="green" type="dots" />
        </Paper>
      );
    }

    if (analysingRoutineId !== "" && routineAnalysisError !== null) {
      return (
        <Paper shadow="sm" p="md" radius="md" withBorder h="100%">
          <Title order={4} c="red">
            Error: Something bad happened at retrieving routine analysis data
          </Title>
        </Paper>
      );
    }

    return (
      <Paper shadow="sm" p="md" radius="md" withBorder h="100%">
        {selectedRoutine !== null &&
        analysingRoutineId !== "" &&
        analysisData ? (
          <Stack>
            <Group>
              <Title order={3}>Analysis Report</Title>
              <Badge
                color={getTimeColor(selectedRoutine?.time)}
                variant="light"
              >
                {selectedRoutine.time}
              </Badge>
            </Group>

            <Card withBorder>
              <Title order={4} mb="md">
                Overall Feedback
              </Title>
              <Stack>
                <Group align="flex-start" wrap="nowrap">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <Text size="sm">
                    {analysisData?.overallFeedback.goodsSummary}
                  </Text>
                </Group>
                <Group align="flex-start" wrap="nowrap">
                  <XCircleIcon className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <Text size="sm">
                    {analysisData?.overallFeedback.badsSummary}
                  </Text>
                </Group>
                <Group align="flex-start" wrap="nowrap">
                  <LightBulbIcon className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                  <Text size="sm">
                    {analysisData?.overallFeedback.generalRecommendations}
                  </Text>
                </Group>
              </Stack>
            </Card>

            <Card withBorder>
              <Title order={4} mb="md">
                Product Analysis
              </Title>
              <Accordion>
                {analysisData?.routineAnalysis[0].products.map(
                  (product, index) => (
                    <Accordion.Item key={index} value={product.product}>
                      <Accordion.Control>
                        <Text fw={500}>{product.product}</Text>
                        <Text size="xs" c="dimmed">
                          {product.category}
                        </Text>
                      </Accordion.Control>
                      <Accordion.Panel>
                        <Stack>
                          <Group align="flex-start" wrap="nowrap">
                            <CheckCircleIcon className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                            <Text size="sm">{product.good}</Text>
                          </Group>
                          <Group align="flex-start" wrap="nowrap">
                            <XCircleIcon className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                            <Text size="sm">{product.bad}</Text>
                          </Group>
                          <Group align="flex-start" wrap="nowrap">
                            <LightBulbIcon className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                            <Text size="sm">{product.recommendation}</Text>
                          </Group>
                        </Stack>
                      </Accordion.Panel>
                    </Accordion.Item>
                  )
                )}
              </Accordion>
            </Card>
          </Stack>
        ) : (
          <Stack align="center" mt={50}>
            <ChartBarIcon className="w-12 h-12 text-gray-400" />
            <Text c="dimmed" ta="center">
              Select a routine to view its analysis
            </Text>
          </Stack>
        )}
      </Paper>
    );
  };

  return (
    <div style={{ position: "relative" }}>
      <LoadingOverlay
        visible={isGettingRoutines}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />

      <Group mb="xl">
        <Title order={2}>Routines</Title>
        <Group>
          <Button
            variant="light"
            leftSection={<PlusIcon className="w-4 h-4" />}
            onClick={() => navigate("/routine/add/new")}
          >
            Add Routine
          </Button>
          <Button variant="filled">Plan Routine</Button>
        </Group>
      </Group>

      {userRoutinesError && (
        <Alert color="red" mb="md">
          Error: Something bad happened while retrieving user routines
        </Alert>
      )}

      <Grid>
        <Grid.Col span={7}>
          <SimpleGrid cols={2} spacing="md">
            {routinesList.map((routine) => (
              <RoutineCard key={routine.id} routine={routine} />
            ))}
          </SimpleGrid>
        </Grid.Col>
        <Grid.Col span={5}>
          <Box style={{ position: "sticky", top: "1rem" }}>
            <AnalysisPanel />
          </Box>
        </Grid.Col>
      </Grid>
      <DetailModal />
    </div>
  );
};

export default Routines;
