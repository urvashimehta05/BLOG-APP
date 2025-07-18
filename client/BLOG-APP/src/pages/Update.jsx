import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../Update.css'
export default function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: ''
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${id}`, {
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          title: data.title || '',
          content: data.content || '',
          image: data.image || ''
        });
      })
      .catch((err) => {
        console.error('Error fetching post:', err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:5000/api/posts/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      navigate(`/posts/view/${id}`);
    } else {
      console.error("Failed to update post");
    }
  };

  return (
    <div className='update-form'>
      <h2>Update Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Content:</label>
          <textarea
            name="content"id="content"
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
            id="text"
            value={formData.image}
            onChange={handleChange}
            placeholder="e.g. https://source.unsplash.com/random"
          />
        </div>

        <button type="submit"id="submit">Update</button>
      </form>

      {/* {formData.image && (
        <div style={{ marginTop: "1rem" }}>
          <p>Preview:</p>
          <img
            src={formData.image}
            alt="Preview"
            style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>
      )} */}
    </div>
  );
}
