import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const primaryColor = '#00796B'; 

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            await axios.get('/api/user/current'); 
            setIsLoggedIn(true);
        } catch (err) {
            setIsLoggedIn(false);
        }
        setLoading(false);
    };

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = async () => {
        try {
            await axios.post('/api/user/logout');
        } catch (err) {
            console.error(err);
        }
        setIsLoggedIn(false);
        window.location.href = '/';
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="spinner-border" style={{ color: primaryColor }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    ); 

    const ProtectedRoute = ({ children }) => {
        return isLoggedIn ? children : <Navigate to="/" />;
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, ProtectedRoute }}>
            {children}
        </AuthContext.Provider>
    );
};