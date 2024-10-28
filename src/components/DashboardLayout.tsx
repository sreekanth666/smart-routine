import { Outlet } from "react-router-dom";
import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";
import Navbar from "../components/Navbar";
import LogoutSection from "./LogoutSection";
import { useAuth } from "../context/AuthContext";
import NavbarClient from "./NavbarClient";

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
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <MantineLogo size={30} />
        </Group>
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
