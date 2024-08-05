import React from 'react';
import './UserProfile.css';

const UserProfile = () => {
  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    bio: "Artist based in New York, specializing in abstract paintings.",
    profilePicture: "https://i.pinimg.com/564x/91/c9/60/91c960ce7fcd5d246597adbc5118bba4.jpg"
  };

  const handleLogout = () => {
    
    console.log("User logged out");
  };

  return (
    <div className="user-profile">
      <img src={user.profilePicture} alt="Profile" className="profile-picture" />
      <h1>{user.name}</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Bio:</strong> {user.bio}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserProfile;