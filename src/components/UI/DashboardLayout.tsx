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
import IconUser from "../icons/IconUser";
import IconCamera from "../icons/IconCamera";
import AddNewImage from "../AddNewImage";

function DashboardLayout() {
  const [opened, { toggle, open, close }] = useDisclosure();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const handleProfileNavigation = () => {
    navigate("/profile");
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Grid justify="space-between" align="flex-start" mt={10}>
          <Grid.Col span={11}>
            <Group h="100%" px="md">
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
              <AppShell.Section>
                <Title>Smart Routine</Title>
              </AppShell.Section>
            </Group>
          </Grid.Col>
          <Grid.Col span={1} ta="end" pr="md">
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
      <AppShell.Main bg="var(--mantine-color-gray-1)">
        <Outlet />
        <Modal.Root opened={opened} onClose={close}>
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
                Add Photo
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddNewImage />
            </Modal.Body>
          </Modal.Content>
        </Modal.Root>
        {!isAdmin && (
          <Affix position={{ bottom: 40, right: 40 }}>
            <ActionIcon
              variant="filled"
              color="green"
              radius="xl"
              size={60}
              onClick={open}
            >
              <IconCamera size="2rem" stroke={1.5} />
            </ActionIcon>
          </Affix>
        )}
      </AppShell.Main>
    </AppShell>
  );
}

export default DashboardLayout;
