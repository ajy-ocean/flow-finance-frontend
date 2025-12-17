import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { ProtectedRoute } = useAuth();
  const [expenses, setExpenses] = useState([]);

  const colors = {
    primary: "#4CAF50",
    bg: "#F9FAFB",
    card: "#FFFFFF",
    text: "#111827",
    muted: "#6B7280",
    border: "#E5E7EB",
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("/api/expenses");
      setExpenses(res.data);
    } catch {
      alert("Error fetching expenses");
    }
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  return (
    <ProtectedRoute>
      <div style={{ background: colors.bg, minHeight: "100vh", padding: "40px 20px", fontFamily: "Arial, sans-serif" }}>
        <h2 style={{ color: colors.text, marginBottom: "20px" }}>Dashboard</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          <div style={{
            flex: "1",
            minWidth: "250px",
            background: colors.card,
            padding: "20px",
            borderRadius: "16px",
            border: `1px solid ${colors.border}`,
            textAlign: "center"
          }}>
            <h4 style={{ color: colors.muted }}>Total Expenses</h4>
            <p style={{ fontSize: "1.5rem", fontWeight: "600", color: colors.text }}>₹{totalExpenses.toFixed(2)}</p>
            <Link to="/expenses" style={{
              display: "inline-block",
              marginTop: "10px",
              padding: "8px 18px",
              borderRadius: "999px",
              backgroundColor: colors.primary,
              color: "#fff",
              textDecoration: "none"
            }}>View All</Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
