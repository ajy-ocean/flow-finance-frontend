import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const { ProtectedRoute } = useAuth();

  const colors = {
    primary: "#00796B",
    bg: "#F4F7F8",
    card: "#FFFFFF",
    shadow: "0 10px 25px rgba(0,0,0,0.08)",
    hoverShadow: "0 12px 30px rgba(0,0,0,0.12)",
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
    if (window.confirm("Delete this expense?")) {
      try {
        await axios.delete(`/api/expenses/${id}`);
        fetchExpenses();
      } catch {
        alert("Error deleting");
      }
    }
  };

  const handleEdit = (expense) => {
    const formattedDate = expense.date.split("T")[0]; // format to yyyy-mm-dd
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
      alert("Error updating");
    }
  };

  return (
    <ProtectedRoute>
      <div
        style={{
          background: colors.bg,
          minHeight: "100vh",
          padding: "40px 20px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
          <h2 className="text-dark">Transaction Records</h2>
          <Link
            to="/add-expense"
            style={{
              backgroundColor: colors.primary,
              color: "white",
              borderRadius: "999px",
              padding: "10px 20px",
              textDecoration: "none",
            }}
          >
            ➕ Add New
          </Link>
        </div>

        {expenses.length === 0 ? (
          <div className="text-center mt-5 text-muted">
            No expenses recorded yet.
          </div>
        ) : (
          <div className="row g-4">
            {expenses.map((expense) => {
              const expenseId = expense.id || expense._id; // make sure we have the right ID
              return (
                <div key={expenseId} className="col-lg-4 col-md-6">
                  <div
                    style={{
                      borderRadius: "16px",
                      background: colors.card,
                      boxShadow: colors.shadow,
                      padding: "20px",
                      transition: "0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow = colors.hoverShadow)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.boxShadow = colors.shadow)
                    }
                  >
                    {editId === expenseId ? (
                      <form onSubmit={handleUpdate}>
                        <input
                          type="text"
                          name="name"
                          value={editForm.name || ""}
                          onChange={handleEditChange}
                          style={{
                            width: "100%",
                            marginBottom: "8px",
                            padding: "10px",
                            borderRadius: "12px",
                            border: "1px solid #ccc",
                          }}
                          required
                        />
                        <input
                          type="number"
                          name="amount"
                          value={editForm.amount || ""}
                          onChange={handleEditChange}
                          style={{
                            width: "100%",
                            marginBottom: "8px",
                            padding: "10px",
                            borderRadius: "12px",
                            border: "1px solid #ccc",
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
                            marginBottom: "8px",
                            padding: "10px",
                            borderRadius: "12px",
                            border: "1px solid #ccc",
                          }}
                          required
                        />
                        <textarea
                          name="description"
                          value={editForm.description || ""}
                          onChange={handleEditChange}
                          rows="2"
                          style={{
                            width: "100%",
                            marginBottom: "8px",
                            padding: "10px",
                            borderRadius: "12px",
                            border: "1px solid #ccc",
                          }}
                        />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "8px",
                          }}
                        >
                          <button
                            type="submit"
                            style={{
                              padding: "8px 16px",
                              borderRadius: "999px",
                              border: "none",
                              backgroundColor: colors.primary,
                              color: "#fff",
                            }}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditId(null)}
                            style={{
                              padding: "8px 16px",
                              borderRadius: "999px",
                              border: "1px solid #ccc",
                              background: "#fff",
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <h5 style={{ color: "#111" }}>{expense.name}</h5>
                        <p style={{ margin: "4px 0" }}>
                          <strong>Amount:</strong> ₹
                          {Number(expense.amount).toFixed(2)}
                        </p>
                        <p style={{ margin: "4px 0", color: "#555" }}>
                          <strong>Date:</strong>{" "}
                          {new Date(expense.date).toLocaleDateString()}
                        </p>
                        {expense.description && (
                          <p style={{ fontSize: "0.9rem", color: "#777" }}>
                            {expense.description}
                          </p>
                        )}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "8px",
                            marginTop: "8px",
                          }}
                        >
                          <button
                            onClick={() => handleEdit(expense)}
                            style={{
                              padding: "6px 14px",
                              borderRadius: "999px",
                              border: "1px solid #ccc",
                              background: "#fff",
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(expenseId)}
                            style={{
                              padding: "6px 14px",
                              borderRadius: "999px",
                              border: "1px solid #f00",
                              background: "#fff",
                              color: "red",
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
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
