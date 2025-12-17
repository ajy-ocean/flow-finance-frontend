import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const colors = {
    bg: "#0F1115",
    card: "#161A20",
    green: "#00E676",
    text: "#EDEDED",
    border: "#2A2F3A",
  };

  return (
    <nav
      style={{
        background: colors.bg,
        padding: "16px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: `1px solid ${colors.border}`,
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Link
        to="/dashboard"
        style={{
          color: colors.green,
          fontSize: "1.6rem",
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        FlowFinance
      </Link>

      <div style={{ display: "flex", gap: "12px" }}>
        <Link
          to="/expenses"
          style={{
            padding: "8px 18px",
            borderRadius: "999px",
            border: `1px solid ${colors.border}`,
            color: colors.text,
            textDecoration: "none",
            background: colors.card,
          }}
        >
          View Expenses
        </Link>

        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          style={{
            padding: "8px 18px",
            borderRadius: "999px",
            background: "#FF5252",
            border: "none",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
