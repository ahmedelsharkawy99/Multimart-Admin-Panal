import useAuth from "../shared/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const LogRoutes = () => {
  const currentUser = useAuth();
  return currentUser ? <Navigate to="/" replace /> : <Outlet />;
};

export default LogRoutes;
