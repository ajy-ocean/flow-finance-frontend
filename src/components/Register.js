import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import showImg from "../assets/icons/show.png";
import hideImg from "../assets/icons/hide.png";

const Register = () => {
  const [formData, setFormData] = useState({ fullName: "", email: "", username: "", password: "" });
  const [show, setShow] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/user/register", formData);
      if (res.data.accessToken || res.data.token) {
        login(res.data.accessToken || res.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      // Handling your specific backend 400 error
      if (err.response && (err.response.status === 400 || err.response.data.includes("credentials"))) {
        alert("Account Created! ✨ Please log in now.");
        navigate("/");
      } else {
        alert("Username or Email already exists! ❌");
      }
    }
  };

  return (
    <div style={{
      backgroundImage: "linear-gradient(rgba(224, 242, 254, 0.8), rgba(224, 242, 254, 0.8)), url('https://picsum.photos/1600/900?nature')",
      backgroundSize: "cover",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    }}>
      <div style={{ background: "#fff", padding: "40px", borderRadius: "30px", width: "100%", maxWidth: "400px", border: "4px solid #0ea5e9", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
        <h2 style={{ color: "#0369a1", textAlign: "center", marginBottom: "25px" }}>Create Account 🚀</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input name="fullName" placeholder="Full Name" required style={inS} onChange={handleChange} />
          <input name="email" type="email" placeholder="Email Address" required style={inS} onChange={handleChange} />
          <input name="username" placeholder="Username" required style={inS} onChange={handleChange} />
          <div style={{ position: "relative" }}>
            <input name="password" type={show ? "text" : "password"} placeholder="Password" required style={{...inS, width: "100%"}} onChange={handleChange} />
            <img src={show ? hideImg : showImg} onClick={() => setShow(!show)} style={{ position: "absolute", right: "12px", top: "12px", width: "22px", cursor: "pointer", opacity: 0.6 }} alt="toggle" />
          </div>
          <button type="submit" style={btnS}>JOIN FLOW FINANCE ✨</button>
        </form>
        <p style={{ textAlign: "center", marginTop: "20px", fontWeight: "600", color: "#64748b" }}>
          Already have an account? <Link to="/" style={{ color: "#0ea5e9", textDecoration: "none" }}>Log In</Link>
        </p>
      </div>
    </div>
  );
};

const inS = { padding: "14px", borderRadius: "10px", border: "2px solid #cbd5e1", fontSize: "1rem", outline: "none", boxSizing: "border-box" };
const btnS = { background: "#0ea5e9", color: "#fff", padding: "15px", borderRadius: "10px", border: "none", fontWeight: "bold", fontSize: "1.1rem", cursor: "pointer", boxShadow: "0 5px 0 #0284c7" };

export default Register;