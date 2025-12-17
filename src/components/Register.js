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
      // Your controller returns JwtAuthenticationResponse(jwt)
      login(res.data.accessToken || res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Registration failed! ❌ Make sure username is unique.");
    }
  };

  return (
    <div style={{ background: "#10b981", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
      <div style={{ background: "#fff", padding: "30px", borderRadius: "20px", width: "100%", maxWidth: "400px", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
        <h2 style={{ color: "#065f46", textAlign: "center", marginBottom: "20px" }}>Join Flow Finance ✨</h2>
        <form onSubmit={handleSubmit}>
          <input name="fullName" placeholder="Full Name" required style={inputS} onChange={handleChange} />
          <input name="email" type="email" placeholder="Email Address" required style={inputS} onChange={handleChange} />
          <input name="username" placeholder="Username" required style={inputS} onChange={handleChange} />
          <div style={{ position: "relative" }}>
            <input name="password" type={show ? "text" : "password"} placeholder="Password" required style={inputS} onChange={handleChange} />
            <img src={show ? hideImg : showImg} onClick={() => setShow(!show)} style={iconS} alt="eye" />
          </div>
          <button type="submit" style={{ ...btnS, background: "#10b981" }}>Sign Up 🚀</button>
        </form>
        <p style={{ textAlign: "center", marginTop: "15px" }}>Already a member? <Link to="/" style={{ color: "#10b981", fontWeight: "bold" }}>Login</Link></p>
      </div>
    </div>
  );
};

const inputS = { width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "8px", border: "2px solid #e2e8f0", boxSizing: "border-box" };
const iconS = { position: "absolute", right: "10px", top: "12px", width: "20px", cursor: "pointer" };
const btnS = { width: "100%", padding: "12px", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", fontSize: "1rem" };

export default Register;