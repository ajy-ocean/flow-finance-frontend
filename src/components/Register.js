import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ShowIcon from "../assets/icons/show.png";
import HideIcon from "../assets/icons/hide.png";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        fullName: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const primaryColor = "#00796B";

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/user/register", formData);
            const token = res.data.accessToken;
            login(token);
            navigate("/dashboard");
        } catch (err) {
            alert(
                "Registration failed: " +
                    (err.response?.data?.message || "Error")
            );
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light p-3">
            <div
                className="card shadow-lg p-5 w-100"
                style={{ maxWidth: "450px", borderRadius: "8px" }}
            >
                <div
                    style={{
                        fontSize: "3rem",
                        color: primaryColor,
                        textAlign: "center",
                        marginBottom: "15px",
                    }}
                >
                    📝
                </div>

                <h2 className="text-center mb-4 text-dark">
                    Create Flow Finance Account
                </h2>

                <form onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div className="mb-3">
                        <label className="form-label text-muted">
                            Full Name
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            name="fullName"
                            onChange={handleChange}
                            required
                            style={{ border: "2px solid black" }}
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label className="form-label text-muted">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control form-control-lg"
                            name="email"
                            onChange={handleChange}
                            required
                            style={{ border: "2px solid black" }}
                        />
                    </div>

                    {/* Username */}
                    <div className="mb-3">
                        <label className="form-label text-muted">
                            Username
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            name="username"
                            onChange={handleChange}
                            required
                            style={{ border: "2px solid black" }}
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="form-label text-muted">
                            Password
                        </label>

                        <div
                            className="input-group"
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => setPasswordFocused(false)}
                            style={{
                                borderRadius: "0.375rem",
                                boxShadow: passwordFocused
                                    ? "0 0 0 0.25rem rgba(13, 110, 253, 0.25)"
                                    : "none",
                                transition: "box-shadow 0.2s ease",
                            }}
                        >
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control form-control-lg"
                                name="password"
                                onChange={handleChange}
                                required
                                style={{
                                    border: "2px solid black",
                                    borderRight: "none",
                                    boxShadow: "none",
                                }}
                            />

                            <span
                                className="input-group-text bg-white"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                style={{
                                    border: "2px solid black",
                                    borderLeft: "none",
                                    cursor: "pointer",
                                    boxShadow: "none",
                                }}
                            >
                                <img
                                    src={
                                        showPassword
                                            ? HideIcon
                                            : ShowIcon
                                    }
                                    alt="Toggle password visibility"
                                    style={{
                                        width: "22px",
                                        height: "22px",
                                        pointerEvents: "none",
                                    }}
                                />
                            </span>
                        </div>
                    </div>

                    {/* Button */}
                    <div className="d-grid">
                        <button
                            type="submit"
                            className="btn btn-lg"
                            style={{
                                backgroundColor: primaryColor,
                                color: "white",
                            }}
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <p className="text-center mt-4 text-muted">
                    Already have an account?{" "}
                    <Link to="/" style={{ color: primaryColor }}>
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;