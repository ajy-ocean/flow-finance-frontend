import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const { ProtectedRoute } = useAuth();
  const navigate = useNavigate();

  const colors = {
    bg: "#111",
    card: "#161A20",
    green: "#00E676",
    text: "#EDEDED",
    muted: "#9AA0A6",
    shadow: "0 8px 20px rgba(0,230,118,0.25)",
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("/api/expenses");
      const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setExpenses(sorted);
    } catch {
      alert("Error fetching expenses");
    }
  };

  return (
    <ProtectedRoute>
      <div style={{ background: colors.bg, minHeight: "100vh", padding: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <button
            onClick={() => navigate("/add-expense")}
            style={{
              padding: "1rem 2rem",
              borderRadius: "999px",
              background: colors.green,
              color: "#111",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              boxShadow: colors.shadow,
            }}
          >
            ➕ Add New Expense
          </button>
        </div>

        {expenses.length === 0 ? (
          <p style={{ textAlign: "center", color: colors.muted }}>No expenses recorded yet.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "1rem",
            }}
          >
            {expenses.map((expense) => (
              <div
                key={expense._id || expense.id}
                style={{
                  borderRadius: "16px",
                  background: colors.card,
                  padding: "20px",
                  color: colors.text,
                  boxShadow: colors.shadow,
                }}
              >
                <h5>{expense.name}</h5>
                <p>
                  <strong>Amount:</strong> ₹{Number(expense.amount).toFixed(2)}
                </p>
                <p style={{ color: colors.muted }}>
                  <strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}
                </p>
                {expense.description && <p style={{ fontSize: "0.9rem", color: colors.muted }}>{expense.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default ExpenseList;
