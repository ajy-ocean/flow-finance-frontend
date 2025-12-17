import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AddExpense = () => {
  const { ProtectedRoute } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", amount: "", date: "", description: "" });

  const colors = {
    primary: "#4CAF50",
    bg: "#F9FAFB",
    card: "#FFFFFF",
    border: "#E5E7EB",
    text: "#111827",
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/expenses", form);
      navigate("/expenses");
    } catch {
      alert("Error adding expense");
    }
  };

  return (
    <ProtectedRoute>
      <div style={{ background: colors.bg, minHeight: "100vh", padding: "40px 20px", fontFamily: "Arial, sans-serif" }}>
        <h2 style={{ color: colors.text, marginBottom: "20px" }}>Add New Expense</h2>
        <form onSubmit={handleSubmit} style={{
          background: colors.card,
          padding: "20px",
          borderRadius: "16px",
          border: `1px solid ${colors.border}`,
          maxWidth: "500px"
        }}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Expense Name"
            required
            style={{ width: "100%", marginBottom: "10px", padding: "10px", borderRadius: "12px", border: `1px solid ${colors.border}` }}
          />
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Amount"
            required
            style={{ width: "100%", marginBottom: "10px", padding: "10px", borderRadius: "12px", border: `1px solid ${colors.border}` }}
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: "10px", padding: "10px", borderRadius: "12px", border: `1px solid ${colors.border}` }}
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description (optional)"
            rows="3"
            style={{ width: "100%", marginBottom: "10px", padding: "10px", borderRadius: "12px", border: `1px solid ${colors.border}` }}
          />
          <button type="submit" style={{
            padding: "10px 22px",
            borderRadius: "999px",
            border: "none",
            backgroundColor: colors.primary,
            color: "#fff",
            cursor: "pointer",
            fontWeight: "500"
          }}>Add Expense</button>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default AddExpense;
