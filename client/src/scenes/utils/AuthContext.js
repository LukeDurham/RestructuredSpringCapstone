// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { login, isAdminUser } from './authentication'; // Adjust the import path

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    const handleLogin = async (username, password) => {
        try {
            const userData = await login(username, password);
            const isAdmin = await isAdminUser(userData.userId);
            setUser({
                ...userData,
                isAdmin
            });
            setError(''); // Clear any previous errors
        } catch (error) {
            console.error("Login Error:", error);
            setError(error.message);
            setUser(null);
        }
    };

    const logout = () => {
        setUser(null); // Clear user state
    };

    // Provide the logged-in user, any error information, and the login/logout functions to the rest of your app
    const value = {
        user,
        error,
        login: handleLogin,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
