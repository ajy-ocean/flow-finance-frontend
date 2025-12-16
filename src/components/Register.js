import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({ 
        email: '', 
        password: '', 
        confirmPassword: '' 
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // 🔑 NEW STATE: Password Field
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 🔑 NEW STATE: Confirm Password Field
    const navigate = useNavigate();
    const primaryColor = "#00796B";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            await axios.post('/api/user/register', {
                email: formData.email,
                password: formData.password
            });
            alert('Registration successful! Please log in.');
            navigate('/');
        } catch (err) {
            console.error("Registration failed:", err);
            setError(err.response?.data?.message || 'Registration failed. The user may already exist.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow-lg p-4" style={{ width: '400px' }}>
                <h2 className="text-center mb-4" style={{ color: primaryColor }}>Register for Flow Finance</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
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
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={togglePasswordVisibility}
                                style={{ borderLeft: 'none' }}
                                title={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? '👁️‍🗨️' : '👁️'}
                            </button>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <div className="input-group">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="form-control"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={toggleConfirmPasswordVisibility}
                                style={{ borderLeft: 'none' }}
                                title={showConfirmPassword ? "Hide confirmation password" : "Show confirmation password"}
                            >
                                {showConfirmPassword ? '👁️‍🗨️' : '👁️'}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn w-100 mt-2 text-white" style={{ backgroundColor: primaryColor }}>
                        Register
                    </button>
                </form>
                <p className="text-center mt-3">
                    Already have an account? <Link to="/" style={{ color: primaryColor }}>Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;