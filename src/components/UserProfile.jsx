import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    localStorage.removeItem('session');
    console.log("User logged out");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile: {error.message}</p>;

  if (!user) return <p>No user data available</p>;

  return (
    <div className="user-profile">
      <img src={user.profilePicture} alt="Profile" className="profile-picture" />
      <h1>{user.username}</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserProfile;
