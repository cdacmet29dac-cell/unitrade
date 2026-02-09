import { Navigate } from "react-router-dom";
import { getToken, getRole } from "../../utils/storage";

/**
 * ProtectedRoute
 * - Checks if user is logged in (JWT present)
 * - Checks if user role is allowed
 *
 * array of allowed roles (e.g. ["STUDENT", "HOD"])
 */
const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const token = getToken();
  const role = getRole(); // e.g. STUDENT, HOD, ADMIN

  // 1️⃣ If user is not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2️⃣ If route has role restriction
  if (allowedRoles.length > 0 && (!role || !allowedRoles.includes(role))) {
    return <Navigate to="/login" replace />; // or /unauthorized
  }

  // 3️⃣ Access allowed
  return children;
};

export default ProtectedRoute;
