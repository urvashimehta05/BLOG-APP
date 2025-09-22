import { useEffect, useState } from 'react';
import '../Home.css';
import '../Global.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import bannerImage from '../components/images/image.png';

const API_BASE = import.meta.env.VITE_BACKEND_URL;

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/api/posts`, { withCredentials: true });
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    (post.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.author || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.content || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-content">
      <div className="split-banner">
        <div className="banner-text">
          <h1>Welcome to MyBlog</h1>
          <p>Share your ideas with the world. Explore. Write. Inspire.</p>
          <button>Get Started</button>
        </div>
        <div className="banner-image">
          <img src={bannerImage} alt="Banner" />
        </div>
      </div>

      <div style={{ textAlign: 'center', margin: '20px' }}>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            width: '300px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />
      </div>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading posts...</p>
      ) : error ? (
        <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
      ) : (
        <div className="post-template">
          {filteredPosts.length === 0 ? (
            <p style={{ textAlign: 'center' }}>No posts found.</p>
          ) : (
            filteredPosts.map((post) => (
              <div key={post._id} className="post-card">
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    alt={post.title || "Blog Image"}
                    height="140"
                    image={post.image || "https://source.unsplash.com/300x140/?blog"}
                    onError={(e) => e.target.src = "https://source.unsplash.com/300x140/?blog"}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {post.title}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      By {post.author || "Anonymous"}
                    </Typography>
                  </CardContent>
                  <CardActions className='btn-group'>
                    <Button size="small" onClick={() => navigate(`/posts/view/${post._id}`)}>
                      View
                    </Button>
                  </CardActions>
                </Card>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
