import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { ProtectedRoute } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/expenses").then(res => setExpenses(res.data)).catch(e => console.log(e));
  }, []);

  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  return (
    <ProtectedRoute>
      <div style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url('https://picsum.photos/1600/900?money')",
        backgroundSize: "cover",
        minHeight: "91vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "50px"
      }}>
        <div style={{
          background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
          padding: "60px",
          borderRadius: "30px",
          textAlign: "center",
          border: "4px solid #3b82f6",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ color: "#1e40af", fontSize: "2rem" }}>Monthly Spending 💸</h2>
          <h1 style={{ fontSize: "5rem", color: "#ef4444", margin: "20px 0" }}>₹{total.toLocaleString()}</h1>
          <button onClick={() => navigate("/add-expense")} style={{
            background: "#10b981", color: "#fff", padding: "20px 40px", fontSize: "1.3rem",
            border: "none", borderRadius: "15px", fontWeight: "bold", cursor: "pointer", boxShadow: "0 10px 0 #059669"
          }}>
            + ADD NEW EXPENSE
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
};
export default Dashboard;