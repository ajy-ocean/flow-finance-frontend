import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [showPassword,setShowPassword]=useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const colors = { primary:'#00BFA6', bg:'#F0F2F5', card:'#fff' };

    const handleSubmit=async e=>{
        e.preventDefault();
        try {
            const res = await axios.post('/api/user/login',{username,password});
            login(res.data.accessToken);
            navigate('/dashboard');
        } catch { alert('Invalid Credentials'); }
    };

    const inputStyle={ borderRadius:'12px', border:'1px solid #ccc', padding:'12px', width:'100%', marginBottom:'15px', outline:'none', boxShadow:'0 2px 8px rgba(0,0,0,0.05)'};
    const buttonStyle={ borderRadius:'999px', padding:'12px 25px', border:'none', backgroundColor:colors.primary, color:'#fff', fontWeight:500, cursor:'pointer', boxShadow:'0 6px 18px rgba(0,191,166,0.35)'};

    return (
        <div style={{ background: colors.bg, minHeight:'100vh', display:'flex', justifyContent:'center', alignItems:'center', padding:'20px' }}>
            <div style={{ maxWidth:'450px', width:'100%', background:colors.card, borderRadius:'20px', padding:'3rem', boxShadow:'0 12px 24px rgba(0,0,0,0.08)' }}>
                <h2 style={{ textAlign:'center', color:colors.primary, marginBottom:'2rem' }}>Flow Finance Login</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} required style={inputStyle}/>
                    <div style={{ position:'relative' }}>
                        <input type={showPassword?'text':'password'} placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required style={inputStyle}/>
                        <span onClick={()=>setShowPassword(!showPassword)} style={{ position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)', cursor:'pointer', color:'#888' }}>{showPassword?'Hide':'Show'}</span>
                    </div>
                    <button type="submit" style={buttonStyle}>Sign In</button>
                </form>
                <p style={{ textAlign:'center', marginTop:'1rem', color:'#555' }}>New user? <Link to="/register" style={{ color: colors.primary }}>Sign Up</Link></p>
            </div>
        </div>
    );
};

export default Login;