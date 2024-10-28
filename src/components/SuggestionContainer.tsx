import { Paper } from "@mantine/core";
import { ReactElement } from "react";

type SuggestionContainerProps = {
  children: ReactElement;
};

function SuggestionContainer({ children }: SuggestionContainerProps) {
  return (
    <Paper
      shadow="xs"
      withBorder
      p="md"
      h={430}
      mih={430}
      style={{ overflowY: "scroll" }}
      w={314}
      radius="md"
    >
      {children}
    </Paper>
  );
}

export default SuggestionContainer;
