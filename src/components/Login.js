import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import showImg from "../assets/icons/show.png";
import hideImg from "../assets/icons/hide.png";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [show, setShow] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/user/login", user);
      login(res.data.accessToken || res.data.token);
      navigate("/dashboard");
    } catch { alert("Invalid Credentials ❌"); }
  };

  return (
    <div style={{ background: "#3b82f6", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ background: "#fff", padding: "40px", borderRadius: "25px", width: "350px", boxShadow: "0 15px 30px rgba(0,0,0,0.2)" }}>
        <h1 style={{ color: "#f59e0b", textAlign: "center", margin: "0 0 20px 0" }}>Flow Finance 🏦</h1>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Username" required style={inputS} onChange={(e) => setUser({...user, username: e.target.value})} />
          <div style={{ position: "relative" }}>
            <input type={show ? "text" : "password"} placeholder="Password" required style={inputS} onChange={(e) => setUser({...user, password: e.target.value})} />
            <img src={show ? hideImg : showImg} onClick={() => setShow(!show)} style={iconS} alt="eye" />
          </div>
          <button type="submit" style={btnS}>Login 🚀</button>
        </form>
        <p style={{ textAlign: "center", marginTop: "15px" }}>New? <Link to="/register" style={{ color: "#3b82f6", fontWeight: "bold" }}>Sign Up</Link></p>
      </div>
    </div>
  );
};

const inputS = { width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "8px", border: "2px solid #e2e8f0", boxSizing: "border-box" };
const iconS = { position: "absolute", right: "10px", top: "12px", width: "20px", cursor: "pointer" };
const btnS = { width: "100%", padding: "12px", background: "#f59e0b", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" };

export default Login;