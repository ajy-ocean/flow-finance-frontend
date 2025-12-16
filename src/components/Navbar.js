import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { logout } = useAuth();
    const colors = { primary: '#00BFA6', bg: '#F0F2F5', text: '#111' };

    return (
        <nav style={{
            background: colors.bg,
            padding: '0.8rem 2rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <Link to="/dashboard" style={{ fontWeight: 700, fontSize: '1.5rem', color: colors.primary, textDecoration: 'none' }}>FlowFinance</Link>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <Link to="/add-expense" style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '999px',
                    background: colors.primary,
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: '0.2s',
                    boxShadow: '0 4px 12px rgba(0,191,166,0.35)'
                }}>Add Expense</Link>
                <Link to="/expenses" style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '999px',
                    background: '#E0E5EC',
                    color: '#111',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: '0.2s'
                }}>Records</Link>
                <button onClick={logout} style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '999px',
                    background: '#FF4D4D',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 500,
                    transition: '0.2s'
                }}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
