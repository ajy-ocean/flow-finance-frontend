import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AddExpense = () => {
  const { ProtectedRoute } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const editItem = location.state?.expense;

  const [form, setForm] = useState({
    name: editItem?.name || "",
    amount: editItem?.amount || "",
    date: editItem?.date ? editItem.date.split("T")[0] : "",
    description: editItem?.description || ""
  });

  const save = async (e) => {
    e.preventDefault();
    try {
      if (editItem) {
        // CALLS YOUR @PutMapping("/{id}")
        await axios.put(`/api/expenses/${editItem.id || editItem._id}`, form);
      } else {
        // CALLS YOUR @PostMapping
        await axios.post("/api/expenses", form);
      }
      navigate("/expenses");
    } catch { alert("Error saving! ❌"); }
  };

  return (
    <ProtectedRoute>
      <div style={{ background: "#fdf2f2", minHeight: "100vh", display: "flex", justifyContent: "center", padding: "50px" }}>
        <div style={{ background: "#fff", padding: "40px", borderRadius: "20px", border: "4px solid #10b981", width: "400px" }}>
          <h2 style={{ textAlign: "center", color: "#065f46" }}>{editItem ? "✏️ Edit Expense" : "💰 New Expense"}</h2>
          <form onSubmit={save} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <input placeholder="Name" value={form.name} required style={inS} onChange={e => setForm({...form, name: e.target.value})} />
            <input placeholder="Amount" type="number" value={form.amount} required style={inS} onChange={e => setForm({...form, amount: e.target.value})} />
            <input type="date" value={form.date} required style={inS} onChange={e => setForm({...form, date: e.target.value})} />
            <textarea placeholder="Note" value={form.description} style={inS} onChange={e => setForm({...form, description: e.target.value})} />
            <button type="submit" style={{ background: "#10b981", color: "#fff", padding: "12px", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>SAVE ✅</button>
            <button type="button" onClick={() => navigate("/expenses")} style={{ background: "#94a3b8", color: "#fff", border: "none", padding: "8px", borderRadius: "8px", cursor: "pointer" }}>Cancel</button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
};
const inS = { padding: "12px", borderRadius: "8px", border: "2px solid #cbd5e1" };
export default AddExpense;