import React, { createContext, useContext, useState, useEffect, useRef } from 'react';


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
    const [user, setUser] = useState(() => {
        // Get initial user state from localStorage if available
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const userRef = useRef(user); // Create a ref to hold the current user
    const [error, setError] = useState('');

    useEffect(() => {
        userRef.current = user; // Update ref on user state change
        console.log("User state updated to:", user);
    }, [user]);

    const handleLogin = async (username, password) => {
        try {
            const userData = await login(username, password);
            localStorage.setItem('user', JSON.stringify({
                userId: userData.userId,
                roleId: userData.roleId
            }));
            setUser({
                userId: userData.userId,
                roleId: userData.roleId
            });
            setError('');
        } catch (error) {
            console.error("Login Error:", error.message);
            setError(error.message);
            setUser(null);
        }
    };

    const logout = () => {
        console.log("Executing logout function");
        localStorage.removeItem('user');
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
