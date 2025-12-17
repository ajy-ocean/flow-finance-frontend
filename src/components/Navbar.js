import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav style={{
      background: "linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%)",
      padding: "15px 40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
    }}>
      <div style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "bold" }}>💰 FlowFinance</div>
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/dashboard" style={navItem}>Home 🏠</Link>
        <Link to="/expenses" style={navItem}>View All 📊</Link>
        <button onClick={() => { logout(); navigate("/"); }} 
          style={{ background: "#ff4757", color: "#fff", border: "none", padding: "8px 18px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
          Logout 🚪
        </button>
      </div>
    </nav>
  );
};

const navItem = { color: "#fff", textDecoration: "none", fontWeight: "600", fontSize: "1.1rem" };
export default Navbar;