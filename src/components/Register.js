import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import showIcon from "../assets/icons/show.png";
import hideIcon from "../assets/icons/hide.png";

// Define styles outside the component to keep code clean
const styles = {
  container: {
    background: "linear-gradient(135deg, #00D2FF 0%, #3a7bd5 100%)",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: "'Inter', sans-serif"
  },
  card: {
    background: "rgba(255, 255, 255, 0.95)",
    padding: "40px",
    borderRadius: "30px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
    backdropFilter: "blur(10px)",
    textAlign: "center"
  },
  title: { fontSize: "2rem", fontWeight: "800", marginBottom: "10px" },
  input: {
    width: "100%",
    padding: "16px",
    marginBottom: "15px",
    borderRadius: "15px",
    border: "2px solid #E5E7EB",
    outline: "none",
    fontSize: "1rem",
    boxSizing: "border-box",
    transition: "0.3s"
  },
  passwordWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  passwordInput: {
    width: "100%",
    padding: "16px",
    paddingRight: "50px",
    borderRadius: "15px",
    border: "2px solid #E5E7EB",
    outline: "none",
    fontSize: "1rem",
    boxSizing: "border-box"
  },
  toggleBtn: {
    position: "absolute",
    right: "15px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0",
    display: "flex",
    alignItems: "center"
  },
  icon: { width: "22px", height: "22px", opacity: "0.5" },
  mainBtn: {
    width: "100%",
    padding: "16px",
    borderRadius: "999px",
    color: "#fff",
    border: "none",
    fontWeight: "700",
    fontSize: "1.1rem",
    cursor: "pointer",
    transition: "0.3s ease",
  },
  footerText: { marginTop: "20px", color: "#6B7280" },
  link: { fontWeight: "700", textDecoration: "none" }
};

const Register = () => {
  const [formData, setFormData] = useState({ fullName: "", email: "", username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/user/register", formData);
      login(res.data.accessToken || res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Registration failed! ❌");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{...styles.title, color: "#3a7bd5"}}>Create Account ✨</h2>
        <form onSubmit={handleSubmit}>
          <input name="fullName" placeholder="Full Name" required style={styles.input} onChange={handleChange} />
          <input name="email" type="email" placeholder="Email Address" required style={styles.input} onChange={handleChange} />
          <input name="username" placeholder="Username" required style={styles.input} onChange={handleChange} />
          
          <div style={styles.passwordWrapper}>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              style={styles.passwordInput}
              onChange={handleChange}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.toggleBtn}>
              <img src={showPassword ? hideIcon : showIcon} alt="toggle" style={styles.icon} />
            </button>
          </div>

          <button 
            type="submit" 
            style={{...styles.mainBtn, background: "#3a7bd5", boxShadow: "0 10px 20px rgba(58, 123, 213, 0.4)"}}
            onMouseOver={(e) => e.target.style.transform = "scale(1.02)"}
            onMouseOut={(e) => e.target.style.transform = "scale(1)"}
          >
            Sign Up Now! ⚡
          </button>
        </form>
        <p style={styles.footerText}>
          Have an account? <Link to="/" style={{...styles.link, color: "#3a7bd5"}}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;