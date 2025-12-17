import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { ProtectedRoute } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get("/api/expenses");
        setExpenses(res.data);
      } catch {
        console.error("Error fetching");
      }
    };
    fetchExpenses();
  }, []);

  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  // Restored the previous edit way
  const handleEdit = (expense) => {
    navigate("/add-expense", { state: { expense } });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this? 🗑️")) {
      try {
        await axios.delete(`/api/expenses/${id}`);
        setExpenses(expenses.filter((exp) => exp._id !== id));
      } catch (err) {
        alert("Failed to delete");
      }
    }
  };

  return (
    <ProtectedRoute>
      <div style={{ padding: "40px 20px", maxWidth: "1100px", margin: "0 auto", minHeight: "90vh" }}>
        <h2 style={{ marginBottom: "30px", fontWeight: "800", color: "#1F2937", fontSize: "2.2rem" }}>
          Dashboard 🏠
        </h2>
        
        {/* Main spending card - Adjusted to a softer dark theme */}
        <div style={{
          background: "#1E293B", // Deep Slate Blue (Sophisticated, not too bright)
          padding: "50px 30px", 
          borderRadius: "32px", 
          color: "#fff", 
          textAlign: "center",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
          marginBottom: "50px",
          border: "1px solid #334155"
        }}>
          <h4 style={{ color: "#94A3B8", textTransform: "uppercase", letterSpacing: "2px", fontWeight: "600", marginBottom: "10px" }}>
            Total Spending
          </h4>
          {/* Amount in RED because it's spending */}
          <h1 style={{ fontSize: "4rem", margin: "0", color: "#FF4D4D", fontWeight: "900", textShadow: "0 0 20px rgba(255, 77, 77, 0.2)" }}>
            ₹{total.toLocaleString()}
          </h1>
          
          <Link to="/add-expense" style={{
            display: "inline-block", 
            marginTop: "30px", 
            padding: "14px 40px",
            background: "linear-gradient(90deg, #6366F1, #A855F7)", 
            color: "#fff", 
            borderRadius: "999px",
            textDecoration: "none", 
            fontWeight: "700",
            boxShadow: "0 10px 20px rgba(99, 102, 241, 0.3)"
          }}>
            + Add Expense
          </Link>
        </div>

        <h3 style={{ color: "#4B5563", marginBottom: "20px" }}>Recent Activity ⚡</h3>
        <div style={{ display: "grid", gap: "15px" }}>
          {expenses.slice(0, 5).map((exp) => (
            <div key={exp._id} style={{
              background: "#fff",
              padding: "20px 30px",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
              border: "1px solid #F1F5F9"
            }}>
              <div>
                <h4 style={{ margin: 0, color: "#1E293B", fontSize: "1.1rem" }}>{exp.name}</h4>
                <small style={{ color: "#94A3B8" }}>{new Date(exp.date).toLocaleDateString()}</small>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <span style={{ fontWeight: "800", color: "#FF4D4D", fontSize: "1.2rem" }}>- ₹{exp.amount}</span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => handleEdit(exp)} style={smallBtnStyle("#EEF2FF", "#4F46E5")}>✏️</button>
                  <button onClick={() => handleDelete(exp._id)} style={smallBtnStyle("#FFE4E6", "#E11D48")}>🗑️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};

// Reusable style for small pill buttons
const smallBtnStyle = (bg, color) => ({
  background: bg,
  color: color,
  border: "none",
  borderRadius: "12px",
  width: "40px",
  height: "40px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1rem",
  transition: "0.2s"
});

export default Dashboard;