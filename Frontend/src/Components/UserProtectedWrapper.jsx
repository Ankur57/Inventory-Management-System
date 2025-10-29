import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProtectWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/profile`,
          { withCredentials: true } // ✅ send cookies automatically
        );

        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log("Inside UserProtectWrapper------------------------------------ ")
        console.log("Unauthorized:", error);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : null;
};

export default UserProtectWrapper;
