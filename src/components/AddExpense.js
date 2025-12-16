import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';

const AddExpense = () => {
    const [formData, setFormData] = useState({ name: '', amount: '', date: '', description: '' });
    const [focusedField, setFocusedField] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { ProtectedRoute } = useAuth();

    const colors = { primary: '#00BFA6', bg: '#F0F2F5' };

    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    useEffect(() => {
        if (id) {
            axios.get(`/api/expenses/${id}`)
                .then(res => setFormData(res.data))
                .catch(() => alert('Failed to load expense data.'));
        }
    }, [id]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) await axios.put(`/api/expenses/${id}`, formData);
            else await axios.post('/api/expenses', formData);
            navigate('/expenses');
        } catch {
            alert('Something went wrong');
        }
    };

    const inputStyle = (field) => ({
        borderRadius: '12px',
        border: '1px solid #ccc',
        padding: '12px',
        width: '100%',
        marginBottom: '15px',
        transition: '0.3s',
        outline: 'none',
        boxShadow: focusedField === field ? '0 0 8px rgba(0,191,166,0.35)' : '0 2px 8px rgba(0,0,0,0.05)'
    });

    const buttonStyle = {
        borderRadius: '999px',
        padding: '12px 25px',
        border: 'none',
        backgroundColor: colors.primary,
        color: '#fff',
        fontWeight: 500,
        cursor: 'pointer',
        transition: '0.2s',
        boxShadow: '0 6px 18px rgba(0,191,166,0.35)'
    };

    return (
        <ProtectedRoute>
            <Navbar />
            <div style={{ background: colors.bg, minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem' }}>
                <div style={{ maxWidth: '600px', width: '100%', background: '#fff', borderRadius: '20px', boxShadow: '0 12px 24px rgba(0,0,0,0.08)', padding: '2rem' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#00BFA6' }}>{id ? 'Edit Expense' : 'Record New Expense'}</h2>
                    <form onSubmit={handleSubmit}>
                        {['name','amount','date','description'].map(field => (
                            field === 'description' ? 
                            <textarea key={field} rows="3" name={field} value={formData[field]} onChange={handleChange} placeholder="Description (optional)" style={inputStyle(field)} onFocus={() => setFocusedField(field)} onBlur={() => setFocusedField(null)} /> :
                            <input key={field} type={field==='amount'?'number':field==='date'?'date':'text'} name={field} value={formData[field]} onChange={handleChange} placeholder={field==='name'?'Expense Name':field==='amount'?'Amount':'Date'} style={inputStyle(field)} required onFocus={() => setFocusedField(field)} onBlur={() => setFocusedField(null)} />
                        ))}
                        <button type="submit" style={buttonStyle}>{id ? 'Update Transaction' : 'Save Transaction'}</button>
                    </form>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default AddExpense;