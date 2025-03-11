import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import Loader from "../Component/Loader";

const ProtectedRoute = () => {
  const { userData, userLoading } = useUser();

  if (userLoading) return <Loader />;

  return userData ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
