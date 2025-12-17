import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; 
import { useAuth } from "../context/AuthContext";
import showIcon from "../assets/icons/show.png";
import hideIcon from "../assets/icons/hide.png";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });
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
    border: `1px solid ${colors.border}`,
    borderRadius: "14px",
    color: colors.text,
    outline: "none",
    fontSize: "0.95rem",
    marginBottom: "16px",
    background: colors.bg,
    transition: "0.2s",
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Switched to axios
      const res = await axios.post("/api/user/register", formData);
      
      const token = res.data.accessToken || res.data.token;
      if (token) {
        login(token);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Registration Error:", err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ background: colors.bg, minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
      <div style={{ background: colors.card, padding: "36px", borderRadius: "22px", width: "100%", maxWidth: "420px", border: `1px solid ${colors.border}` }}>
        <h2 style={{ textAlign: "center", color: colors.green, marginBottom: "28px", fontWeight: "700" }}>
          Create Account
        </h2>

        <form onSubmit={handleSubmit}>
          {["fullName", "email", "username"].map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              name={field}
              placeholder={field === "fullName" ? "Full Name" : field.charAt(0).toUpperCase() + field.slice(1)}
              required
              style={inputStyle}
              onChange={handleChange}
              onFocus={(e) => {
                e.target.style.border = `1px solid ${colors.green}`;
                e.target.style.boxShadow = "0 0 0 2px rgba(0,230,118,0.2)";
              }}
              onBlur={(e) => {
                e.target.style.border = `1px solid ${colors.border}`;
                e.target.style.boxShadow = "none";
              }}
            />
          ))}

          <div style={{
              display: "flex",
              alignItems: "center",
              border: `1px solid ${isPasswordFocused ? colors.green : colors.border}`,
              borderRadius: "14px",
              marginBottom: "16px",
              boxShadow: isPasswordFocused ? "0 0 0 2px rgba(0,230,118,0.2)" : "none",
              transition: "0.2s",
              background: colors.bg,
            }}
          >
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
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
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              onChange={handleChange}
            />
            <div
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowPassword(!showPassword)}
              style={{ width: "48px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}
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
            Sign Up
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", color: colors.muted }}>
          Already have an account? <Link to="/" style={{ color: colors.green, textDecoration: "none" }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;