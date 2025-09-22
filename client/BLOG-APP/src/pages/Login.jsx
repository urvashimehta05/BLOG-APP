// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../Login.css';
import '../Global.css'
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
const API_BASE = import.meta.env.VITE_BACKEND_URL;
  const handleLogin = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // sends cookie
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ Verify that session was actually set on server
      const authRes = await fetch(`${API_BASE}/api/test-auth`, {
        method: 'GET',
        credentials: 'include'
      });

      const authData = await authRes.json();
      console.log("Auth check after login:", authData);

      if (authData.isLoggedIn) {
        localStorage.setItem('isLoggedIn', 'true');
        toast.success('Login successful');
        window.dispatchEvent(new Event('login'));
        navigate('/posts');
      } else {
        toast.error("Login failed — session not established");
      }
    } else {
      console.error('Login error:', data);
      toast.error(data.message || 'Login failed');
    }
  } catch (err) {
    console.error('Error during login:', err);
    toast.error('Login request failed');
  }
};


  return (
    <div className='login-page'>
      <h2 className='login-h1'>Login</h2>
      <input
        type='text'
        className='user-input'
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder='Username'
      />
      <input
        type='password'
        className='user-input'
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder='Password'
      />
      <button onClick={handleLogin} className='submit'>
        Login
      </button>
    </div>
  );
}