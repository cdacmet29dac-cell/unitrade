import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Marketplace from "../pages/Marketplace";
import Notes from "../pages/Notes";
import HodDashboard from "../pages/HodDashboard";
import ProjectBot from "../pages/ProjectBot";
import ProtectedRoute from "../components/common/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/marketplace"
        element={
          <ProtectedRoute allowedRoles={["student", "admin"]}>
            <Marketplace />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notes"
        element={
          <ProtectedRoute allowedRoles={["student", "admin"]}>
            <Notes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chatbot"
        element={
          <ProtectedRoute allowedRoles={["student", "admin"]}>
            <ProjectBot />
          </ProtectedRoute>
        }
      />
      <Route
        path="/hod"
        element={
          <ProtectedRoute allowedRoles={["hod", "admin"]}>
            <HodDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
