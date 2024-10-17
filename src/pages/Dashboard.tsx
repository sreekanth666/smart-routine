import { Routes, Route } from "react-router-dom";
import { Text } from "@mantine/core";
import Users from "./Users";
import Analytics from "./Analytics";

function DashBoardBody() {
  return <Text>Dashboard</Text>;
}

function Dashboard() {
  return (
    <Routes>
      <Route path="/" element={<DashBoardBody />} />
      <Route path="/users" element={<Users />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
}

export default Dashboard;
