import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include"
    })
      .then(() => {
        localStorage.removeItem("isLoggedIn"); // Clear login status
        navigate('/login'); // Redirect to login
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      });
  }, []);

  return null; // or a loading spinner/message if you want
}
