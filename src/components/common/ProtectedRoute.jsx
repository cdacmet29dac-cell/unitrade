import { Navigate } from "react-router-dom";
import { getRole, getToken } from "../../utils/storage";

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const token = getToken();
  const role = getRole();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
