import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "src/context/AuthContext";

interface Props {
  element: React.ComponentType;
  [key: string]: any;
}

const Protected: React.FC<Props> = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default Protected;
