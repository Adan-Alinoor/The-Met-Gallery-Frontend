import React, { useState } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? (
        <HomePage />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;