import { useEffect, useState } from "react";
import { Button, Flex, Grid, LoadingOverlay, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import RoutineChat from "../components/RoutineChat";
import RoutinesList from "../components/RoutinesList";
import { useGetRoutines } from "../hooks/routineHooks";
import { Imagetype, RoutineType } from "../types/SuggestionType";
import { BASE_URL } from "../utils/constants";

type ServerRoutineDataType = {
  _id: string;
  name: string;
  description: string;
  image: string[];
  time: string;
};

function Routines() {
  const [routinesList, setRoutinesList] = useState<RoutineType[]>([]);
  const navigate = useNavigate();
  const { isGettingRoutines, userRoutines, userRoutinesError } =
    useGetRoutines();

  useEffect(
    function () {
      if (!isGettingRoutines && userRoutinesError === null) {
        const serverRoutineData: ServerRoutineDataType[] = userRoutines?.data;
        setRoutinesList(
          serverRoutineData.map((routineItem) => {
            const images: Imagetype[] = routineItem.image.map((imageItem) => {
              return {
                image: `${BASE_URL}/file/routine/${imageItem}`,
                altDescription: imageItem,
              };
            });
            return {
              id: routineItem._id,
              title: routineItem.name,
              description: routineItem.description,
              images: images,
              time: routineItem.time,
            };
          })
        );
      }
    },
    [isGettingRoutines, userRoutinesError, userRoutines]
  );

  const handleAddRoutineButtonClick = () => {
    navigate(`/routine/add/new`);
  };

  const handleUpdateRoutineButtonClick = (id: string) => {
    navigate(`/routine/edit/${id}`);
  };

  return (
    <Grid>
      <Grid.Col span={12}>
        <Grid>
          <Grid.Col span={6}>
            <Title order={2}>Routines</Title>
          </Grid.Col>
          <Grid.Col style={{ justifyContent: "end" }} span={6}>
            <Flex justify="end">
              <Button
                mr={2}
                color="green"
                onClick={handleAddRoutineButtonClick}
              >
                Add Routine
              </Button>
              <Button color="green" ml={2}>
                Plan Routine
              </Button>
            </Flex>
          </Grid.Col>
        </Grid>
      </Grid.Col>
      <Grid.Col span={7} pos="relative">
        <LoadingOverlay
          visible={isGettingRoutines}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        {userRoutinesError !== null ? (
          <Title order={4} c="red">
            Error: Something bad happened at retrieving user routines
          </Title>
        ) : (
          <RoutinesList
            routinesList={routinesList}
            onUpdateRoutineClick={handleUpdateRoutineButtonClick}
          />
        )}
      </Grid.Col>
      <Grid.Col span={5}>
        <RoutineChat />
      </Grid.Col>
    </Grid>
  );
}

export default Routines;
