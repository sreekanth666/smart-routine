import { Routes, Route, useLocation } from "react-router-dom";
import { Text } from "@mantine/core";
import Users from "./Users";
import Analytics from "./Analytics";
import { isCurrentPage } from "../utils/helpers";

function Dashboard() {
  const location = useLocation();
  const isDashboard = isCurrentPage(location.pathname, "/app");
  return (
    <>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
      {isDashboard && <Text>Dashboard</Text>}
    </>
  );
}

export default Dashboard;
