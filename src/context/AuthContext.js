import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const TOKEN_KEY = 'flowFinanceJwt'; 

axios.defaults.baseURL = API_URL;
delete axios.defaults.withCredentials; 


const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem(TOKEN_KEY, token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        localStorage.removeItem(TOKEN_KEY);
        delete axios.defaults.headers.common['Authorization'];
    }
};

const getAuthToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};


export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const primaryColor = '#00796B'; 

    useEffect(() => {
        const token = getAuthToken();
        if (token) {
            setAuthToken(token);
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
        setLoading(false);
    }, []);

    const login = (token) => {
        setAuthToken(token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setAuthToken(null);
        setIsLoggedIn(false);
        window.location.href = '/'; 
    };

    useMemo(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401 && error.config && 
                    !error.config.url.includes('/api/user/login') && 
                    !error.config.url.includes('/api/user/register')) {
                    
                    console.error('Unauthorized response (401). Forcing logout.');
                    logout(); 
                    return Promise.reject(error);
                }
                return Promise.reject(error);
            }
        );
        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, []);


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