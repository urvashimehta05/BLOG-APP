import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import '../View.css';
import '../Global.css'
export default function View() {
  const [post, setPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch("http://localhost:5000/api/test-auth", {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then(data => setCurrentUser(data))
      .catch(err => {
        console.error("Error fetching current user:", err);
        setCurrentUser(null);
      });
  }, []);

  // Fetch post
  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${id}`, {
      credentials: 'include',
    })
      .then(res => {
        if (res.status === 401) {
          throw new Error("Unauthorized. Please login.");
        }
        return res.json();
      })
      .then(data => setPost(data))
      .catch((err) => {
        console.error('Error fetching post:', err);
        navigate("/posts/login");
      });
  }, [id, navigate]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/posts/${post._id}`, {
        method: 'DELETE',
        credentials: "include",
      });

      if (res.ok) {
        navigate("/posts");
      } else {
        console.error("Failed to delete post");
      }
    } catch (err) {
      console.error("Error during delete:", err);
    }
  };

  if (!post) {
    return <p>Loading post...</p>;
  }

  const isOwner = currentUser && post.owner && currentUser._id === post.owner._id;

  return (
    <div className="card-detail">
      <Card sx={{ maxWidth: 600, margin: "0 auto" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image={post.image || "https://source.unsplash.com/800x400/?technology"}
            alt={post.title}
            onError={(e) => {
              e.target.src = "https://source.unsplash.com/800x400/?technology";
            }}
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
