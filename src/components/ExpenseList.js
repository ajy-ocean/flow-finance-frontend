import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const { ProtectedRoute } = useAuth();
  const navigate = useNavigate();

  const colors = {
    bg: "#0F1115",
    card: "#161A20",
    green: "#00E676",
    text: "#EDEDED",
    border: "#2A2F3A",
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const res = await axios.get("/api/expenses");
    setExpenses(res.data);
  };

  return (
    <ProtectedRoute>
      <Navbar />

      <div
        style={{ background: colors.bg, minHeight: "100vh", padding: "30px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
            gap: "20px",
          }}
        >
          {expenses.map((e) => (
            <div
              key={e._id || e.id}
              style={{
                background: colors.card,
                borderRadius: "18px",
                padding: "18px",
                border: `1px solid ${colors.border}`,
                color: colors.text,
              }}
            >
              <h4>{e.name}</h4>
              <p>₹ {Number(e.amount).toFixed(2)}</p>
              <small>{new Date(e.date).toDateString()}</small>
            </div>
          ))}
        </div>

        {/* Google Keep style add button */}
        <button
          onClick={() => navigate("/add-expense")}
          style={{
            position: "fixed",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: colors.green,
            color: "#000",
            fontSize: "32px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(0,230,118,0.4)",
          }}
        >
          +
        </button>
      </div>
    </ProtectedRoute>
  );
};

export default ExpenseList;
