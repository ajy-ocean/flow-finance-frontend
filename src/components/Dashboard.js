import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { ProtectedRoute } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/expenses");
      setExpenses(res.data);
    } catch {
      console.error("Error fetching data");
    }
  };

  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this expense? 🗑️")) {
      try {
        await axios.delete(`/api/expenses/${id}`);
        fetchData(); // Refresh the list
      } catch {
        alert("Delete failed ❌");
      }
    }
  };

  return (
    <ProtectedRoute>
      <div style={{ padding: "30px", background: "#f1f5f9", minHeight: "100vh" }}>
        <h1 style={{ color: "#1e3a8a", marginBottom: "20px" }}>Dashboard 🏠</h1>

        {/* Expense Card */}
        <div style={{ background: "#fff", padding: "30px", borderRadius: "20px", border: "3px solid #ef4444", textAlign: "center", marginBottom: "40px" }}>
          <h3 style={{ color: "#64748b", margin: 0 }}>Total Spending 💸</h3>
          <h1 style={{ fontSize: "3.5rem", color: "#ef4444", margin: "10px 0" }}>₹{total.toLocaleString()}</h1>
          <button 
            onClick={() => navigate("/add-expense")} 
            style={{ background: "#3b82f6", color: "#fff", padding: "12px 25px", border: "none", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" }}
          >
            + Add New Expense
          </button>
        </div>

        <h2 style={{ color: "#1e3a8a" }}>Quick Actions ⚡</h2>
        <div style={{ display: "grid", gap: "15px" }}>
          {expenses.length === 0 ? <p>No expenses found. Start adding! 😊</p> : 
            expenses.slice(0, 5).map((exp) => (
              <div key={exp.id || exp._id} style={{ background: "#fff", padding: "15px 25px", borderRadius: "15px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
                <div>
                  <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{exp.name}</span>
                  <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>{new Date(exp.date).toLocaleDateString()}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                  <span style={{ fontWeight: "bold", color: "#ef4444" }}>- ₹{exp.amount}</span>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {/* EDIT: Passes state to AddExpense page */}
                    <button onClick={() => navigate("/add-expense", { state: { expense: exp } })} style={actionBtn("#dbeafe", "#2563eb")}>Edit ✏️</button>
                    {/* DELETE: Calls the API directly */}
                    <button onClick={() => handleDelete(exp.id || exp._id)} style={actionBtn("#fee2e2", "#dc2626")}>Delete 🗑️</button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </ProtectedRoute>
  );
};

const actionBtn = (bg, color) => ({
  background: bg,
  color: color,
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "0.85rem"
});

export default Dashboard;