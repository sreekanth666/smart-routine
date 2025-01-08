import { Button, Flex, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { notifications } from "@mantine/notifications";
import IconLogout from "./UI/icons/IconLogout";

function LogoutSection() {
  const navigate = useNavigate();
  const { logout, isAdmin, userName } = useAuth();

  const logoutHandler = () => {
    logout();
    notifications.show({
      id: "logout-notification",
      title: "Log Out 👋",
      message: "You have been logged out",
      color: "red",
      icon: <IconLogout size="1rem" stroke={1.5} />,
    });
    navigate("login");
  };

  return (
    <Flex direction="column" gap="md">
      <Text>Hello, {userName}</Text>
      <Button onClick={logoutHandler} color={isAdmin ? "blue" : "green"}>
        Logout
      </Button>
    </Flex>
  );
}

export default LogoutSection;
