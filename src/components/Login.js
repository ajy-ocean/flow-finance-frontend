import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ShowIcon from '../assets/icons/show.png'; 
import HideIcon from '../assets/icons/hide.png'; 

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const primaryColor = "#00796B";

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('/api/user/login', credentials);
            login(response.data.token, response.data.email); 
            navigate('/dashboard'); 
        } catch (err) {
            console.error("Login failed:", err);
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow-lg p-4" style={{ width: '400px' }}>
                <h2 className="text-center mb-4" style={{ color: primaryColor }}>Login to Flow Finance</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"} 
                                className="form-control"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                                onClick={togglePasswordVisibility}
                                style={{ borderLeft: 'none', width: '40px', padding: '0' }}
                                title={showPassword ? "Hide password" : "Show password"}
                            >
                                <img 
                                    src={showPassword ? HideIcon : ShowIcon} 
                                    alt={showPassword ? "Hide" : "Show"} 
                                    style={{ width: '20px', height: '20px' }}
                                />
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn w-100 mt-2 text-white" style={{ backgroundColor: primaryColor }}>
                        Login
                    </button>
                </form>
                <p className="text-center mt-3">
                    Don't have an account? <Link to="/register" style={{ color: primaryColor }}>Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;