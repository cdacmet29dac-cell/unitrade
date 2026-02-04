import { Navigate } from "react-router-dom";
import { getRole, getToken } from "../../utils/storage";

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const token = getToken();
  const role = getRole();
  const normalizedRole = role ? role.toLowerCase() : "";
  const normalizedAllowedRoles = allowedRoles.map((allowedRole) =>
    allowedRole.toLowerCase()
  );

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (normalizedAllowedRoles.length > 0 && !normalizedAllowedRoles.includes(normalizedRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
