import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const { ProtectedRoute } = useAuth();
    const primaryColor = '#00796B'; 

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const res = await axios.get('/api/expenses');
            const sortedExpenses = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setExpenses(sortedExpenses);
        } catch (err) {
            alert('Error fetching expenses');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this expense? This cannot be undone.')) {
            try {
                await axios.delete(`/api/expenses/${id}`);
                fetchExpenses();
            } catch (err) {
                alert('Error deleting');
            }
        }
    };

    const handleEdit = (expense) => {
        setEditId(expense.id);
        setEditForm({ ...expense, date: expense.date ? expense.date.split('T')[0] : '' });
    };

    const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/expenses/${editId}`, editForm);
            setEditId(null);
            fetchExpenses();
        } catch (err) {
            alert('Error updating');
        }
    };

    return (
        <ProtectedRoute>
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="display-6 text-dark">Transaction Records</h2>
                    <Link to="/add-expense" className="btn" style={{ backgroundColor: primaryColor, color: 'white' }}>
                        ➕ Add New
                    </Link>
                </div>
                
                {expenses.length === 0 && (
                    <div className="alert alert-info text-center" role="alert">
                        No expenses recorded yet. <Link to="/add-expense" className="alert-link">Add your first one</Link>.
                    </div>
                )}

                <div className="row">
                    {expenses.map((expense) => (
                        <div key={expense.id} className="col-lg-4 col-md-6 mb-4">
                            <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '8px' }}>
                                {editId === expense.id ? (
                                    <div className="card-body">
                                        <form onSubmit={handleUpdate}>
                                            <input type="text" className="form-control mb-2" name="name" value={editForm.name || ''} onChange={handleEditChange} placeholder="Name" />
                                            <input type="number" className="form-control mb-2" name="amount" value={editForm.amount || ''} onChange={handleEditChange} placeholder="Amount" />
                                            <input type="date" className="form-control mb-2" name="date" value={editForm.date || ''} onChange={handleEditChange} />
                                            <textarea className="form-control mb-3" name="description" value={editForm.description || ''} onChange={handleEditChange} placeholder="Description" rows="2" />
                                            <button type="submit" className="btn btn-sm me-2" style={{ backgroundColor: primaryColor, color: 'white' }}>Save</button>
                                            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setEditId(null)}>Cancel</button>
                                        </form>
                                    </div>
                                ) : (
                                    <>
                                        <div className="card-body">
                                            <h5 className="card-title text-dark">{expense.name}</h5>
                                            <p className="card-text mb-1">
                                                <strong className="text-muted">Amount:</strong> <span className="fw-bold fs-5 text-danger">₹{expense.amount.toFixed(2)}</span>
                                            </p>
                                            <p className="card-text mb-1 text-muted small">
                                                <strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}
                                            </p>
                                            {expense.description && <p className="card-text small mt-2">{expense.description}</p>}
                                        </div>
                                        <div className="card-footer bg-light border-0 d-flex justify-content-end">
                                            <button onClick={() => handleEdit(expense)} className="btn btn-outline-secondary btn-sm me-2">Edit</button>
                                            <button onClick={() => handleDelete(expense.id)} className="btn btn-outline-danger btn-sm">Delete</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <Link to="/dashboard" className="btn btn-outline-secondary mt-4">Back to Dashboard</Link>
            </div>
        </ProtectedRoute>
    );
};

export default ExpenseList;