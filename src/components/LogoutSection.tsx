import { Button, Flex, Text } from "@mantine/core";

function LogoutSection() {
  return (
    <Flex direction="column" gap="md">
      <Text>Hello USER</Text>
      <Button>Logout</Button>
    </Flex>
  );
}

export default LogoutSection;
