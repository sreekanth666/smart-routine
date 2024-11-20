import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import DashboardLayout from "./components/UI/DashboardLayout";
import NotFoundPage from "./pages/NotFoundPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import NormalClient from "./pages/NormalClient";
import Routines from "./pages/Routines";
import Activity from "./pages/Activity";
import Diet from "./pages/Diet";
import Community from "./pages/Community";
import AddRoutine from "./pages/AddRoutine";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<NormalClient />} />
          <Route path="routines" element={<Routines />} />
          <Route path="activity" element={<Activity />} />
          <Route path="diet" element={<Diet />} />
          <Route path="community" element={<Community />} />
          <Route path="routine/:action/:id" element={<AddRoutine />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="app/*" element={<Dashboard />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
