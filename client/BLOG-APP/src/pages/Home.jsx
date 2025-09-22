import { useEffect, useState } from 'react';
import '../Home.css';
import { useNavigate } from 'react-router-dom';
import bannerImage from '../components/images/image.png';
import '../Global.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const API_BASE = import.meta.env.VITE_BACKEND_URL;
function Home() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

useEffect(() => {
  fetch(`${API_BASE}/api/posts`, {
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((data) => setPosts(data))
    .catch((err) => console.error('Error fetching posts:', err));
}, []);
  const filteredPosts = posts.filter((post) =>
    (post.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.author || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.content || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const handleDelete = async (id) => {
  //   const confirmDelete = window.confirm("Are you sure you want to delete this post?");
  //   if (!confirmDelete) return;

  //   const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
  //     method: 'DELETE'
  //   });

  //   if (res.ok) {
  //     setPosts(posts.filter(post => post._id !== id));
  //   } else {
  //     console.error("Failed to delete post");
  //   }
  // };

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

      {/* Optional Search Bar */}
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

      <div className="post-template">
        {filteredPosts.length === 0 ? (
          <p>Loading...</p>
        ) : (
          filteredPosts.map((post) => (
            <div key={post._id} className="post-card">
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt={post.title || "Blog Image"}
                  height="140"
                  image={post.image}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    By {post.author}
                  </Typography>
                </CardContent>
                <CardActions className='btn-group'>
                  {/* <Button size="small" onClick={() => handleDelete(post._id)}>Delete</Button>
                  <Button size="small" onClick={() => navigate(`/posts/update/${post._id}`)}>Edit</Button> */}
                  <Button size="small" onClick={() => navigate(`/posts/view/${post._id}`)}>View</Button>
                </CardActions>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;

