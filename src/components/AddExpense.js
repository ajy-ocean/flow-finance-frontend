import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AddExpense = () => {
  const { ProtectedRoute } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we are editing an existing expense
  const editData = location.state?.expense;
  
  const [form, setForm] = useState({
    name: editData?.name || "",
    amount: editData?.amount || "",
    date: editData?.date ? editData.date.split('T')[0] : "",
    description: editData?.description || ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        // MATCHES YOUR CONTROLLER: @PutMapping("/{id}")
        await axios.put(`/api/expenses/${editData._id || editData.id}`, form);
        alert("Updated successfully! ✅");
      } else {
        // MATCHES YOUR CONTROLLER: @PostMapping
        await axios.post("/api/expenses", form);
        alert("Added successfully! 💰");
      }
      navigate("/expenses");
    } catch (err) {
      alert("Error saving data. Please check your connection.");
    }
  };

  return (
    <ProtectedRoute>
      <div style={{ padding: "40px", display: "flex", justifyContent: "center", background: "#f0f4f8", minHeight: "100vh" }}>
        <div style={{ background: "#fff", padding: "30px", borderRadius: "20px", width: "100%", maxWidth: "500px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", border: "2px solid #3b82f6" }}>
          <h2 style={{ color: "#1e3a8a", textAlign: "center" }}>{editData ? "📝 Edit Expense" : "➕ Add New Expense"}</h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <input type="text" placeholder="Item Name (e.g. Pizza 🍕)" value={form.name} required style={inputStyle} onChange={(e) => setForm({...form, name: e.target.value})} />
            <input type="number" placeholder="Amount (₹)" value={form.amount} required style={inputStyle} onChange={(e) => setForm({...form, amount: e.target.value})} />
            <input type="date" value={form.date} required style={inputStyle} onChange={(e) => setForm({...form, date: e.target.value})} />
            <textarea placeholder="Description" value={form.description} style={inputStyle} onChange={(e) => setForm({...form, description: e.target.value})} />
            <button type="submit" style={{ background: "#10b981", color: "#fff", padding: "15px", borderRadius: "10px", border: "none", fontWeight: "bold", cursor: "pointer", fontSize: "1.1rem" }}>
              {editData ? "Update Now ✅" : "Save Expense 💵"}
            </button>
            <button type="button" onClick={() => navigate("/expenses")} style={{ background: "#9ca3af", color: "#fff", padding: "10px", borderRadius: "10px", border: "none", cursor: "pointer" }}>Cancel</button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
};

const inputStyle = { padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "1rem" };
export default AddExpense;