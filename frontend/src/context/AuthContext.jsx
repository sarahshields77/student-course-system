import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/api';

// Create context
const AuthContext = createContext();

// Hook for easy access to AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check if user (student or admin) is logged in
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Check if the user is a student
                const studentResponse = await axios.get("/students/profile");
                setUser({ ...studentResponse.data.user, isAdmin: false });
            } catch (studentError) {
                try {
                    // If student check fails, check if the user is an admin
                    const adminResponse = await axios.get("/admins/profile");
                    setUser({ ...adminResponse.data.admin, isAdmin: true }); // Add isAdmin flag
                } catch (adminError) {
                    setUser(null); // If both checks fail, reset user
                }
            } finally {
                setIsLoading(false); // Auth check is complete
            }
        };
    
        checkAuth();
    }, []);
    

    const logout = async () => {
        try {
            if (user?.isAdmin) {
                await axios.post('/admins/logout');
            } else {
                await axios.post('/students/logout');
            }
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // provide auth context to children components
    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};