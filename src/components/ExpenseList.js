import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const { ProtectedRoute } = useAuth();

  useEffect(() => { fetchExpenses(); }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("/api/expenses");
      setExpenses(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch { alert("Session expired. Please login again."); }
  };

  const deleteExp = async (id) => {
    if (window.confirm("Delete this transaction? 🗑️")) {
      await axios.delete(`/api/expenses/${id}`);
      fetchExpenses();
    }
  };

  return (
    <ProtectedRoute>
      <div style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "800" }}>💸 Transactions</h2>
          <Link to="/add-expense" style={{
            background: "linear-gradient(to right, #6366F1, #A855F7)",
            color: "#fff", borderRadius: "999px", padding: "12px 30px",
            textDecoration: "none", fontWeight: "700", boxShadow: "0 10px 20px rgba(99, 102, 241, 0.4)"
          }}>
            ✨ Add New
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "25px" }}>
          {expenses.map((exp) => (
            <div key={exp._id || exp.id} style={{
              background: "#fff", borderRadius: "24px", padding: "25px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)", border: "1px solid #E5E7EB"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6366F1", fontWeight: "700" }}>{new Date(exp.date).toLocaleDateString()}</span>
                <span style={{ background: "#F3F4F6", padding: "4px 12px", borderRadius: "999px", fontSize: "0.8rem" }}>Success ✅</span>
              </div>
              <h3 style={{ margin: "15px 0 5px 0", fontSize: "1.4rem" }}>{exp.name}</h3>
              <p style={{ color: "#6B7280", marginBottom: "15px" }}>{exp.description || "No description"}</p>
              <p style={{ fontSize: "1.8rem", fontWeight: "900", color: "#10B981" }}>₹{Number(exp.amount).toFixed(2)}</p>
              
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button style={{ flex: 1, padding: "12px", borderRadius: "999px", border: "none", background: "#EEF2FF", color: "#4F46E5", fontWeight: "700", cursor: "pointer" }}>✏️ Edit</button>
                <button onClick={() => deleteExp(exp._id || exp.id)} style={{ flex: 1, padding: "12px", borderRadius: "999px", border: "none", background: "#FFE4E6", color: "#E11D48", fontWeight: "700", cursor: "pointer" }}>🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ExpenseList;