import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const { ProtectedRoute } = useAuth();

  // Soft minimalistic color palette
  const colors = {
    primary: "#4CAF50",      // green for buttons and accents
    bg: "#F9FAFB",           // light grey background
    card: "#FFFFFF",          // white cards
    text: "#111827",          // dark text
    muted: "#6B7280",         // muted text
    border: "#E5E7EB",        // card borders
    hover: "#F3F4F6",         // hover background
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("/api/expenses");
      const sorted = res.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setExpenses(sorted);
    } catch {
      alert("Error fetching expenses");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await axios.delete(`/api/expenses/${id}`);
        fetchExpenses();
      } catch {
        alert("Error deleting expense");
      }
    }
  };

  const handleEdit = (expense) => {
    const formattedDate = expense.date.split("T")[0]; // yyyy-mm-dd
    setEditId(expense.id || expense._id);
    setEditForm({ ...expense, date: formattedDate });
  };

  const handleEditChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/expenses/${editId}`, editForm);
      setEditId(null);
      fetchExpenses();
    } catch {
      alert("Error updating expense");
    }
  };

  return (
    <ProtectedRoute>
      <div
        style={{
          background: colors.bg,
          minHeight: "100vh",
          padding: "40px 20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          <h2 style={{ color: colors.text }}>Transaction Records</h2>
          <Link
            to="/add-expense"
            style={{
              backgroundColor: colors.primary,
              color: "#fff",
              borderRadius: "999px",
              padding: "10px 22px",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            ➕ Add New
          </Link>
        </div>

        {expenses.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "50px", color: colors.muted }}>
            No expenses recorded yet.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {expenses.map((expense) => {
              const expenseId = expense.id || expense._id;
              return (
                <div
                  key={expenseId}
                  style={{
                    borderRadius: "16px",
                    background: colors.card,
                    padding: "20px",
                    border: `1px solid ${colors.border}`,
                    transition: "0.2s",
                  }}
                >
                  {editId === expenseId ? (
                    <form onSubmit={handleUpdate}>
                      <input
                        type="text"
                        name="name"
                        value={editForm.name || ""}
                        onChange={handleEditChange}
                        placeholder="Expense Name"
                        style={{
                          width: "100%",
                          marginBottom: "10px",
                          padding: "10px",
                          borderRadius: "12px",
                          border: `1px solid ${colors.border}`,
                        }}
                        required
                      />
                      <input
                        type="number"
                        name="amount"
                        value={editForm.amount || ""}
                        onChange={handleEditChange}
                        placeholder="Amount"
                        style={{
                          width: "100%",
                          marginBottom: "10px",
                          padding: "10px",
                          borderRadius: "12px",
                          border: `1px solid ${colors.border}`,
                        }}
                        required
                      />
                      <input
                        type="date"
                        name="date"
                        value={editForm.date || ""}
                        onChange={handleEditChange}
                        style={{
                          width: "100%",
                          marginBottom: "10px",
                          padding: "10px",
                          borderRadius: "12px",
                          border: `1px solid ${colors.border}`,
                        }}
                        required
                      />
                      <textarea
                        name="description"
                        value={editForm.description || ""}
                        onChange={handleEditChange}
                        rows="2"
                        placeholder="Description (optional)"
                        style={{
                          width: "100%",
                          marginBottom: "10px",
                          padding: "10px",
                          borderRadius: "12px",
                          border: `1px solid ${colors.border}`,
                        }}
                      />
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                        <button
                          type="submit"
                          style={{
                            padding: "8px 18px",
                            borderRadius: "999px",
                            border: "none",
                            backgroundColor: colors.primary,
                            color: "#fff",
                            cursor: "pointer",
                          }}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditId(null)}
                          style={{
                            padding: "8px 18px",
                            borderRadius: "999px",
                            border: `1px solid ${colors.border}`,
                            background: "#fff",
                            cursor: "pointer",
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <h5 style={{ color: colors.text, marginBottom: "8px" }}>{expense.name}</h5>
                      <p style={{ margin: "4px 0", color: colors.text }}>
                        <strong>Amount:</strong> ₹{Number(expense.amount).toFixed(2)}
                      </p>
                      <p style={{ margin: "4px 0", color: colors.muted }}>
                        <strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}
                      </p>
                      {expense.description && (
                        <p style={{ fontSize: "0.9rem", color: colors.muted }}>
                          {expense.description}
                        </p>
                      )}
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                        <button
                          onClick={() => handleEdit(expense)}
                          style={{
                            padding: "6px 16px",
                            borderRadius: "999px",
                            border: `1px solid ${colors.primary}`,
                            background: "#fff",
                            color: colors.primary,
                            cursor: "pointer",
                            fontWeight: "500",
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(expenseId)}
                          style={{
                            padding: "6px 16px",
                            borderRadius: "999px",
                            border: `1px solid #EF4444`,
                            background: "#fff",
                            color: "#EF4444",
                            cursor: "pointer",
                            fontWeight: "500",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default ExpenseList;
