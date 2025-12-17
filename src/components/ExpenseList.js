import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();
  const { ProtectedRoute } = useAuth();

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("/api/expenses");
      setExpenses(res.data);
    } catch { console.error("Fetch failed"); }
  };

  useEffect(() => { fetchExpenses(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this expense permanently? 🗑️")) {
      try {
        // Correctly calls your @DeleteMapping("/{id}")
        await axios.delete(`/api/expenses/${id}`);
        fetchExpenses(); // Refresh list
      } catch { alert("Error deleting ❌"); }
    }
  };

  return (
    <ProtectedRoute>
      <div style={{
        backgroundImage: "linear-gradient(to bottom, rgba(240, 249, 255, 0.9), rgba(240, 249, 255, 0.9)), url('https://picsum.photos/1600/900?finance')",
        backgroundSize: "cover",
        minHeight: "100vh",
        padding: "40px"
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ color: "#1e3a8a", fontSize: "2.5rem", textAlign: "center", marginBottom: "30px" }}>
            Expense Records 📑
          </h2>
          
          <div style={{ display: "grid", gap: "20px" }}>
            {expenses.map((exp) => (
              <div key={exp.id || exp._id} style={cardStyle}>
                <div>
                  <h3 style={{ margin: "0 0 5px 0", color: "#1e40af" }}>{exp.name}</h3>
                  <span style={{ color: "#64748b", fontWeight: "600" }}>{new Date(exp.date).toLocaleDateString()}</span>
                  <p style={{ margin: "10px 0 0 0", color: "#475569" }}>{exp.description}</p>
                </div>
                
                <div style={{ textAlign: "right", minWidth: "150px" }}>
                  <div style={{ fontSize: "1.8rem", fontWeight: "900", color: "#e11d48", marginBottom: "15px" }}>
                    ₹{exp.amount}
                  </div>
                  <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                    {/* EDIT: Passes the whole object to AddExpense.js */}
                    <button onClick={() => navigate("/add-expense", { state: { expense: exp } })} style={editBtn}>
                      Edit ✏️
                    </button>
                    <button onClick={() => handleDelete(exp.id || exp._id)} style={deleteBtn}>
                      Delete 🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

const cardStyle = {
  background: "#fff",
  padding: "25px",
  borderRadius: "20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "3px solid #7dd3fc",
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
};

const editBtn = { background: "#0ea5e9", color: "#fff", border: "none", padding: "8px 15px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" };
const deleteBtn = { background: "#fee2e2", color: "#ef4444", border: "none", padding: "8px 15px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" };

export default ExpenseList;