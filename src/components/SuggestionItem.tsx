import { Accordion } from "@mantine/core";
import { SuggestionType } from "../types/SuggestionType";

type SuggestionItemProps = {
  item: SuggestionType;
};

function SuggestionItem({ item }: SuggestionItemProps) {
  return (
    <Accordion.Item value={item.title} bg={"var(--mantine-color-gray-4)"}>
      <Accordion.Control>{item.title}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  );
}

export default SuggestionItem;
