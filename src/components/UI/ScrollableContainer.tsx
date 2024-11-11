import { ScrollArea } from "@mantine/core";
import { ReactElement } from "react";

type ScrollableContainer = {
  children: ReactElement[] | ReactElement;
  height: string | number;
};

function ScrollableContainer({ children, height }: ScrollableContainer) {
  return <ScrollArea h={height}>{children}</ScrollArea>;
}

export default ScrollableContainer;
