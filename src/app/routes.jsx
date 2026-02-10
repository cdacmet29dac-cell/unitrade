import { Routes, Route, Navigate } from "react-router-dom";

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
import AdminNotesUpload from "../pages/admin/AdminNotesUpload";
import AdminUsers from "../pages/admin/AdminUsers";

import DashboardLayout from "../components/dashboard/DashboardLayout";

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

      <Route
        path="/admin/notes-upload"
        element={
          <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
            <AdminNotesUpload />
          </ProtectedRoute>
        }
      />

      {/* -------- COMMON (STUDENT + ADMIN) -------- */}
      {/* -------- COMMON (STUDENT + ADMIN) -------- */}
      <Route
        path="/marketplace"
        element={
          <ProtectedRoute allowedRoles={["ROLE_STUDENT", "ROLE_ADMIN"]}>
            <DashboardLayout
              menuItems={[
                { label: "Dashboard", path: "/student" },
                { label: "Marketplace", path: "/marketplace" },
                { label: "Notes", path: "/notes" },
                { label: "AI Project Bot", path: "/chatbot" },
              ]}
            >
              <Marketplace />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/notes-upload"
        element={
          <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
            <AdminNotesUpload />
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
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
            <AdminUsers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/notes-upload"
        element={
          <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
            <AdminNotesUpload />
          </ProtectedRoute>
        }
      />

      {/* ---------------- FALLBACK ---------------- */}
      <Route path="*" element={<Navigate to="/marketplace" />} />
    </Routes>
  );
};

export default AppRoutes;
