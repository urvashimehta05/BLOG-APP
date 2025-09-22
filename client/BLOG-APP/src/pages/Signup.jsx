import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../signup.css';
import '../Global.css';

const API_BASE = import.meta.env.VITE_BACKEND_URL;

export default function Signup() {
  const [signupForm, setSignupForm] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formChange = (event) => {
    const { name, value } = event.target;
    setSignupForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { username, email, password } = signupForm;

    try {
      const res = await axios.post(
        `${API_BASE}/api/signup`,
        { username, email, password },
        { withCredentials: true }
      );

      toast.success('Signup successful! Please log in.');
      navigate('/posts/login');
    } catch (err) {
      console.error('Signup error:', err.response || err);
      toast.error(err.response?.data?.error || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='signup-form'>
      <form onSubmit={handleSubmit}>
        <h2>Sign up</h2>

        <label htmlFor='username'>Username</label>
        <input
          type='text'
          name='username'
          placeholder='Enter username'
          value={signupForm.username}
          id='username'
          onChange={formChange}
          required
        />

        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          placeholder='Enter your email'
          value={signupForm.email}
          id='email'
          onChange={formChange}
          required
        />

        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          placeholder='Enter your password'
          value={signupForm.password}
          id='password'
          onChange={formChange}
          required
        />

        <button type='submit' id='submit' disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
