import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Dashboard = () => {
    const colors = { primary: "#00BFA6", bg: "#F0F2F5" };

    return (
        <>
            <Navbar />
            <div style={{
                background: colors.bg,
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '3rem'
            }}>
                <div style={{ maxWidth: '800px', width: '100%', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 700, color: colors.primary, marginBottom: '1rem' }}>💰 Flow Finance</h1>
                    <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '2rem' }}>
                        Track your personal expenses in a clean and modern way.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Link to="/add-expense" style={{
                            padding: '1rem 2rem',
                            borderRadius: '999px',
                            background: colors.primary,
                            color: '#fff',
                            fontWeight: 500,
                            fontSize: '1rem',
                            boxShadow: '0 8px 20px rgba(0,191,166,0.35)',
                            transition: '0.2s',
                            textDecoration: 'none'
                        }}>➕ Add New Expense</Link>
                        <Link to="/expenses" style={{
                            padding: '1rem 2rem',
                            borderRadius: '999px',
                            background: '#E0E5EC',
                            color: '#111',
                            fontWeight: 500,
                            fontSize: '1rem',
                            textDecoration: 'none'
                        }}>📊 View Records</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;