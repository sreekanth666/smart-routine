import { Outlet } from "react-router-dom";
import {
  ActionIcon,
  AppShell,
  Avatar,
  Burger,
  Grid,
  Group,
  Menu,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";
import Navbar from "./Navbar";
import LogoutSection from "../LogoutSection";
import { useAuth } from "../../context/AuthContext";
import NavbarClient from "./NavbarClient";
import IconUser from "../icons/IconUser";

function DashboardLayout() {
  const [opened, { toggle }] = useDisclosure();
  const { isAdmin } = useAuth();

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
              <MantineLogo size={30} />
            </Group>
          </Grid.Col>
          <Grid.Col span={1}>
            <Menu>
              <Menu.Target>
                <ActionIcon variant="transparent">
                  <Avatar radius="xl" src={null} alt="Profile Picture" />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Profile Menu</Menu.Label>
                <Menu.Item leftSection={<IconUser size="1rem" stroke={1.5} />}>
                  User Profile
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Grid.Col>
        </Grid>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <AppShell.Section>Smart Routine</AppShell.Section>
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
      <AppShell.Main bg="var(--mantine-color-gray-3)">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default DashboardLayout;
