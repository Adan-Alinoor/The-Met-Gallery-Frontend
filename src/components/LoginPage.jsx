import React, { useState } from 'react';
import LogIn from './LogIn';
import SignUp from './SignUp';
import HomePage from './HomePage';

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const handleHideSignupForm = () => {
    setIsSigningUp(false);
  };

  return (
    <div className="container">
      {isLoggedIn? (
        <HomePage email={email} onLogout={handleLogout} />
      ) : (
        <div>
          <div className="profile-icon">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Profile Icon" />
          </div>
          {!isSigningUp && (
            <LogIn
              setEmail={setEmail}
              setPassword={setPassword}
              handleLogin={handleLogin}
              handleShowSignupForm={handleShowSignupForm}
            />
          )}
          {isSigningUp && (
            <SignUp
              setEmail={setEmail}
              setPassword={setPassword}
              handleSignup={handleSignup}
              handleHideSignupForm={handleHideSignupForm}
            />
          )}
          {isSigningUp && (
            <p>
              <button onClick={handleHideSignupForm}>
                Back to login
              </button>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default LoginPage;