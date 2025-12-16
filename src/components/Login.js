import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ShowIcon from "../assets/icons/show.png";
import HideIcon from "../assets/icons/hide.png";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const colors = {
        primary: "#00796B",
        bg: "#F4F7F8",
        card: "#FFFFFFF0",
        shadow: "0 10px 25px rgba(0,0,0,0.08)",
        focus: "0 0 0 0.25rem rgba(13,110,253,0.25)"
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/user/login", { username, password });
            login(res.data.accessToken);
            navigate("/dashboard");
        } catch (err) {
            alert("Login failed: " + (err.response?.data?.message || "Invalid Credentials"));
        }
    };

    const inputWrapperStyle = (focused) => ({
        borderRadius: "12px",
        boxShadow: focused ? colors.focus : "none",
        transition: "0.2s ease",
        marginBottom: "15px",
    });

    const inputStyle = {
        border: "2px solid #111",
        borderRadius: "12px",
        padding: "12px",
        width: "100%",
        boxSizing: "border-box",
    };

    const buttonStyle = {
        borderRadius: "999px",
        padding: "12px",
        border: "none",
        boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
        backgroundColor: colors.primary,
        color: "white",
        fontSize: "16px",
    };

    return (
        <div style={{ background: colors.bg, minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
            <div style={{ maxWidth: "450px", width: "100%", background: colors.card, boxShadow: colors.shadow, borderRadius: "18px", padding: "40px" }}>
                <div style={{ fontSize: "3rem", color: colors.primary, textAlign: "center", marginBottom: "20px" }}>📈</div>
                <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#111" }}>Flow Finance Login</h2>

                <form onSubmit={handleSubmit}>
                    <div style={inputWrapperStyle(false)}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div style={inputWrapperStyle(passwordFocused)}>
                        <div style={{ display: "flex", borderRadius: "12px", overflow: "hidden", border: "2px solid #111" }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                                required
                                style={{ flex: 1, border: "none", padding: "12px", outline: "none" }}
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ cursor: "pointer", background: "#E5E7EB", padding: "0 12px", display: "flex", alignItems: "center" }}
                            >
                                <img src={showPassword ? HideIcon : ShowIcon} alt="toggle" style={{ width: "22px", height: "22px", pointerEvents: "none" }} />
                            </span>
                        </div>
                    </div>

                    <div style={{ display: "grid", marginTop: "20px" }}>
                        <button type="submit" style={buttonStyle}>Sign In</button>
                    </div>
                </form>

                <p style={{ textAlign: "center", marginTop: "20px", color: "#6B7280" }}>
                    New user? <Link to="/register" style={{ color: colors.primary }}>Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
