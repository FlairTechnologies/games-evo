import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "./loader";

/** Route guard: sends anonymous players to login and back here afterwards. */
const RequireAuth = ({ children }) => {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "loading") return <Loader />;
  if (status === "anonymous") {
    return <Navigate to="/authentication" replace state={{ from: location.pathname }} />;
  }
  return children;
};

export default RequireAuth;
