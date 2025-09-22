import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import '../View.css';
import '../Global.css';

const API_BASE = import.meta.env.VITE_BACKEND_URL;

export default function View() {
  const [post, setPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch current user and post in parallel
        const [userRes, postRes] = await Promise.all([
          axios.get(`${API_BASE}/api/test-auth`, { withCredentials: true }),
          axios.get(`${API_BASE}/api/posts/${id}`, { withCredentials: true })
        ]);

        setCurrentUser(userRes.data);
        setPost(postRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load post or not authorized.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE}/api/posts/${post._id}`, { withCredentials: true });
      navigate("/posts");
    } catch (err) {
      console.error("Error during delete:", err);
      setError('Failed to delete post.');
    }
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading post...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>{error}</p>;
  if (!post) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Post not found.</p>;

  const isOwner = currentUser && post.owner && currentUser._id === post.owner._id;

  return (
    <div className="card-detail">
      <Card sx={{ maxWidth: 600, margin: "2rem auto" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image={post.image || "https://source.unsplash.com/800x400/?technology"}
            alt={post.title}
            onError={(e) => { e.target.src = "https://source.unsplash.com/800x400/?technology"; }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography gutterBottom variant="subtitle2">
              Author: {post.owner?.username || "Anonymous"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.content}
            </Typography>

            {isOwner && (
              <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
                <Button variant="contained" color="error" onClick={handleDelete}>
                  Delete
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate(`/posts/update/${post._id}`)}
                >
                  Edit
                </Button>
              </div>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
