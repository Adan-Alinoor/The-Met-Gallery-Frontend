import React, { useState } from 'react';

function UserProfile() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Send request to server to login
    console.log(`Login: ${email} ${password}`);
    setIsLoggedIn(true);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Send request to server to signup
    console.log(`Signup: ${email} ${password}`);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleShowSignupForm = () => {
    setIsSigningUp(true);
  };

  return (
    <div className="container">
      <div className="profile-icon">
        <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Profile Icon" />
      </div>
      {isLoggedIn? (
        <div>
          <h1>Welcome, {email}!</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          {isSigningUp? (
            <form onSubmit={handleSignup}>
              <h1>Sign up</h1>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <br />
              <label>Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <br />
              <button type="submit">Sign up</button>
            </form>
          ) : (
            <form onSubmit={handleLogin}>
              <h1>Login</h1>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <br />
              <label>Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <br />
              <button type="submit">Login</button>
              <p>
                Don't have an account?{' '}
                <a href="#" onClick={handleShowSignupForm}>
                  Sign up
                </a>
              </p>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default UserProfile;