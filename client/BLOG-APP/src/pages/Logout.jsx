import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const API_BASE = import.meta.env.VITE_BACKEND_URL;
export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/logout`, {
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
