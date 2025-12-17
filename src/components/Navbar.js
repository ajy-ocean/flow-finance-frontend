import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Define the pages where the Navbar should be hidden
  const hideNavbarOn = ["/", "/register"];
  if (hideNavbarOn.includes(location.pathname)) return null;

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out? 👋")) {
      logout();
      navigate("/");
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {/* Left Side: Logo and Navigation */}
        <div style={styles.leftSection}>
          <Link to="/dashboard" style={styles.logo}>
            🚀 <span style={{ color: "#fff" }}>Flow</span>Finance
          </Link>
          
          <div style={styles.navLinks}>
            <Link to="/dashboard" style={location.pathname === "/dashboard" ? styles.activeLink : styles.link}>
              Home
            </Link>
            <Link to="/expenses" style={location.pathname === "/expenses" ? styles.activeLink : styles.link}>
              History
            </Link>
            <Link to="/add-expense" style={location.pathname === "/add-expense" ? styles.activeLink : styles.link}>
              Add 💸
            </Link>
          </div>
        </div>

        {/* Right Side: Logout Button */}
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout 🚪
        </button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    background: "#0F172A", // Deep Slate (Matches Dashboard)
    padding: "0 20px",
    height: "70px",
    display: "flex",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  container: {
    width: "100%",
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "40px",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "800",
    textDecoration: "none",
    color: "#6366F1", // Brand Accent
  },
  navLinks: {
    display: "flex",
    gap: "25px",
  },
  link: {
    color: "#94A3B8",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "0.95rem",
    transition: "0.2s",
  },
  activeLink: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "0.95rem",
    borderBottom: "2px solid #6366F1",
    paddingBottom: "5px",
  },
  logoutBtn: {
    padding: "10px 24px",
    borderRadius: "999px",
    background: "#FF4D4D", // Red Alert Color
    color: "#fff",
    border: "none",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 8px 15px rgba(255, 77, 77, 0.25)",
    transition: "transform 0.2s",
  },
};

export default Navbar;