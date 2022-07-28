import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ inverse }) => {
  const { pathname } = useLocation();
  const user = useSelector((state) => state.user.currentUser);

  if (inverse) {
    return user ? <Navigate to="/" /> : <Outlet />;
  }

  if (!user) {
    return <Navigate to="/login" state={pathname} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
