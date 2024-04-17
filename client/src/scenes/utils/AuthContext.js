import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const login = async (username, password) => {
    const LOGIN_URL = `/api/login`;
    console.log('Attempting login for:', username, password);

    const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.log('Login error:', errorData);
        throw new Error(errorData.message || 'Unknown login error');
    }

    const responseData = await response.json();
    console.log('Login successful:', responseData);
    return responseData;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    const handleLogin = async (username, password) => {
        try {
            const userData = await login(username, password);
            setUser({
                userId: userData.userId,
                username: userData.username,
                isAdmin: userData.roles.isAdmin,
                isSurveyor: userData.roles.isSurveyor,
                isRespondent: userData.roles.isRespondent
            });
            setError('');
        } catch (error) {
            console.error("Login Error:", error.message);
            setError(error.message);
            setUser(null);
        }
    };

    const logout = () => {
        setUser(null);
    };

    const value = {
        user,
        error,
        login: handleLogin,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
