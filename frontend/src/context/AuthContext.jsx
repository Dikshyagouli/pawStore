import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const API_URL = 'http://localhost:5000/api/auth'; 

export const AuthProvider = ({ children }) => {
    const initialUser = JSON.parse(localStorage.getItem('userInfo')) || null;
    
    const [user, setUser] = useState(initialUser); 
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
            if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                return { success: false, message: 'Network error. Please check if the backend server is running on http://localhost:5000' };
            }
            return { success: false, message: `Network error: ${error.message}` };
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
                return { success: false, message: data.message || 'Registration failed.' };
            }
        } catch (error) {
            console.error("Signup failed:", error);
            if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                return { success: false, message: 'Network error. Please check if the backend server is running on http://localhost:5000' };
            }
            return { success: false, message: `Network error: ${error.message}` };
        }
    };

    const signupAdmin = async (name, email, password, adminKey) => {
        const config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, adminKey }),
        };

        try {
            const response = await fetch(`${API_URL}/register-admin`, config);
            const data = await response.json();

            if (response.ok) {
                setUser(data);
                localStorage.setItem('userInfo', JSON.stringify(data));
                return { success: true };
            } else {
                return { success: false, message: data.message || 'Admin registration failed.' };
            }
        } catch (error) {
            console.error("Admin signup failed:", error);
            if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                return { success: false, message: 'Network error. Please check if the backend server is running on http://localhost:5000' };
            }
            return { success: false, message: `Network error: ${error.message}` };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
        console.log("User logged out.");
    };

    const value = {
        isLoggedIn,
        user,
        login,
        logout,
        signup,
        signupAdmin,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};