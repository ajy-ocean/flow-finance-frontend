import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AddExpense = () => {
    const [formData, setFormData] = useState({
        name: "",
        amount: "",
        date: "",
        description: "",
    });
    const [focusedField, setFocusedField] = useState(null);

    const navigate = useNavigate();
    const { ProtectedRoute } = useAuth();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const expenseId = params.get("id"); // check if we are editing

    const colors = {
        primary: "#00796B",
        bg: "#F4F7F8",
        card: "#FFFFFFF0",
        shadow: "0 10px 25px rgba(0,0,0,0.08)",
        focus: "0 0 0 0.25rem rgba(13,110,253,0.25)",
    };

    useEffect(() => {
        if (expenseId) fetchExpense();
    }, [expenseId]);

    const fetchExpense = async () => {
        try {
            const res = await axios.get(`/api/expenses/${expenseId}`);
            setFormData({
                name: res.data.name || "",
                amount: res.data.amount || "",
                date: res.data.date ? res.data.date.split("T")[0] : "",
                description: res.data.description || "",
            });
        } catch (err) {
            alert("Failed to load expense data.");
        }
    };

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (expenseId) {
                await axios.put(`/api/expenses/${expenseId}`, formData);
                alert("Expense updated successfully!");
            } else {
                await axios.post("/api/expenses", formData);
                alert("Expense recorded successfully!");
            }
            navigate("/expenses");
        } catch (err) {
            alert("Error saving expense: " + (err.response?.data || "Error"));
        }
    };

    const inputWrapperStyle = (field) => ({
        borderRadius: "12px",
        boxShadow: focusedField === field ? colors.focus : "none",
        transition: "0.2s ease",
        marginBottom: "10px",
    });

    const inputStyle = {
        border: "2px solid #111",
        borderRadius: "12px",
        padding: "12px",
        width: "100%",
        boxSizing: "border-box",
    };

    const buttonStyle = {
        borderRadius: "999px",
        padding: "12px",
        border: "none",
        boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
    };

    return (
        <ProtectedRoute>
            <div
                className="d-flex justify-content-center align-items-center min-vh-100 p-3"
                style={{ background: colors.bg }}
            >
                <div
                    className="card p-4 w-100"
                    style={{
                        maxWidth: "600px",
                        borderRadius: "18px",
                        background: colors.card,
                        boxShadow: colors.shadow,
                        border: "none",
                    }}
                >
                    <h2 className="text-center mb-4 text-dark">
                        {expenseId ? "Edit Expense" : "Record New Expense"}
                    </h2>

                    <form onSubmit={handleSubmit}>
                        {["name", "amount", "date", "description"].map((field) => (
                            <div className="mb-3" key={field}>
                                <label className="form-label text-muted">
                                    {field === "name"
                                        ? "Expense Name"
                                        : field === "amount"
                                        ? "Amount (₹)"
                                        : field === "date"
                                        ? "Date"
                                        : "Description (Optional)"}
                                </label>
                                <div
                                    style={inputWrapperStyle(field)}
                                    onFocus={() => setFocusedField(field)}
                                    onBlur={() => setFocusedField(null)}
                                >
                                    {field === "description" ? (
                                        <textarea
                                            name={field}
                                            rows="3"
                                            onChange={handleChange}
                                            value={formData[field]}
                                            style={inputStyle}
                                        />
                                    ) : (
                                        <input
                                            type={field === "amount" ? "number" : field === "date" ? "date" : "text"}
                                            name={field}
                                            onChange={handleChange}
                                            required={field !== "description"}
                                            value={formData[field]}
                                            style={inputStyle}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}

                        <div className="d-grid gap-2">
                            <button
                                type="submit"
                                className="btn btn-lg"
                                style={{ ...buttonStyle, backgroundColor: colors.primary, color: "white" }}
                            >
                                {expenseId ? "Update Expense" : "Save Transaction"}
                            </button>

                            <Link
                                to="/expenses"
                                className="btn btn-lg"
                                style={{ ...buttonStyle, background: "#E5E7EB", color: "#111" }}
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default AddExpense;
