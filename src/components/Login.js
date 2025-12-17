import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      login(data.accessToken);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div
      style={{
        background: colors.bg,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: colors.card,
          padding: "36px",
          borderRadius: "22px",
          width: "100%",
          maxWidth: "420px",
          border: `1px solid ${colors.border}`,
        }}
      >
        <h2
          style={{ textAlign: "center", color: colors.green, marginBottom: "28px" }}
        >
          Flow Finance
        </h2>

        <form onSubmit={handleSubmit}>
          {/* USERNAME */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            required
            style={inputStyle}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={(e) => {
              e.target.style.border = `1px solid ${colors.green}`;
              e.target.style.boxShadow = "0 0 0 2px rgba(0,230,118,0.35)";
            }}
            onBlur={(e) => {
              e.target.style.border = `1px solid ${colors.border}`;
              e.target.style.boxShadow = "none";
            }}
          />

          {/* PASSWORD */}
          <div
            style={{
              display: "flex",
              marginBottom: "20px",
              border: `1px solid ${isPasswordFocused ? colors.green : colors.border}`,
              borderRadius: "14px",
              boxShadow: isPasswordFocused
                ? "0 0 0 2px rgba(0,230,118,0.35)"
                : "none",
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
                background: colors.bg,
                border: "none",
                color: colors.text,
                outline: "none",
                fontSize: "0.95rem",
                borderRadius: "14px 0 0 14px",
              }}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
            <div
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowPassword(!showPassword)}
              style={{
                width: "52px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                borderRadius: "0 14px 14px 0",
                background: colors.bg,
              }}
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
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", color: colors.muted }}>
          New user?{" "}
          <Link to="/register" style={{ color: colors.green }}>
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
