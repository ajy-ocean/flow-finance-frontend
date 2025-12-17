import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import showIcon from "../assets/show.png";
import hideIcon from "../assets/hide.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const colors = {
    bg: "#0F1115",
    card: "#161A20",
    green: "#00E676",
    text: "#EDEDED",
    border: "#2A2F3A",
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/user/login", {
        username,
        password,
      });
      login(res.data.accessToken);
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
        padding: "20px",
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
          style={{
            textAlign: "center",
            color: colors.green,
            marginBottom: "28px",
          }}
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
            style={{ ...inputStyle, marginBottom: "16px" }}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={(e) =>
              (e.target.style.boxShadow =
                "0 0 0 2px rgba(0,230,118,0.5)")
            }
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          />

          {/* PASSWORD */}
          <div style={{ display: "flex", marginBottom: "20px" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              required
              style={{
                ...inputStyle,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={(e) =>
                (e.target.style.boxShadow =
                  "0 0 0 2px rgba(0,230,118,0.5)")
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />

            {/* EYE ICON */}
            <div
              onClick={() => setShowPassword(!showPassword)}
              style={{
                width: "52px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: `1px solid ${colors.border}`,
                borderLeft: "none",
                borderTopRightRadius: "14px",
                borderBottomRightRadius: "14px",
                background: colors.bg,
                cursor: "pointer",
              }}
            >
              <img
                src={showPassword ? hideIcon : showIcon}
                alt="toggle password"
                width="20"
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
              fontSize: "1rem",
            }}
          >
            Sign In
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#aaa",
          }}
        >
          New here?{" "}
          <Link
            to="/register"
            style={{ color: colors.green, textDecoration: "none" }}
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
