import { Navigate } from "react-router-dom";

import useAuth from "../shared/hooks/useAuth";

const RequireAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const isAuthenticated = useAuth();

    return isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Navigate to="/login" replace />
    );
  };

  return AuthenticatedComponent;
};

export default RequireAuth;
