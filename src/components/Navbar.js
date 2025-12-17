import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (["/", "/register"].includes(location.pathname)) return null;

  return (
    <nav style={{ background: "#1e3a8a", padding: "15px 30px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#fff" }}>
      <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>🌊 FlowFinance</div>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/dashboard" style={navL}>Home 🏠</Link>
        <Link to="/expenses" style={navL}>History 📖</Link>
        <Link to="/add-expense" style={{ ...navL, background: "#f59e0b", padding: "8px 15px", borderRadius: "8px" }}>Add +</Link>
        <button onClick={() => { logout(); navigate("/"); }} style={{ background: "#ef4444", color: "#fff", border: "none", padding: "8px 15px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
          Logout 🚪
        </button>
      </div>
    </nav>
  );
};
const navL = { color: "#fff", textDecoration: "none", fontWeight: "600" };
export default Navbar;