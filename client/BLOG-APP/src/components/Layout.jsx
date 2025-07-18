import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import './Layout.css';

export default function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/test-auth", {
          credentials: "include",
        });

        const data = await res.json();
        setIsLoggedIn(data.isLoggedIn);
      } catch (err) {
        console.error("Failed to check auth status", err);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();

    const handleLoginStatusChange = () => checkLoginStatus();

    window.addEventListener("login", handleLoginStatusChange);
    window.addEventListener("logout", handleLoginStatusChange);

    return () => {
      window.removeEventListener("login", handleLoginStatusChange);
      window.removeEventListener("logout", handleLoginStatusChange);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed", err);
    }

    localStorage.removeItem("isLoggedIn");
    window.dispatchEvent(new Event("logout"));
    navigate("/posts/login");
  };

  return (
    <div>
      <header className='header'>
        <div className="left">
          <Link to="/" className="logo">MyBlog</Link>
        </div>
        <div className="right">
          <nav>
            {isLoggedIn ? (
              <div className='header-links'>
                <button onClick={handleLogout}>Logout</button>
                <Link to="/posts/create">Create new post</Link>
              </div>
            ) : (
              <div className='header-links'>
                <Link to="/posts/login">Login</Link>
                <Link to="/posts/signup">Register</Link>
                <Link to="/posts/create">Create new post</Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="main-container">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="quick-links">
            <h4>Quick Links</h4>
            <Link to="/posts">Home</Link>
            <Link to="/about">About</Link>
            <Link to="mailto:urvashimehta552@gmail.com">Contact</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
          <div className="social-media">
            <h4>Follow Us</h4>
            <a href="mailto:urvashimehta552@gmail.com">urvashimehta552@gmail.com</a>
            <a href="https://www.linkedin.com/">LinkedIn</a>
            <a href="https://www.facebook.com/">Facebook</a>
            <a href="https://www.instagram.com/">Instagram</a>
            <a href="https://www.youtube.com/">YouTube</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
