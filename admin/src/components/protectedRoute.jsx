import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ inverse }) => {
  const { pathname } = useLocation();
  const user = useSelector((state) => state.user.currentUser);
  const admin = user && user.isAdmin;

  if (inverse) {
    return admin ? <Navigate to="/" /> : <Outlet />;
  }

  if (!admin) {
    return <Navigate to="/login" state={pathname} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
