import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { ProtectedRoute } = useAuth();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get("/api/expenses");
        setExpenses(res.data);
      } catch { console.error("Error fetching"); }
    };
    fetchExpenses();
  }, []);

  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  return (
    <ProtectedRoute>
      <div style={{ padding: "40px 20px", maxWidth: "1100px", margin: "0 auto" }}>
        <h2 style={{ marginBottom: "30px", fontWeight: "800", color: "#111827" }}>Your Overview 📈</h2>
        
        <div style={{
          background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
          padding: "40px", borderRadius: "30px", color: "#fff", textAlign: "center",
          boxShadow: "0 15px 35px rgba(16, 185, 129, 0.3)"
        }}>
          <h4 style={{ opacity: 0.9, textTransform: "uppercase", letterSpacing: "1px" }}>Total Spending</h4>
          <h1 style={{ fontSize: "3.5rem", margin: "10px 0" }}>₹{total.toLocaleString()}</h1>
          <Link to="/expenses" style={{
            display: "inline-block", marginTop: "20px", padding: "12px 30px",
            background: "#fff", color: "#059669", borderRadius: "999px",
            textDecoration: "none", fontWeight: "700"
          }}>View Details 🔎</Link>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;