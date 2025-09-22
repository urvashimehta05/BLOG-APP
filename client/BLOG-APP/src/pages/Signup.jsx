import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../signup.css';
import '../Global.css'
export default function Signup() {
  const [signupForm, setSignupForm] = useState({
    username: '',
    email: '',
    password: ''
  });

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
    const { username, email, password } = signupForm;

    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        credentials: 'include', 
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Signup successful! Please log in.');
        navigate('/posts/login');
      } else {
        console.error('Signup error:', data);
        toast.error(data.error || 'Signup failed');
      }
    } catch (err) {
      console.error('Error during signup:', err);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className='signup-form'>
      <form onSubmit={handleSubmit}>
        <h2>Sign up </h2>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          name='username'
          placeholder='Enter username'
          value={signupForm.username}
          id='username'
          onChange={formChange}
        />
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          placeholder='Enter your email'
          value={signupForm.email}
          id='email'
          onChange={formChange}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          placeholder='Enter your password'
          value={signupForm.password}
          id='password'
          onChange={formChange}
        />
        <button type='submit'id="submit">Sign Up</button>
      </form>
    </div>
  );
}
