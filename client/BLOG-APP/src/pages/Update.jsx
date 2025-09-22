import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../Update.css';

// Backend base URL from .env
const API_BASE = import.meta.env.VITE_BACKEND_URL;

export default function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/posts/${id}`, { withCredentials: true });
        setFormData({
          title: res.data.title || '',
          content: res.data.content || '',
          image: res.data.image || ''
        });
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE}/api/posts/update/${id}`, formData, { withCredentials: true });
      navigate(`/posts/view/${id}`);
    } catch (err) {
      console.error('Failed to update post:', err);
      setError('Failed to update post. Please try again.');
    }
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading post...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>{error}</p>;

  return (
    <div className='update-form'>
      <h2>Update Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={6}
            required
          />
        </div>

        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="e.g. https://source.unsplash.com/random"
          />
        </div>

        <button type="submit">Update</button>
      </form>

      {/* Live Image Preview */}
      {formData.image && (
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <p>Preview:</p>
          <img
            src={formData.image}
            alt="Preview"
            style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>
      )}
    </div>
  );
}
