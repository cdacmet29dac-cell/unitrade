import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UploadId from "../pages/UploadId";

import Marketplace from "../pages/Marketplace";
import Notes from "../pages/Notes";
import ProjectBot from "../pages/ProjectBot";

import AddProduct from "../pages/dashboards/AddProduct";
import StudentDashboard from "../pages/dashboards/StudentDashboard";
import HodDashboard from "../pages/dashboards/HodDashboard";
import AdminDashboard from "../pages/dashboards/AdminDashboard";

import ProtectedRoute from "../components/common/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ---------------- PUBLIC ---------------- */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/upload-id" element={<UploadId />} />

      {/* ---------------- STUDENT ---------------- */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={["ROLE_STUDENT"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/add"
        element={
          <ProtectedRoute allowedRoles={["ROLE_STUDENT"]}>
            <AddProduct />
          </ProtectedRoute>
        }
      />

      {/* ---------------- HOD ---------------- */}
      <Route
        path="/hod"
        element={
          <ProtectedRoute allowedRoles={["ROLE_HOD"]}>
            <HodDashboard />
          </ProtectedRoute>
        }
      />

      {/* ---------------- ADMIN ---------------- */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* -------- COMMON (STUDENT + ADMIN) -------- */}
      <Route
        path="/marketplace"
        element={
          <ProtectedRoute allowedRoles={["ROLE_STUDENT", "ROLE_ADMIN"]}>
            <Marketplace />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notes"
        element={
          <ProtectedRoute allowedRoles={["ROLE_STUDENT", "ROLE_ADMIN"]}>
            <Notes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/chatbot"
        element={
          <ProtectedRoute allowedRoles={["ROLE_STUDENT", "ROLE_ADMIN"]}>
            <ProjectBot />
          </ProtectedRoute>
        }
      />

      {/* ---------------- FALLBACK ---------------- */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
