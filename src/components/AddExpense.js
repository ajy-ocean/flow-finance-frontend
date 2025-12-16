import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AddExpense = () => {
    const [formData, setFormData] = useState({ name: '', amount: '', date: '', description: '' });
    const navigate = useNavigate();
    const { ProtectedRoute } = useAuth();
    const primaryColor = '#00796B'; 

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/expenses', formData);
            alert('Expense recorded successfully!');
            navigate('/expenses');
        } catch (err) {
            alert('Error recording expense: ' + (err.response?.data || 'Error'));
        }
    };

    return (
        <ProtectedRoute>
            <div className="d-flex justify-content-center align-items-center p-3">
                <div className="card shadow-lg p-4 mt-5 w-100" style={{ maxWidth: '600px', borderRadius: '8px' }}>
                    <h2 className="text-center mb-4 text-dark">Record New Expense</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label text-muted">Expense Name</label>
                            <input type="text" className="form-control form-control-lg" name="name" onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-muted">Amount (₹)</label>
                            <input type="number" className="form-control form-control-lg" name="amount" onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-muted">Date</label>
                            <input type="date" className="form-control form-control-lg" name="date" onChange={handleChange} required />
                        </div>
                        <div className="mb-4">
                            <label className="form-label text-muted">Description (Optional)</label>
                            <textarea className="form-control" name="description" onChange={handleChange} rows="3" />
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-lg" style={{ backgroundColor: primaryColor, color: 'white' }}>
                                Save Transaction
                            </button>
                            <Link to="/dashboard" className="btn btn-outline-secondary btn-lg">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default AddExpense;