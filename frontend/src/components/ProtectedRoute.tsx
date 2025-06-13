import React, { type ReactElement } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactElement;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const token = localStorage.getItem("token");

    // Si no hay token, redirigir al login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Si hay token, renderizar el componente hijo
    return children;
};

export default ProtectedRoute;
