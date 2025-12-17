import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Hide navbar on Login and Register pages
  if (location.pathname === "/" || location.pathname === "/register") return null;

  return (
    <nav style={{
      background: "linear-gradient(90deg, #6366F1 0%, #A855F7 100%)",
      padding: "14px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 4px 20px rgba(99, 102, 241, 0.3)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    }}>
      <Link to="/dashboard" style={{ color: "#fff", fontSize: "1.6rem", fontWeight: "800", textDecoration: "none", letterSpacing: "-1px" }}>
        🚀 FlowFinance
      </Link>

      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <Link to="/expenses" style={{
          padding: "8px 20px",
          borderRadius: "999px",
          color: "#fff",
          textDecoration: "none",
          background: "rgba(255, 255, 255, 0.2)",
          fontWeight: "600",
          backdropFilter: "blur(10px)",
        }}>
          📊 Records
        </Link>

        <button onClick={() => { logout(); navigate("/"); }}
          style={{
            padding: "8px 22px",
            borderRadius: "999px",
            background: "#FF3366",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "700",
            boxShadow: "0 4px 12px rgba(255, 51, 102, 0.4)",
          }}>
          Exit 🚪
        </button>
      </div>
    </nav>
  );
};

export default Navbar;