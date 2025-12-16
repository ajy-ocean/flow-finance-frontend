import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);
    const { ProtectedRoute } = useAuth();

    const colors = { bg: '#F0F2F5', primary: '#00BFA6' };

    useEffect(() => { fetchExpenses(); }, []);

    const fetchExpenses = async () => {
        try {
            const res = await axios.get('/api/expenses');
            setExpenses(res.data.sort((a,b)=>new Date(b.date)-new Date(a.date)));
        } catch { alert('Error fetching expenses'); }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this expense?')) {
            try { await axios.delete(`/api/expenses/${id}`); fetchExpenses(); } catch { alert('Error deleting'); }
        }
    };

    return (
        <ProtectedRoute>
            <Navbar />
            <div style={{ background: colors.bg, minHeight: '100vh', padding: '3rem' }}>
                <h2 style={{ color: '#111', marginBottom: '2rem' }}>Transaction Records</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: '1.5rem' }}>
                    {expenses.map(expense => (
                        <div key={expense.id} style={{
                            borderRadius: '20px',
                            background: '#fff',
                            boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
                            padding: '1.5rem',
                            transition: '0.3s',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={e=>e.currentTarget.style.transform='translateY(-5px)'}
                        onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}
                        >
                            <h4 style={{ color: colors.primary, marginBottom: '0.5rem' }}>{expense.name}</h4>
                            <p style={{ fontWeight: 500 }}>₹{expense.amount.toFixed(2)}</p>
                            <p style={{ fontSize: '0.9rem', color: '#888' }}>{new Date(expense.date).toLocaleDateString()}</p>
                            {expense.description && <p style={{ fontSize: '0.85rem', color: '#555' }}>{expense.description}</p>}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '10px' }}>
                                <button style={{ padding: '5px 12px', borderRadius: '999px', border: 'none', background: colors.primary, color: '#fff', cursor: 'pointer' }}>Edit</button>
                                <button onClick={()=>handleDelete(expense.id)} style={{ padding: '5px 12px', borderRadius: '999px', border: 'none', background: '#FF4D4D', color: '#fff', cursor: 'pointer' }}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default ExpenseList;