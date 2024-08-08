import React from 'react';

const LogIn = ({ setEmail, setPassword, handleLogin, handleShowSignupForm }) => {
  return (
    <form>
      <h1>Log in</h1>
      <label>Email:</label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Log in</button>
      <p>
        Don't have an account?{' '}
        <span style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }} onClick={handleShowSignupForm}>
          Sign up
        </span>
      </p>
    </form>
  );
};

export default LogIn;