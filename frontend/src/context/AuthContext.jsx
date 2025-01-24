import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/api';
import { use } from 'react';

// Create context
const AuthContext = createContext();

// Hook for easy access to AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check if user logged in
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('/students/profile'); // Calls the protected /profile endpoint
                setUser(response.data.user);
            } catch (error) {
                setUser(null);
            }
        };

        checkAuth();
    }, []);

    const logout = async () => {
        await axios.post('/students/logout');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};