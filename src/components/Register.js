import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ShowIcon from '../assets/icons/show.png'; 
import HideIcon from '../assets/icons/hide.png'; 

const Register = () => {
    const [formData, setFormData] = useState({ 
        email: '', 
        password: '', 
        confirmPassword: '' 
    });
    const [error, setError] = useState('');
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [showPassword, setShowPassword] = useState(false); 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
    const navigate = useNavigate();
    const primaryColor = "#00796B";
    const inputBorderStyle = { border: '1px solid #000' };

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 8) {
            errors.push("Must be at least 8 characters long.");
        }
        if (!/(?=.*[a-z])/.test(password)) {
            errors.push("Must contain at least one lowercase letter.");
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            errors.push("Must contain at least one uppercase letter.");
        }
        if (!/(?=.*\d)/.test(password)) {
            errors.push("Must contain at least one number.");
        }
        if (!/(?=.*[!@#$%^&*])/.test(password)) {
            errors.push("Must contain at least one special character (!@#$%^&*).");
        }
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError('');

        if (name === 'password') {
            const errors = validatePassword(value);
            setPasswordErrors(errors);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const errors = validatePassword(formData.password);
        if (errors.length > 0) {
            setPasswordErrors(errors);
            setError('Please correct the password requirements.');
            return;
        }
        
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
        <div className="container d-flex justify-content-center align-items-center min-vh-100 p-3 p-md-5">
            <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '400px' }}>
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
                            style={inputBorderStyle}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`form-control ${formData.password && passwordErrors.length > 0 ? 'is-invalid' : ''}`}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                style={{ ...inputBorderStyle, borderRight: showPassword ? inputBorderStyle.border : 'none' }}
                            />
                            <button
                                type="button"
                                className="btn btn-light d-flex align-items-center justify-content-center"
                                onClick={togglePasswordVisibility}
                                style={{ 
                                    border: inputBorderStyle.border, 
                                    borderLeft: 'none',
                                    backgroundColor: '#fff', 
                                    width: '40px', 
                                    height: '38px', 
                                    padding: '0' 
                                }}
                                title={showPassword ? "Hide password" : "Show password"}
                            >
                                <img 
                                    src={showPassword ? HideIcon : ShowIcon} 
                                    alt={showPassword ? "Hide" : "Show"} 
                                    style={{ width: '20px', height: '20px', border: 'none' }} 
                                />
                            </button>
                        </div>
                        
                        {formData.password && (
                            <div className="mt-2">
                                <small className="text-muted">Password must meet the following criteria:</small>
                                <ul className="list-unstyled">
                                    {validatePassword('').map((defaultRule, index) => {
                                        const isMet = !passwordErrors.includes(defaultRule);
                                        return (
                                            <li 
                                                key={index} 
                                                style={{ color: isMet ? 'green' : 'red', fontSize: '0.85rem' }}
                                            >
                                                {isMet ? '✅' : '❌'} {defaultRule}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <div className="input-group">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className={`form-control ${formData.confirmPassword && formData.password !== formData.confirmPassword ? 'is-invalid' : ''}`}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                style={{ ...inputBorderStyle, borderRight: showConfirmPassword ? inputBorderStyle.border : 'none' }}
                            />
                            <button
                                type="button"
                                className="btn btn-light d-flex align-items-center justify-content-center"
                                onClick={toggleConfirmPasswordVisibility}
                                style={{ 
                                    border: inputBorderStyle.border, 
                                    borderLeft: 'none',
                                    backgroundColor: '#fff', 
                                    width: '40px', 
                                    height: '38px', 
                                    padding: '0' 
                                }}
                                title={showConfirmPassword ? "Hide confirmation password" : "Show confirmation password"}
                            >
                                <img 
                                    src={showConfirmPassword ? HideIcon : ShowIcon} 
                                    alt={showConfirmPassword ? "Hide" : "Show"} 
                                    style={{ width: '20px', height: '20px', border: 'none' }} 
                                />
                            </button>
                        </div>
                        {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                            <div className="invalid-feedback d-block">Passwords do not match.</div>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        className="btn w-100 mt-2 text-white" 
                        style={{ backgroundColor: primaryColor }}
                        disabled={passwordErrors.length > 0 || formData.password !== formData.confirmPassword}
                    >
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