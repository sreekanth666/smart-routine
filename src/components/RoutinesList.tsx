import { Modal } from "@mantine/core";
import { SAMPLE_ROUTINES } from "./SampleData";
import { ReactElement, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  RoutineType,
  RoutineTypeWithoutId,
  RoutineTypeWithoutIdAndImages,
} from "../types/SuggestionType";
import ViewRoutineDetails from "./ViewRoutineDetails";
import RoutineCard from "./RoutineCard";
import EditRoutine from "./EditRoutine";
import DeleteRoutine from "./DeleteRoutine";
import ScrollableContainer from "./UI/ScrollableContainer";

function RoutinesList() {
  const [routineList, setRoutineList] = useState(SAMPLE_ROUTINES);
  const [modalContent, setModalContent] = useState<ReactElement | null>();
  const [modalTitle, setModalTitle] = useState<string | null>();
  const [opened, { open, close }] = useDisclosure();

  const openModal = () => {
    open();
  };

  const closeModal = () => {
    setModalContent(null);
    setModalTitle(null);
    close();
  };

  const handleViewButtonClick = (id: number) => {
    const selectedRoutine: RoutineType[] = routineList.filter(
      (routine) => routine.id === id
    );
    const routine: RoutineTypeWithoutId = {
      title: selectedRoutine[0].title,
      description: selectedRoutine[0].description,
      images: selectedRoutine[0].images,
    };

    setModalContent(<ViewRoutineDetails routine={routine} />);
    setModalTitle(`View details`);
    openModal();
  };

  const handleEditButtonClick = (id: number) => {
    const selectedRoutine: RoutineType[] = routineList.filter(
      (routine) => routine.id === id
    );

    setModalContent(
      <EditRoutine editRoutine={editRoutine} routine={selectedRoutine[0]} />
    );
    setModalTitle(`Edit routine`);
    openModal();
  };

  const editRoutine = (
    id: number,
    newRoutine: RoutineTypeWithoutIdAndImages
  ) => {
    setRoutineList((prevRoutines) =>
      prevRoutines.map((routine) =>
        routine.id === id
          ? {
              ...routine,
              ...newRoutine,
            }
          : routine
      )
    );
    closeModal();
  };

  const handleDeleteButtonClick = (id: number, title: string) => {
    setModalContent(
      <DeleteRoutine
        routine={{ id, title }}
        onCloseModal={close}
        deleteRoutine={deleteUser}
      />
    );
    setModalTitle(`Delete Routine`);
    openModal();
  };

  const deleteUser = (id: number) => {
    setRoutineList((prevRoutines) =>
      prevRoutines.filter((routine) => routine.id !== id)
    );
    closeModal();
  };

  const routines = routineList.map((routine) => (
    <RoutineCard
      key={routine.id}
      routine={routine}
      viewRoutine={handleViewButtonClick}
      editRoutine={handleEditButtonClick}
      deleteRoutine={handleDeleteButtonClick}
    />
  ));

  return (
    <>
      <Modal.Root opened={opened} onClose={closeModal}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header style={{ justifyContent: "center" }}>
            <Modal.Title
              style={{
                color: "blue",
                fontWeight: 600,
                fontSize: "xx-large",
                textAlign: "center",
              }}
            >
              {modalTitle}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalContent}</Modal.Body>
        </Modal.Content>
      </Modal.Root>

      <ScrollableContainer height={600}>{routines}</ScrollableContainer>
    </>
  );
}

export default RoutinesList;
