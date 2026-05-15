import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  const isAuthenticated =
    userData?.token && new Date(userData?.expiration) > new Date();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
