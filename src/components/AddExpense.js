import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";

const AddExpense = () => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    date: "",
    description: "",
  });

  const { ProtectedRoute } = useAuth();
  const navigate = useNavigate();

  const colors = {
    bg: "#0F1115",
    card: "#161A20",
    green: "#00E676",
    text: "#EDEDED",
    border: "#2A2F3A",
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    background: colors.bg,
    border: `1px solid ${colors.border}`,
    borderRadius: "14px",
    color: colors.text,
    outline: "none",
    marginBottom: "16px",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/expenses", formData);
    navigate("/expenses");
  };

  return (
    <ProtectedRoute>
      <Navbar />

      <div
        style={{
          background: colors.bg,
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            background: colors.card,
            padding: "32px",
            borderRadius: "20px",
            width: "400px",
            border: `1px solid ${colors.border}`,
          }}
        >
          <h2 style={{ color: colors.green, marginBottom: "20px" }}>
            Add Expense
          </h2>

          {["name", "amount", "date"].map((f) => (
            <input
              key={f}
              type={f === "amount" ? "number" : f === "date" ? "date" : "text"}
              placeholder={f.toUpperCase()}
              style={inputStyle}
              onFocus={(e) =>
                (e.target.style.boxShadow = "0 0 0 2px rgba(0,230,118,0.5)")
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
              onChange={(e) =>
                setFormData({ ...formData, [f]: e.target.value })
              }
              required
            />
          ))}

          <textarea
            placeholder="Description"
            rows="3"
            style={inputStyle}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <button
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "999px",
              background: colors.green,
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default AddExpense;
