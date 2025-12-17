import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; 
import { useAuth } from "../context/AuthContext";
import showIcon from "../assets/icons/show.png";
import hideIcon from "../assets/icons/hide.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const colors = {
    bg: "#0F1115",
    card: "#161A20",
    green: "#00E676",
    text: "#EDEDED",
    border: "#2A2F3A",
    muted: "#9AA0A6",
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    background: colors.bg,
    border: `1px solid ${colors.border}`,
    borderRadius: "14px",
    color: colors.text,
    outline: "none",
    fontSize: "0.95rem",
    marginBottom: "16px",
    transition: "0.2s",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Changed from fetch to axios to sync with AuthContext headers
      const res = await axios.post("/api/user/login", { username, password });
      
      // Handle both 'accessToken' or 'token' depending on your backend response
      const token = res.data.accessToken || res.data.token; 
      
      if (token) {
        login(token);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div style={{ background: colors.bg, minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
      <div style={{ background: colors.card, padding: "36px", borderRadius: "22px", width: "100%", maxWidth: "420px", border: `1px solid ${colors.border}` }}>
        <h2 style={{ textAlign: "center", color: colors.green, marginBottom: "28px", fontWeight: "700" }}>
          Flow Finance
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            required
            style={inputStyle}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={(e) => {
              e.target.style.border = `1px solid ${colors.green}`;
              e.target.style.boxShadow = "0 0 0 2px rgba(0,230,118,0.2)";
            }}
            onBlur={(e) => {
              e.target.style.border = `1px solid ${colors.border}`;
              e.target.style.boxShadow = "none";
            }}
          />

          <div style={{
              display: "flex",
              marginBottom: "20px",
              border: `1px solid ${isPasswordFocused ? colors.green : colors.border}`,
              borderRadius: "14px",
              boxShadow: isPasswordFocused ? "0 0 0 2px rgba(0,230,118,0.2)" : "none",
              transition: "0.2s",
              background: colors.bg,
            }}
          >
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              required
              style={{
                flex: 1,
                padding: "14px",
                background: "transparent",
                border: "none",
                color: colors.text,
                outline: "none",
                fontSize: "0.95rem",
              }}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
            <div
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowPassword(!showPassword)}
              style={{ width: "52px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}
            >
              <img
                src={showPassword ? hideIcon : showIcon}
                alt="toggle"
                width="20"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "999px",
              background: colors.green,
              border: "none",
              color: "#000",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", color: colors.muted }}>
          New user? <Link to="/register" style={{ color: colors.green, textDecoration: "none" }}>Create account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;