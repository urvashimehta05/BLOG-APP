import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../Create.css';
import '../Global.css';

const API_BASE = import.meta.env.VITE_BACKEND_URL;

export default function Create() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

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

    if (!formData.title || !formData.content) {
      toast.error("Title and content are required!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${API_BASE}/api/posts`,
        { post: formData },
        { withCredentials: true }
      );

      toast.success("Post created successfully!");
      navigate('/posts');

    } catch (err) {
      console.error("Error submitting post:", err.response || err);
      toast.error(err.response?.data?.error || "Failed to create post.");
    } finally {
      setLoading(false);
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
            required
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
            required
          />
        </div>
        <br />

        <div className='form-label'>
          <label htmlFor='image'>Image URL</label>
          <input
            id='image'
            name='image'
            value={formData.image}
            onChange={handleChange}
            placeholder='Enter image URL'
          />
        </div>
        <br />

        <button type='submit' className='submit' disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </>
  );
}
