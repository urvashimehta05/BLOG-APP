import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_BACKEND_URL;

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post(`${API_BASE}/api/logout`, {}, { withCredentials: true });
        localStorage.removeItem("isLoggedIn");
        navigate('/login');
      } catch (err) {
        console.error("Logout failed:", err);
      }
    };

    logout();
  }, []);

  return null;
}
