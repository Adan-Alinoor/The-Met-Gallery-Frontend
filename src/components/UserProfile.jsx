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
        const token = localStorage.getItem('access_token'); // Assuming you store token in local storage
        console.log("Token:", token); 
        const response = await axios.get('http://127.0.0.1:5555/userprofile', {
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
    localStorage.removeItem('access_token'); // Clear the token on logout
    console.log("User logged out");
    // Redirect to login or another page if needed
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile: {error.message}</p>;

  if (!user) return <p>No user data available</p>;

  return (
    <div className="user-profile">
      <img src={user.profilePicture} alt="Profile" className="profile-picture" />
      <h1>{user.name}</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Bio:</strong> {user.bio || 'No bio available'}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserProfile;
