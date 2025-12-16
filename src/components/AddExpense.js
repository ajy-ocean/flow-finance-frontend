import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
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

    const colors = {
        primary: "#00796B",
        bg: "#F4F7F8",
        card: "#FFFFFFF0",
        shadow: "0 10px 25px rgba(0,0,0,0.08)",
        focus: "0 0 0 0.25rem rgba(13,110,253,0.25)",
    };

    // Get id from query param
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");

    // Fetch expense if editing
    useEffect(() => {
        if (id) {
            axios.get(`/api/expenses/${id}`)
                .then(res => setFormData(res.data))
                .catch(err => alert("Failed to fetch expense data."));
        }
    }, [id]);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                // Edit
                await axios.put(`/api/expenses/${id}`, formData);
                alert("Expense updated successfully!");
            } else {
                // New
                await axios.post("/api/expenses", formData);
                alert("Expense recorded successfully!");
            }
            navigate("/expenses");
        } catch (err) {
            alert("Error: " + (err.response?.data || "Something went wrong"));
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
            <div className="d-flex justify-content-center align-items-center min-vh-100 p-3" style={{ background: colors.bg }}>
                <div className="card p-4 w-100" style={{ maxWidth: "600px", borderRadius: "18px", background: colors.card, boxShadow: colors.shadow, border: "none" }}>
                    <h2 className="text-center mb-4 text-dark">
                        {id ? "Edit Expense" : "Record New Expense"}
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
                                <div style={inputWrapperStyle(field)} onFocus={() => setFocusedField(field)} onBlur={() => setFocusedField(null)}>
                                    {field === "description" ? (
                                        <textarea name={field} rows="3" value={formData[field]} onChange={handleChange} style={inputStyle} />
                                    ) : (
                                        <input
                                            type={field === "amount" ? "number" : field === "date" ? "date" : "text"}
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleChange}
                                            required={field !== "description"}
                                            style={inputStyle}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}

                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-lg" style={{ ...buttonStyle, backgroundColor: colors.primary, color: "white" }}>
                                {id ? "Update Transaction" : "Save Transaction"}
                            </button>

                            <Link to="/expenses" className="btn btn-lg" style={{ ...buttonStyle, background: "#E5E7EB", color: "#111" }}>
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