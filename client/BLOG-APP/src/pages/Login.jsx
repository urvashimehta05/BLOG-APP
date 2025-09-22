// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../Login.css';
import '../Global.css';

const API_BASE = import.meta.env.VITE_BACKEND_URL;

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error('Please enter username and password');
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Login request
      const res = await axios.post(
        `${API_BASE}/api/login`,
        { username, password },
        { withCredentials: true }
      );

      // 2️⃣ Verify session
      const authRes = await axios.get(`${API_BASE}/api/test-auth`, { withCredentials: true });

      if (authRes.data.isLoggedIn) {
        localStorage.setItem('isLoggedIn', 'true');
        toast.success('Login successful');
        window.dispatchEvent(new Event('login')); // optional global login event
        navigate('/posts');
      } else {
        toast.error('Login failed — session not established');
      }

    } catch (err) {
      console.error('Login error:', err.response || err);
      toast.error(err.response?.data?.message || 'Login request failed');
    } finally {
      setLoading(false);
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
        required
      />

      <input
        type='password'
        className='user-input'
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder='Password'
        required
      />

      <button
        onClick={handleLogin}
        className='submit'
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
}
