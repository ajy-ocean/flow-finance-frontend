import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { ProtectedRoute } = useAuth();
    const colors = { primary: "#00796B", bg: "#F4F7F8", card: "#FFFFFFF0", shadow: "0 10px 25px rgba(0,0,0,0.08)" };

    return (
        <ProtectedRoute>
            <div
                className="d-flex justify-content-center align-items-center min-vh-100"
                style={{ background: colors.bg }}
            >
                <div
                    className="card p-5 text-center"
                    style={{
                        borderRadius: "18px",
                        background: colors.card,
                        boxShadow: colors.shadow,
                        maxWidth: "700px",
                        width: "100%",
                    }}
                >
                    <div style={{ fontSize: "4rem", color: colors.primary, marginBottom: "20px" }}>💰</div>
                    <h1 className="mb-3 fw-bold text-dark">Welcome to Flow Finance</h1>
                    <p className="mb-5 text-muted lead">
                        Your central hub for tracking and managing your personal expenses efficiently.
                    </p>

                    <div className="d-flex flex-wrap justify-content-center gap-3">
                        <Link
                            to="/add-expense"
                            className="btn btn-lg"
                            style={{
                                backgroundColor: colors.primary,
                                color: "white",
                                borderRadius: "999px",
                                boxShadow: "0 8px 20px rgba(0,121,107,0.35)",
                                padding: "12px 30px",
                                border: "none",
                            }}
                        >
                            ➕ Add New Expense
                        </Link>
                        <Link
                            to="/expenses"
                            className="btn btn-lg"
                            style={{
                                background: "#E5E7EB",
                                color: "#111",
                                borderRadius: "999px",
                                padding: "12px 30px",
                                border: "none",
                            }}
                        >
                            📊 View Records
                        </Link>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default Dashboard;
