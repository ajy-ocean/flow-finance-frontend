import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth(); 
    const navigate = useNavigate();
    const primaryColor = "#00796B";

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/user/login", { username, password });
            const token = res.data.accessToken; 
            login(token); 
            navigate("/dashboard");
        } catch (err) {
            alert("Login failed: " + (err.response?.data?.message || "Invalid Credentials"));
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
                    📈
                </div>
                <h2 className="text-center mb-4 text-dark">Flow Finance Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label text-muted">Username</label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label text-muted">Password</label>
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="d-grid">
                        <button
                            type="submit"
                            className="btn btn-lg"
                            style={{ backgroundColor: primaryColor, color: "white" }}
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <p className="text-center mt-4 text-muted">
                    New user?{" "}
                    <Link to="/register" style={{ color: primaryColor }}>
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;