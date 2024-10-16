import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import DashboardLayout from "./components/DashboardLayout";

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Navigate replace to="app" />} />
        <Route path="app/*" element={<Dashboard />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
}

export default App;
