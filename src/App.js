import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";

// Helper component for the Navigation Bar
const NavBar = () => {
  const { isLoggedIn, logout } = useAuth();
  const primaryColor = "#00796B"; // Deep Cyan

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container-fluid px-4">
        {/* Custom Icon Placeholder (Themed) */}
        <div
          style={{
            fontSize: "1.5rem",
            color: primaryColor,
            marginRight: "10px",
          }}
        >
          📈
        </div>
        <Link className="navbar-brand fw-bold text-dark" to="/dashboard">
          Flow Finance
        </Link>

        <div className="collapse navbar-collapse justify-content-end">
          {isLoggedIn && (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-muted" to="/expenses">
                  Records
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-muted" to="/add-expense">
                  Add
                </Link>
              </li>
              <li className="nav-item">
                <button
                  onClick={logout}
                  className="btn btn-sm ms-3"
                  style={{
                    backgroundColor: primaryColor,
                    color: "white",
                    borderColor: primaryColor,
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Global Wrapper for consistent light background */}
        <div className="App bg-light min-vh-100">
          {/* Routes that need the NavBar */}
          <Routes>
            <Route path="/dashboard" element={<NavBar />} />
            <Route path="/add-expense" element={<NavBar />} />
            <Route path="/expenses" element={<NavBar />} />
          </Routes>

          {/* Routes that contain the actual content */}
          <Routes>
            {/* Auth Routes - Full screen, no Nav */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Content Routes - Content below Nav */}
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
