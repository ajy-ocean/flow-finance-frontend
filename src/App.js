import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";

// Single NavBar Component
const NavBar = () => {
  const { isLoggedIn, logout } = useAuth();
  const primaryColor = "#00E676"; // Green accent

  if (!isLoggedIn) return null; // Don't show navbar on login/register

  return (
    <nav
      style={{
        background: "#111",
        padding: "0.8rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Link
        to="/dashboard"
        style={{ fontWeight: 700, fontSize: "1.5rem", color: primaryColor, textDecoration: "none" }}
      >
        FlowFinance
      </Link>

      <div style={{ display: "flex", gap: "1rem" }}>
        <Link
          to="/expenses"
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "999px",
            background: "#222",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Records
        </Link>
        <button
          onClick={logout}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "999px",
            background: primaryColor,
            color: "#111",
            border: "none",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar /> {/* Only one navbar */}
        <div style={{ background: "#111", minHeight: "100vh" }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/expenses" element={<ExpenseList />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
