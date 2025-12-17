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
        backgroundImage: "linear-gradient(rgba(224, 242, 254, 0.8), rgba(224, 242, 254, 0.8)), url('https://picsum.photos/1600/900?accounting')",
        backgroundSize: "cover",
        minHeight: "91vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div style={{
          background: "#ffffff",
          padding: "60px",
          borderRadius: "40px",
          textAlign: "center",
          border: "5px solid #0ea5e9",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.2)",
          maxWidth: "500px",
          width: "90%"
        }}>
          <h4 style={{ color: "#0369a1", textTransform: "uppercase", letterSpacing: "2px", margin: 0 }}>Current Spending</h4>
          <h1 style={{ fontSize: "5rem", color: "#dc2626", margin: "20px 0", fontWeight: "900" }}>₹{total.toLocaleString()}</h1>
          <p style={{ color: "#64748b", fontSize: "1.1rem", marginBottom: "30px" }}>You've tracked {expenses.length} expenses so far! 💸</p>
          
          <button onClick={() => navigate("/add-expense")} style={{
            background: "#10b981", 
            color: "#fff", 
            padding: "20px 40px", 
            fontSize: "1.4rem",
            border: "none", 
            borderRadius: "20px", 
            fontWeight: "bold", 
            cursor: "pointer", 
            boxShadow: "0 10px 0 #059669",
            transition: "0.2s"
          }} 
          onMouseDown={(e) => e.target.style.transform = "translateY(5px)"}
          onMouseUp={(e) => e.target.style.transform = "translateY(0px)"}>
            + ADD EXPENSE
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;