import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext);
};

const API_URL = `http://localhost:5000/api/auth`;

export const AuthProvider = ({ children }) => {
    const initialUser = JSON.parse(localStorage.getItem('userInfo')) || null;
    const [user, setUser] = useState(initialUser); 

    const isLoggedIn = !!user;

    const login = async (email, password) => {
        const config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        };

        try {
            const response = await fetch(`${API_URL}/login`, config);
            const data = await response.json();

            if (response.ok) {
                setUser(data);
                localStorage.setItem('userInfo', JSON.stringify(data));
                return { success: true };
            } else {
                return { success: false, message: data.message || 'Login failed.' };
            }
        } catch (error) {
            console.error("Login failed:", error);
            return { success: false, message: 'Network error. Is the server running?' };
        }
    };

    const signup = async (name, email, password) => {
        const config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        };

        try {
            const response = await fetch(`${API_URL}/register`, config);
            const data = await response.json();

            if (response.ok) {
                setUser(data);
                localStorage.setItem('userInfo', JSON.stringify(data));
                return { success: true };
            } else {
                return { success: false, message: data.message || 'Signup failed.' };
            }
        } catch (error) {
            return { success: false, message: 'Network error.' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
    };

    const value = {
        isLoggedIn,
        user,
        login,
        logout,
        signup,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};