import { Accordion } from "@mantine/core";

type SuggestionItemProps = {
  title: string;
  children: JSX.Element;
};

function SuggestionItemV2({ title, children }: SuggestionItemProps) {
  return (
    <Accordion.Item value={title} bg={"var(--mantine-color-gray-3)"}>
      <Accordion.Control>{title}</Accordion.Control>
      <Accordion.Panel>{children}</Accordion.Panel>
    </Accordion.Item>
  );
}

export default SuggestionItemV2;
