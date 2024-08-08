import React, { useState } from 'react';

const SignUp = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);

  const handleSignUp = (e) => {
    e.preventDefault();
    // Send request to server to sign up
    console.log(`Sign up: ${email} ${password} ${username}`);
  };

  return (
    <form onSubmit={handleSignUp}>
      <h1>Sign up</h1>
      <label>Username:</label>
      <input type="text" value={username || ''} onChange={(e) => setUsername(e.target.value)} />
      <br />
      <label>Email:</label>
      <input type="email" value={email || ''} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password || ''} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button type="submit">Sign up</button>
    </form>
  );
};

export default SignUp;