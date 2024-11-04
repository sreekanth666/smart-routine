import { Modal, ScrollArea } from "@mantine/core";
import { SAMPLE_ROUTINES } from "./SampleData";
import { ReactElement, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { RoutineType, RoutineTypeWithoutId } from "../types/SuggestionType";
import ViewRoutineDetails from "./ViewRoutineDetails";
import RoutineCard from "./RoutineCard";

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
    console.log(id);
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

  const routines = routineList.map((routine) => (
    <RoutineCard routine={routine} viewRoutine={handleViewButtonClick} />
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

      <ScrollArea h={500} type="scroll" scrollbarSize={5} scrollHideDelay={0}>
        {routines}
      </ScrollArea>
    </>
  );
}

export default RoutinesList;
