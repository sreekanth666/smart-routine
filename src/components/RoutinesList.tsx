import { ReactElement, useState } from "react";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";

import { RoutineType } from "../types/SuggestionType";
import ViewRoutineDetails from "./ViewRoutineDetails";
import RoutineCard from "./RoutineCard";
import DeleteRoutine from "./DeleteRoutine";

type RoutinesListParams = {
  routinesList: RoutineType[];
  onUpdateRoutineClick: (id: string) => void;
  onAnalyzeRoutineClick: (id: string) => void;
};

function RoutinesList({
  routinesList,
  onUpdateRoutineClick,
  onAnalyzeRoutineClick,
}: RoutinesListParams) {
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

  const handleViewButtonClick = (id: string) => {
    setModalTitle(`View details`);
    setModalContent(<ViewRoutineDetails id={id} />);
    openModal();
  };

  const handleEditButtonClick = (id: string) => {
    onUpdateRoutineClick(id);
  };

  const handleDeleteButtonClick = (id: string, title: string) => {
    setModalTitle(`Delete Routine`);
    alert("TEST")
    setModalContent(
      <DeleteRoutine routine={{ id, title }} onCloseModal={closeModal} />
    );
    openModal();
  };

  const handleAnalyzeButtonClick = (id: string) => {
    onAnalyzeRoutineClick(id);
  };

  const Row = ({ index, style }: ListChildComponentProps) => {
    const routine = routinesList[index];
    return (
      <div
        style={{
          ...style,
          height: 600,
          backgroundColor: "white",
          margin: 10,
          gap: 10,
        }}
      >
        {/* Card {index} */}
        <RoutineCard
          key={routine.id}
          routine={routine}
          viewRoutine={handleViewButtonClick}
          editRoutine={handleEditButtonClick}
          deleteRoutine={handleDeleteButtonClick}
          analyzeRoutine={handleAnalyzeButtonClick}
        />
      </div>
    );
  };

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

      <List
        height={700}
        itemCount={routinesList.length}
        itemSize={700} // Adjust the item size as needed
        width="100%"
        layout="vertical"
        direction="ltr"
        className="overflow-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-corner-rounded-full scrollbar-thumb-slate-400 scrollbar-track-slate-300 hover:scrollbar-thumb-slate-500 active:scrollbar-thumb-slate-600"
      >
        {Row}
      </List>
    </>
  );
}

export default RoutinesList;
