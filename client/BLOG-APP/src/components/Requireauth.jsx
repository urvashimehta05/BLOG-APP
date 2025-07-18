import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function RequireAuth({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/test-auth', {
          credentials: 'include',
        });
        const data = await res.json();

        setIsAuthenticated(data.isLoggedIn);

        if (!data.isLoggedIn) {
          toast.error("You must be logged in to continue");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        toast.error("Could not verify login status");
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <p>Checking authentication...</p>; // or a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/posts/login" state={{ from: location }} replace />;
  }

  return children;
}
