import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { isLogin } = useAuthContext();

  if (isLogin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
