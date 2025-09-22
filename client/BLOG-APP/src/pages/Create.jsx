import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Create.css';
import { toast } from 'react-toastify';
import '../Global.css'
export default function Create() {
  const API_BASE = import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date: "",
    image: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
         credentials: 'include', 
         mode: 'cors',
      body: JSON.stringify({ post: formData })
      });

      if (res.ok) {
        navigate('/posts');
      } else {
        const errorData = await res.json();
      }
    } catch (err) {
      console.error("Error submitting post:", err);
    }
  };

  return (
    <>
    <h1 className='new-post'>Add New Post</h1>
    <form onSubmit={handleSubmit} className='form-container'>
      <div className='form-label'>
        <label htmlFor='title'>Title</label>
        <textarea
          id='title'
          name='title'
          value={formData.title}
          onChange={handleChange}
          placeholder='Enter title'
        />
      </div>
      <br />

      <div className='form-label'>
        <label htmlFor='content'>Content</label>
        <textarea
          id='content'
          name='content'
          value={formData.content}
          onChange={handleChange}
          placeholder='Enter content'
        />
      </div>
      <br />

      <div className='form-label'>
        <label htmlFor='image'>Image</label>
        <input
          id='image'
          name='image'
          value={formData.image}
          onChange={handleChange}
          placeholder='Enter image URL'
        />
      </div>
      <br />

      <button type='submit' className='submit'>Submit</button>
    </form>
    </>
  );
}

