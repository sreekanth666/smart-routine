import { Outlet, useNavigate } from "react-router-dom";
import {
  ActionIcon,
  Affix,
  AppShell,
  Avatar,
  Burger,
  Grid,
  Group,
  Menu,
  Modal,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Navbar from "./Navbar";
import LogoutSection from "../LogoutSection";
import { useAuth } from "../../context/AuthContext";
import NavbarClient from "./NavbarClient";
import IconUser from "./icons/IconUser";
import IconCamera from "./icons/IconCamera";
import AddNewImage from "../AddNewImage";

function DashboardLayout() {
  const [burgerMenuOpened, { toggle: burgerMenuToggle }] = useDisclosure();
  const [modalOpened, { open: modalOpen, close: modalClose }] = useDisclosure();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const handleProfileNavigation = () => {
    if (isAdmin) {
      navigate("/app/profile");
    } else {
      navigate("/profile");
    }
  };

  const handleCameraOn = () => {
    if (!isAdmin) {
      modalOpen();
    }
  };

  const handleCameraOff = () => {
    if (!isAdmin) {
      modalClose();
    }
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !burgerMenuOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Grid justify="space-between" align="flex-start" mt={10}>
          <Grid.Col span={11}>
            <Group h="100%" px="md">
              <Burger
                opened={burgerMenuOpened}
                onClick={burgerMenuToggle}
                hiddenFrom="sm"
                size="sm"
              />
              <AppShell.Section>
                <Title>Smart Routine</Title>
              </AppShell.Section>
            </Group>
          </Grid.Col>
          <Grid.Col span={1} ta="end" pr="md">
            <ActionIcon
              variant="filled"
              color="green"
              radius="xl"
              size={30}
              onClick={handleCameraOn}
              p={5}
              me={30}
            >
              <IconCamera size="2rem" stroke={1.5} />
            </ActionIcon>
            <Menu>
              <Menu.Target>
                <ActionIcon variant="transparent">
                  <Avatar radius="xl" src={null} alt="Profile Picture" />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Profile Menu</Menu.Label>
                <Menu.Item
                  leftSection={<IconUser size="1rem" stroke={1.5} />}
                  onClick={handleProfileNavigation}
                >
                  User Profile
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Grid.Col>
        </Grid>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <AppShell.Section grow my="md">
          {isAdmin ? (
            <Navbar isAdmin={isAdmin} />
          ) : (
            <NavbarClient isAdmin={isAdmin} />
          )}
        </AppShell.Section>
        <AppShell.Section>
          <LogoutSection />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main bg="var(--mantine-color-gray-2)">
        <Outlet />
        <Modal.Root opened={modalOpened} onClose={handleCameraOff}>
          <Modal.Overlay />
          <Modal.Content>
            <Modal.Header style={{ justifyContent: "center" }}>
              <Modal.Title
                style={{
                  color: "green",
                  fontWeight: 600,
                  fontSize: "xx-large",
                  textAlign: "center",
                }}
              >
                Analyse Product
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddNewImage />
            </Modal.Body>
          </Modal.Content>
        </Modal.Root>
      </AppShell.Main>
    </AppShell>
  );
}

export default DashboardLayout;
