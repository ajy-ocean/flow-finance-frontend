import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);
    const { logout } = useAuth();

    const colors = { primary: "#00796B", bg: "#F4F7F8", shadow: "0 8px 25px rgba(0,0,0,0.08)" };

    useEffect(() => { fetchExpenses(); }, []);

    const fetchExpenses = async () => {
        try {
            const response = await axios.get('/api/expenses');
            setExpenses(response.data);
        } catch (error) {
            if (error.response && error.response.status !== 401) alert('Failed to load transactions.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            try {
                await axios.delete(`/api/expenses/${id}`);
                fetchExpenses();
                alert('Transaction deleted successfully!');
            } catch {
                alert('Failed to delete transaction.');
            }
        }
    };

    const getCardStyle = (type) => ({
        borderColor: type?.toLowerCase() === 'income' ? '#28A745' : '#DC3545',
        backgroundColor: type?.toLowerCase() === 'income' ? '#D4EDDA' : '#F8D7DA',
        icon: type?.toLowerCase() === 'income' ? '💰' : '💸'
    });

    return (
        <div style={{ background: colors.bg, minHeight: '100vh', padding: '40px 20px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                <h2 className="text-dark">Transaction History</h2>
                <div className="d-flex gap-2">
                    <Link 
                        to="/add-expense" 
                        className="btn" 
                        style={{ background: colors.primary, color: "white", borderRadius: "999px", padding: "8px 20px", border: "none" }}
                    >
                        + Add New Transaction
                    </Link>
                    <button 
                        onClick={logout} 
                        className="btn" 
                        style={{ background: "#E5E7EB", borderRadius: "999px", border: "none", color: "#111", padding: "8px 20px" }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {expenses.length === 0 ? (
                <div className="text-center" style={{ marginTop: '50px', color: '#6B7280' }}>
                    No transactions recorded yet. <Link to="/add-expense" style={{ color: colors.primary }}>Add your first transaction!</Link>
                </div>
            ) : (
                <div className="row g-4">
                    {expenses.map(expense => {
                        const style = getCardStyle(expense.type);
                        return (
                            <div key={expense.id} className="col-lg-6 col-md-12">
                                <div style={{ borderRadius: '16px', background: '#fff', boxShadow: colors.shadow, borderLeft: `5px solid ${style.borderColor}`, padding: '20px' }}>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h5>{style.icon} {expense.name}</h5>
                                        <span style={{ color: style.borderColor, fontWeight: '600' }}>
                                            {expense.type === 'Income' ? '+' : '-'} ₹{expense.amount.toFixed(2)}
                                        </span>
                                    </div>
                                    <p style={{ color: '#6B7280', marginBottom: '10px' }}>{expense.category}</p>
                                    <small style={{ color: '#6B7280' }}>{new Date(expense.date).toLocaleDateString()}</small>
                                    <div className="d-flex gap-2 mt-3">
                                        {/* Edit button now passes expense ID as query param */}
                                        <Link 
                                            to={`/add-expense?id=${expense.id}`} 
                                            style={{ background: "#FBBF24", borderRadius: '999px', padding: '6px 16px', color: '#111', textDecoration: 'none' }}
                                        >
                                            ✏️ Edit
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(expense.id)} 
                                            style={{ background: "#EF4444", borderRadius: '999px', padding: '6px 16px', color: 'white', border: 'none' }}
                                        >
                                            🗑️ Delete
                                        </button>
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
