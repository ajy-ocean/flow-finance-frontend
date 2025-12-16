import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [formData,setFormData]=useState({username:'',password:'',email:'',fullName:''});
    const [showPassword,setShowPassword]=useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const colors={ primary:'#00BFA6', bg:'#F0F2F5', card:'#fff'};

    const handleChange=e=>setFormData({...formData,[e.target.name]:e.target.value});
    const handleSubmit=async e=>{
        e.preventDefault();
        try {
            const res=await axios.post('/api/user/register',formData);
            login(res.data.accessToken);
            navigate('/dashboard');
        } catch { alert('Registration failed'); }
    };

    const inputStyle={ borderRadius:'12px', border:'1px solid #ccc', padding:'12px', width:'100%', marginBottom:'15px', outline:'none', boxShadow:'0 2px 8px rgba(0,0,0,0.05)'};
    const buttonStyle={ borderRadius:'999px', padding:'12px 25px', border:'none', backgroundColor:colors.primary, color:'#fff', fontWeight:500, cursor:'pointer', boxShadow:'0 6px 18px rgba(0,191,166,0.35)'};

    return (
        <div style={{ background: colors.bg, minHeight:'100vh', display:'flex', justifyContent:'center', alignItems:'center', padding:'20px' }}>
            <div style={{ maxWidth:'450px', width:'100%', background:colors.card, borderRadius:'20px', padding:'3rem', boxShadow:'0 12px 24px rgba(0,0,0,0.08)' }}>
                <h2 style={{ textAlign:'center', color:colors.primary, marginBottom:'2rem' }}>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    {['fullName','email','username'].map(field=>(
                        <input key={field} type={field==='email'?'email':'text'} name={field} placeholder={field==='fullName'?'Full Name':field.charAt(0).toUpperCase()+field.slice(1)} onChange={handleChange} required style={inputStyle}/>
                    ))}
                    <div style={{ position:'relative' }}>
                        <input type={showPassword?'text':'password'} name="password" placeholder="Password" onChange={handleChange} required style={inputStyle}/>
                        <span onClick={()=>setShowPassword(!showPassword)} style={{ position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)', cursor:'pointer', color:'#888' }}>{showPassword?'Hide':'Show'}</span>
                    </div>
                    <button type="submit" style={buttonStyle}>Sign Up</button>
                </form>
                <p style={{ textAlign:'center', marginTop:'1rem', color:'#555' }}>Already have an account? <Link to="/" style={{ color: colors.primary }}>Sign In</Link></p>
            </div>
        </div>
    );
};

export default Register;