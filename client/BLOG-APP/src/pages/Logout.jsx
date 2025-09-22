import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/logout", {
      method: "POST",
      mode: 'cors',
      credentials: "include"
    })
      .then(() => {
        localStorage.removeItem("isLoggedIn"); 
        navigate('/login'); 
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      });
  }, []);

  return null; 
}
