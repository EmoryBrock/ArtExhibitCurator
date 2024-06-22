import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../firebase";

export default function NewAccount() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const newUserAccount = async (e) => {
    e.preventDefault();
    
    if (!username) {
      setError("Username is blank. Please provide a username.")
      return
    }


    try {
      const userCredential = await signUp(email, password, username);
      const lastPage = localStorage.getItem("lastPage");
      navigate(lastPage ? lastPage : "/sign-in");
    } catch (error) {
      alert(`${error}`);
      setError(error.message || "Failed to sign up.");
    }
  }

  return (
    <div className="sign-up--container">
      <form onSubmit={newUserAccount}>
        <h2>Create New Account</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6} // Minimum length requirement for password
          pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$" // Password strength requirement (1 number, 1 special character)
          title="Password must contain at least 6 characters with at least one number and one special character"
          required // Ensures password input is required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
