import { Card, Title } from "@mantine/core";
import AiChatContainer from "./ai-based-components/AiChatContainer";

function RoutineChat() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder h="100dvh">
      <Card.Section p="xs">
        <Title ta="center">Routine Chat</Title>
      </Card.Section>
      <Card.Section p="xs">
        <AiChatContainer />
      </Card.Section>
    </Card>
  );
}

export default RoutineChat;
