import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import showIcon from "../assets/icons/show.png";
import hideIcon from "../assets/icons/hide.png";

const styles = {
  container: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  },
  card: {
    background: "rgba(255, 255, 255, 0.95)",
    padding: "40px",
    borderRadius: "30px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
    backdropFilter: "blur(10px)"
  },
  title: { color: "#4F46E5", marginBottom: "10px", fontWeight: "800", fontSize: "2rem" },
  subtitle: { color: "#6B7280", marginBottom: "30px", fontWeight: "500" },
  input: {
    width: "100%",
    padding: "16px",
    marginBottom: "15px",
    borderRadius: "15px",
    border: "2px solid #E5E7EB",
    outline: "none",
    fontSize: "1rem",
    boxSizing: "border-box"
  },
  passwordWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    marginBottom: "25px",
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
    display: "flex",
    alignItems: "center"
  },
  icon: { width: "22px", height: "22px", opacity: "0.5" },
  mainBtn: {
    width: "100%",
    padding: "16px",
    borderRadius: "999px",
    background: "#4F46E5",
    color: "#fff",
    border: "none",
    fontWeight: "700",
    fontSize: "1.1rem",
    cursor: "pointer",
    boxShadow: "0 10px 20px rgba(79, 70, 229, 0.4)",
    transition: "0.3s"
  },
  footerText: { marginTop: "25px", color: "#6B7280" },
  link: { color: "#4F46E5", fontWeight: "700", textDecoration: "none" }
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/user/login", { username, password });
      login(res.data.accessToken || res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Oops! Wrong credentials ❌");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome! 👋</h1>
        <p style={styles.subtitle}>Manage your 💸 effectively</p>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" required style={styles.input} onChange={(e) => setUsername(e.target.value)} />

          <div style={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              style={styles.passwordInput}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.toggleBtn}>
              <img src={showPassword ? hideIcon : showIcon} alt="toggle" style={styles.icon} />
            </button>
          </div>

          <button 
            type="submit" 
            style={styles.mainBtn}
            onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
            onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
          >
            Let's Go! 🚀
          </button>
        </form>

        <p style={styles.footerText}>
          New here? <Link to="/register" style={styles.link}>Join now!</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;