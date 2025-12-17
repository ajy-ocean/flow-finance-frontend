import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AddExpense = () => {
  const { ProtectedRoute } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", amount: "", date: "", description: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/expenses", form);
      navigate("/expenses");
    } catch { alert("Error adding expense ❌"); }
  };

  return (
    <ProtectedRoute>
      <div style={{ display: "flex", justifyContent: "center", padding: "50px 20px" }}>
        <div style={{ background: "#fff", padding: "40px", borderRadius: "30px", width: "100%", maxWidth: "500px", boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }}>
          <h2 style={{ marginBottom: "25px", fontWeight: "800" }}>New Expense 💸</h2>
          <form onSubmit={handleSubmit}>
            <input name="name" placeholder="What did you buy?" required style={inputStyle} onChange={handleChange} />
            <input name="amount" type="number" placeholder="How much? (₹)" required style={inputStyle} onChange={handleChange} />
            <input name="date" type="date" required style={inputStyle} onChange={handleChange} />
            <textarea name="description" placeholder="Extra notes (optional)" rows="3" style={inputStyle} onChange={handleChange} />
            <button type="submit" style={{ width: "100%", padding: "16px", borderRadius: "999px", background: "#10B981", color: "#fff", border: "none", fontWeight: "700", fontSize: "1.1rem", cursor: "pointer", boxShadow: "0 10px 20px rgba(16, 185, 129, 0.3)" }}>
              Save Transaction ✅
            </button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
};

const inputStyle = { width: "100%", padding: "14px", marginBottom: "15px", borderRadius: "15px", border: "2px solid #F3F4F6", outline: "none", fontSize: "1rem" };

export default AddExpense;