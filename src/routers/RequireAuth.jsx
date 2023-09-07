import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const isAuthenticated = useAuth();

    return isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Navigate to="/login" />
    );
  };

  return AuthenticatedComponent;
};

export default RequireAuth;
