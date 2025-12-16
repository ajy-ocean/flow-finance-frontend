import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const { ProtectedRoute } = useAuth();

    const colors = {
        primary: '#00796B',
        bg: '#F4F7F8',
        card: '#FFFFFFF0',
        shadow: '0 10px 25px rgba(0,0,0,0.08)',
    };

    useEffect(() => { fetchExpenses(); }, []);

    const fetchExpenses = async () => {
        try {
            const res = await axios.get('/api/expenses');
            const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setExpenses(sorted);
        } catch {
            alert('Error fetching expenses');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this expense?')) {
            try {
                await axios.delete(`/api/expenses/${id}`);
                fetchExpenses();
            } catch {
                alert('Error deleting');
            }
        }
    };

    const handleEdit = (expense) => {
        setEditId(expense.id);
        setEditForm({ ...expense, date: expense.date.split('T')[0] });
    };

    const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/expenses/${editId}`, editForm);
            setEditId(null);
            fetchExpenses();
        } catch {
            alert('Error updating');
        }
    };

    return (
        <ProtectedRoute>
            <div style={{ background: colors.bg, minHeight: '100vh', padding: '40px 20px' }}>
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                    <h2 className="text-dark">Transaction Records</h2>
                    <Link to="/add-expense" className="btn" style={{ backgroundColor: colors.primary, color: 'white', borderRadius: '999px', padding: '8px 20px', border: 'none' }}>
                        ➕ Add New
                    </Link>
                </div>

                {expenses.length === 0 ? (
                    <div className="text-center mt-5 text-muted">No expenses recorded yet.</div>
                ) : (
                    <div className="row g-4">
                        {expenses.map(expense => (
                            <div key={expense.id} className="col-lg-4 col-md-6">
                                <div style={{ borderRadius: '16px', background: colors.card, boxShadow: colors.shadow, padding: '20px' }}>
                                    {editId === expense.id ? (
                                        <form onSubmit={handleUpdate}>
                                            <input type="text" className="form-control mb-2" name="name" value={editForm.name || ''} onChange={handleEditChange} />
                                            <input type="number" className="form-control mb-2" name="amount" value={editForm.amount || ''} onChange={handleEditChange} />
                                            <input type="date" className="form-control mb-2" name="date" value={editForm.date || ''} onChange={handleEditChange} />
                                            <textarea className="form-control mb-3" name="description" value={editForm.description || ''} onChange={handleEditChange} rows="2" />
                                            <div className="d-flex justify-content-end gap-2">
                                                <button type="submit" className="btn btn-sm" style={{ backgroundColor: colors.primary, color: 'white' }}>Save</button>
                                                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setEditId(null)}>Cancel</button>
                                            </div>
                                        </form>
                                    ) : (
                                        <>
                                            <h5 className="text-dark">{expense.name}</h5>
                                            <p className="mb-1"><strong>Amount:</strong> ₹{expense.amount.toFixed(2)}</p>
                                            <p className="mb-1 text-muted"><strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
                                            {expense.description && <p className="small">{expense.description}</p>}
                                            <div className="d-flex justify-content-end gap-2 mt-2">
                                                <button onClick={() => handleEdit(expense)} className="btn btn-outline-secondary btn-sm">Edit</button>
                                                <button onClick={() => handleDelete(expense.id)} className="btn btn-outline-danger btn-sm">Delete</button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </ProtectedRoute>
    );
};

export default ExpenseList;