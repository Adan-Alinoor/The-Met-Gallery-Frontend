import { useEffect, useState } from 'react';
import './UserProfile.css';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import {useNavigate} from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For redirection after logging out

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const session = JSON.parse(localStorage.getItem('session'));
        const token = session && session.accessToken;
        console.log("Token:", token); 
        const response = await axios.get('http://127.0.0.1:5555/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    const username = user ? user.username : 'User'; // Get username for notification
    localStorage.removeItem('session');
    alert(`${username} logged out`); // Show alert message
    navigate('/login'); // Redirect to login page
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile: {error.message}</p>;

  if (!user) return <p>No user data available</p>;

  return (
    <div className="user-profile">
      <PersonIcon fontSize="large" color="action" style={{ fontSize: 50, color: '#a74caf' }}/>
      <h1>{user.username}</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserProfile;
