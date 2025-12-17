import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();
  const { ProtectedRoute } = useAuth();

  const fetch = () => axios.get("/api/expenses").then(res => setExpenses(res.data));
  useEffect(() => { fetch(); }, []);

  const del = async (id) => {
    if (window.confirm("Delete this? 🗑️")) {
      await axios.delete(`/api/expenses/${id}`);
      fetch();
    }
  };

  return (
    <ProtectedRoute>
      <div style={{ background: "#e0f2fe", minHeight: "100vh", padding: "40px" }}>
        <h2 style={{ color: "#1e3a8a", textAlign: "center", marginBottom: "30px" }}>All Transactions 🧾</h2>
        <div style={{ display: "grid", gap: "15px", maxWidth: "800px", margin: "0 auto" }}>
          {expenses.map(exp => (
            <div key={exp.id || exp._id} style={{
              background: "#fff", padding: "20px", borderRadius: "15px", display: "flex", 
              justifyContent: "space-between", border: "2px solid #3b82f6"
            }}>
              <div>
                <b style={{ fontSize: "1.2rem" }}>{exp.name}</b>
                <p style={{ margin: 0, color: "#64748b" }}>{exp.description}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <span style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#ef4444" }}>₹{exp.amount}</span>
                <button onClick={() => navigate("/add-expense", { state: { expense: exp } })} style={editB}>Edit ✏️</button>
                <button onClick={() => del(exp.id || exp._id)} style={delB}>Delete 🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};
const editB = { background: "#3b82f6", color: "#fff", border: "none", padding: "8px", borderRadius: "5px", cursor: "pointer" };
const delB = { background: "#fee2e2", color: "#ef4444", border: "none", padding: "8px", borderRadius: "5px", cursor: "pointer" };
export default ExpenseList;