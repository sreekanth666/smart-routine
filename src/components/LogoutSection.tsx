import { Button, Flex, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LogoutSection() {
  const navigate = useNavigate();
  const { logout, isAdmin } = useAuth();

  const logoutHandler = () => {
    logout();
    navigate("login");
  };

  return (
    <Flex direction="column" gap="md">
      <Text>Hello USER</Text>
      <Button onClick={logoutHandler} color={isAdmin ? "blue" : "green"}>
        Logout
      </Button>
    </Flex>
  );
}

export default LogoutSection;
