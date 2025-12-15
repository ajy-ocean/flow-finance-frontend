import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { ProtectedRoute } = useAuth();
    const primaryColor = '#00796B'; // Deep Cyan

    return (
        <ProtectedRoute>
            <div className="container py-5 text-center">
                <div className="d-flex flex-column align-items-center">
                    <div className="mb-4" style={{ fontSize: '4rem', color: primaryColor }}>
                        💰
                    </div>
                    <h1 className="mb-3 display-5 fw-bold text-dark">Welcome to Flow Finance</h1>
                    <p className="mb-5 text-muted lead">
                        Your central hub for tracking and managing your personal expenses efficiently.
                    </p>
                    <div className="d-flex gap-3">
                        <Link to="/add-expense" className="btn btn-lg shadow-sm" style={{ backgroundColor: primaryColor, color: 'white' }}>
                            ➕ Add New Expense
                        </Link>
                        <Link to="/expenses" className="btn btn-outline-secondary btn-lg" style={{ color: '#6c757d', borderColor: '#adb5bd' }}>
                            📊 View Records
                        </Link>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default Dashboard;