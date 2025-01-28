import React from "react";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminPrivateRoute = ({ children }) => {
    const { user } = useAuth();

    // Ensure user is logged in and is an admin
    return user && user.isAdmin ? children : <Navigate to="/admin-login" />;
};

export default AdminPrivateRoute;

