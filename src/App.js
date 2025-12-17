import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import Navbar from "./components/Navbar"; // 1. IMPORT NAVBAR

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Changed background to a soothing color instead of black #111 */}
        <div style={{ background: "#f0f9ff", minHeight: "100vh" }}>
          
          {/* 2. PLACE NAVBAR HERE (Above Routes) */}
          <Navbar /> 

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