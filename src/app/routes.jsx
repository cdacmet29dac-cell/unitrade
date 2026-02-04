import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Marketplace from "../pages/Marketplace";
import Notes from "../pages/Notes";
import HodDashboard from "../pages/HodDashboard";
import ProjectBot from "../pages/ProjectBot";
import Landing from "../pages/Landing";
import ProtectedRoute from "../components/common/ProtectedRoute";
import StudentDashboard from "../pages/dashboards/StudentDashboard";
import HodDashboardPage from "../pages/dashboards/HodDashboard";
import AdminDashboard from "../pages/dashboards/AdminDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/hod-dashboard"
        element={
          <ProtectedRoute allowedRoles={["HOD"]}>
            <HodDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
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
