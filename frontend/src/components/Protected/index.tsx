import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "src/context/AuthContext";

interface Props {
  component: React.ComponentType;
}

const Protected: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div></div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Component {...rest} />;
};

export default Protected;
