import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { ProtectedRoute } = useAuth();
  const navigate = useNavigate();

  const colors = {
    bg: "#0F1115",
    card: "#161A20",
    green: "#00E676",
    text: "#EDEDED",
    muted: "#9AA0A6",
    border: "#2A2F3A",
  };

  return (
    <ProtectedRoute>
      <Navbar />

      <div
        style={{
          background: colors.bg,
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            background: colors.card,
            borderRadius: "26px",
            padding: "48px",
            maxWidth: "720px",
            width: "100%",
            border: `1px solid ${colors.border}`,
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: 700,
              color: colors.green,
              marginBottom: "14px",
            }}
          >
            Flow Finance
          </h1>

          <p
            style={{
              fontSize: "1.15rem",
              color: colors.muted,
              marginBottom: "36px",
            }}
          >
            Track your expenses effortlessly with a clean, modern interface.
          </p>

          <button
            onClick={() => navigate("/expenses")}
            style={{
              padding: "16px 34px",
              borderRadius: "999px",
              background: colors.green,
              color: "#000",
              fontWeight: 600,
              fontSize: "1rem",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 12px 30px rgba(0,230,118,0.35)",
            }}
          >
            View Expenses
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
