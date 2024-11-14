import {
  Button,
  NativeSelect,
  NumberInput,
  Paper,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { CommutationMethod } from "../types/TravelRotineType";
import { ChangeEvent } from "react";

type TravelDetailsForm = {
  startingPoint: string;
  endingPoint: string;
  totalDistance: number;
  totalTimeTaken: number;
  commutationMethod: CommutationMethod;
};

const TRAVEL_DETAILS_INIT_VALUES: TravelDetailsForm = {
  startingPoint: "",
  endingPoint: "",
  totalDistance: 0,
  totalTimeTaken: 0,
  commutationMethod: "bike",
};

type AddTravelDetailsFormParams = {
  onAddingTravelDetails: (method: CommutationMethod, distance: number) => void;
};

function AddTravelDetailsForm({
  onAddingTravelDetails,
}: AddTravelDetailsFormParams) {
  const form = useForm<TravelDetailsForm>({
    initialValues: TRAVEL_DETAILS_INIT_VALUES,
    validate: {},
  });

  const selectTravelMethodHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case "Bike":
        form.setFieldValue("commutationMethod", "bike");
        break;
      case "Car":
        form.setFieldValue("commutationMethod", "car");
        break;
      case "Walking":
        form.setFieldValue("commutationMethod", "walking");
        break;
      case "Public Transport":
        form.setFieldValue("commutationMethod", "public transport");
        break;
    }
  };

  const addTravelRoutineHandler = () => {
    onAddingTravelDetails(
      form.values.commutationMethod,
      form.values.totalDistance
    );
    form.reset();
  };

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <form
        onSubmit={form.onSubmit(() => {
          addTravelRoutineHandler();
        })}
      >
        <TextInput
          label="Starting Point"
          placeholder="Starting Point of the Journey"
          value={form.values.startingPoint}
          onChange={(event) =>
            form.setFieldValue("startingPoint", event.currentTarget.value)
          }
          required
        />
        <TextInput
          label="Ending Point"
          placeholder="Ending Point of the Journey"
          value={form.values.endingPoint}
          onChange={(event) =>
            form.setFieldValue("endingPoint", event.currentTarget.value)
          }
          required
        />
        <NumberInput
          label="Total Distance"
          placeholder="Total Distance Covered by the Journey"
          value={form.values.totalDistance}
          onChange={(value) =>
            form.setFieldValue("totalDistance", Number(value))
          }
          min={0}
          required
        />
        <NumberInput
          label="Total Time Taken"
          placeholder="Total Time Taken by the Journey"
          value={form.values.totalTimeTaken}
          onChange={(value) =>
            form.setFieldValue("totalDistance", Number(value))
          }
          min={0}
          required
        />
        <NativeSelect
          label="Commutation Method"
          value={form.values.commutationMethod}
          onChange={selectTravelMethodHandler}
          withAsterisk
          data={["Bike", "Car", "Walking", "Public Transport"]}
        />
        <Button type="submit" fullWidth mt="xl">
          Add Travel Details
        </Button>
      </form>
    </Paper>
  );
}

export default AddTravelDetailsForm;
