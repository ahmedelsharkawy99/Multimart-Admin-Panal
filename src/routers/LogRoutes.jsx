import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const LogRoutes = () => {
  const currentUser = useAuth();
  return currentUser ? <Navigate to="/" /> : <Outlet />;
};

export default LogRoutes;
