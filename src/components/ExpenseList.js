import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const { ProtectedRoute } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { fetchExpenses(); }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("/api/expenses");
      setExpenses(res.data);
    } catch { alert("Failed to load ❌"); }
  };

  const deleteItem = async (id) => {
    if (window.confirm("Delete? 🗑️")) {
      await axios.delete(`/api/expenses/${id}`);
      fetchExpenses();
    }
  };

  return (
    <ProtectedRoute>
      <div style={{ padding: "30px", background: "#f8fafc" }}>
        <h2 style={{ color: "#1e3a8a" }}>Your Expense History 📝</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
          {expenses.map((exp) => (
            <div key={exp._id || exp.id} style={{ background: "#fff", padding: "20px", borderRadius: "15px", borderLeft: "8px solid #3b82f6", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{exp.name}</span>
                <span style={{ color: "#ef4444", fontWeight: "bold", fontSize: "1.2rem" }}>₹{exp.amount}</span>
              </div>
              <p style={{ color: "#64748b", margin: "10px 0" }}>{exp.description}</p>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => navigate("/add-expense", { state: { expense: exp } })} style={{ flex: 1, background: "#3b82f6", color: "#fff", border: "none", padding: "8px", borderRadius: "5px", cursor: "pointer" }}>Edit ✏️</button>
                <button onClick={() => deleteItem(exp._id || exp.id)} style={{ flex: 1, background: "#fee2e2", color: "#ef4444", border: "none", padding: "8px", borderRadius: "5px", cursor: "pointer" }}>Delete 🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};
export default ExpenseList;