import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { UserAuth } from "../context/AuthContext";

function PublicComponent({ children }) {
    let { user } = UserAuth();

    if (user) {
        return <Navigate to="/dashboard" />;
    }

    return children;
}

export default PublicComponent;