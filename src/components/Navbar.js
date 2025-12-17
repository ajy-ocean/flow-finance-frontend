import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (["/", "/register"].includes(location.pathname)) return null;

  const handleLogout = () => {
    if (window.confirm("Ready to leave? 👋")) {
      logout();
      navigate("/");
    }
  };

  return (
    <nav style={{
      background: "linear-gradient(135deg, #0d9488 0%, #2563eb 100%)",
      padding: "15px 40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
      position: "sticky",
      top: 0,
      zIndex: 1000
    }}>
      {/* LOGO ACTS AS HOME BUTTON */}
      <Link to="/dashboard" style={{ 
        color: "#fff", 
        fontSize: "1.6rem", 
        fontWeight: "900", 
        letterSpacing: "1px", 
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }}>
        💰 FlowFinance
      </Link>
      
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/expenses" style={navLink}>View All 📊</Link>
        
        <Link to="/add-expense" style={{
          ...navLink, 
          background: "#10b981", 
          padding: "10px 20px", 
          borderRadius: "12px",
          boxShadow: "0 4px 0 #059669"
        }}>
          Add Expense +
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
  fontWeight: "700",
  fontSize: "1.05rem",
};

const logoutBtn = {
  background: "#f43f5e",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: "12px",
  fontWeight: "800",
  cursor: "pointer",
  boxShadow: "0 4px 0 #be123c",
  marginLeft: "10px"
};

export default Navbar;