import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show navbar on Login or Register
  if (["/", "/register"].includes(location.pathname)) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={{
      background: "linear-gradient(135deg, #0d9488 0%, #2563eb 100%)",
      padding: "15px 40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "900", letterSpacing: "1px" }}>
        💰 FlowFinance
      </div>
      
      <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
        <Link to="/dashboard" style={navLink}>Home 🏠</Link>
        <Link to="/expenses" style={navLink}>View All 📊</Link>
        <Link to="/add-expense" style={{...navLink, background: "rgba(255,255,255,0.2)", padding: "8px 15px", borderRadius: "8px"}}>
          Add +
        </Link>
        <button onClick={handleLogout} style={logoutBtn}>
          Logout 🚪
        </button>
      </div>
    </nav>
  );
};

const navLink = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "1.1rem",
  transition: "0.3s"
};

const logoutBtn = {
  background: "#f43f5e",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: "10px",
  fontWeight: "700",
  cursor: "pointer",
  boxShadow: "0 4px 0 #be123c"
};

export default Navbar;