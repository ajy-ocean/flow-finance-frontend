import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);
    const { logout } = useAuth();
    const primaryColor = '#00796B'; // Teal/Green for primary actions

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            // JWT CRITICAL: The Authorization header is automatically attached by AuthContext
            const response = await axios.get('/api/expenses');
            setExpenses(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
            // The AuthContext interceptor should handle 401, but we can catch others:
            if (error.response && error.response.status !== 401) {
                alert('Failed to load transactions.');
            }
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            try {
                await axios.delete(`/api/expenses/${id}`);
                fetchExpenses(); // Refresh the list
                alert('Transaction deleted successfully!');
            } catch (error) {
                console.error('Error deleting transaction:', error);
                alert('Failed to delete transaction.');
            }
        }
    };

    // Helper to determine color and icon based on type
    const getCardStyle = (type) => {
        if (type && type.toLowerCase() === 'income') {
            return {
                borderColor: '#28A745', // Green
                backgroundColor: '#D4EDDA', // Light Green background
                icon: '💰'
            };
        }
        return {
            borderColor: '#DC3545', // Red
            backgroundColor: '#F8D7DA', // Light Red background
            icon: '💸'
        };
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-dark">Transaction History</h2>
                <div>
                    {/* 🔑 FIX 2: Updated Link to /add-expense */}
                    <Link to="/add-expense" className="btn btn-sm me-2 text-white" style={{ backgroundColor: primaryColor }}>
                        + Add New Transaction
                    </Link>
                    <button onClick={logout} className="btn btn-sm btn-outline-secondary">
                        Logout
                    </button>
                </div>
            </div>

            {expenses.length === 0 ? (
                <div className="alert alert-info text-center mt-5">
                    No transactions recorded yet. <Link to="/add-expense">Add your first transaction!</Link>
                </div>
            ) : (
                <div className="row">
                    {expenses.map((expense) => {
                        const style = getCardStyle(expense.type);
                        
                        return (
                            <div key={expense.id} className="col-lg-6 col-md-12 mb-4">
                                <div className="card shadow-sm h-100" style={{ borderLeft: `5px solid ${style.borderColor}`, backgroundColor: style.backgroundColor }}>
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h5 className="card-title text-dark">
                                                {style.icon} {expense.name}
                                            </h5>
                                            <div className="text-end">
                                                {/* 🔑 FIX 1: Changed $ to ₹ */}
                                                <h4 style={{ color: style.borderColor, marginBottom: '0' }}>
                                                    {expense.type === 'Income' ? '+' : '-'} ₹{expense.amount.toFixed(2)}
                                                </h4>
                                                <small className="text-muted">{new Date(expense.date).toLocaleDateString()}</small>
                                            </div>
                                        </div>
                                        <p className="card-text mb-2 mt-2 text-muted">
                                            {expense.category}
                                        </p>

                                        {/* --- MODERN BUTTONS --- */}
                                        <div className="d-flex justify-content-end mt-3">
                                            <Link 
                                                to={`/add-expense?id=${expense.id}`} 
                                                className="btn btn-sm me-2" 
                                                style={{ backgroundColor: '#FFC107', color: '#333', borderColor: '#FFC107' }}
                                            >
                                                ✏️ Edit
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(expense.id)} 
                                                className="btn btn-sm text-white" 
                                                style={{ backgroundColor: '#DC3545', borderColor: '#DC3545' }}
                                            >
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ExpenseList;