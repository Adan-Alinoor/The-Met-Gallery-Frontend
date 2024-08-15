import React, { useEffect, useState } from 'react';
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
    window.location.reload(); // Reload page to reflect logout
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-danger">Error loading profile: {error.message}</div>;

  if (!user) return <div className="text-center">No user data available</div>;

  const getProfileIcon = () => {
    switch (user.gender) {
      case 'male':
        return 'fas fa-male'; // Font Awesome male icon
      case 'female':
        return 'fas fa-female'; // Font Awesome female icon
      default:
        return 'fas fa-user'; // Default user icon
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card text-center shadow-lg">
            <div className="card-body">
              <div className="profile-icon mb-3">
                <i className={getProfileIcon()} style={{ fontSize: '5rem', color: '#6a0dad' }}></i>
              </div>
              <h1 className="card-title mb-2">{user.username}</h1>
              <p className="card-text">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="card-text">
                <strong>Role:</strong> {user.role}
              </p>
              <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
