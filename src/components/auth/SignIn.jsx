import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { logIn } from '../../firebase';

export default function SignIn() { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const lastPage = window.location.pathname;
    if (lastPage !== '/sign-in') {
      localStorage.setItem('lastPage', lastPage);
    }
  }, []);

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await logIn(email, password);
      console.log(userCredential, "sign-in page");

      const lastPage = localStorage.getItem('lastPage');
      navigate(lastPage ? lastPage : "/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="sign-in--container">
        <form onSubmit={signIn}>
          <h2>Log In to Your ArtiQuest Account</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Log In</button>
        </form>
      </div>
      <div>
        If you do not have an account, register for one here{" "}
        <Link to="/sign-up">register for new account</Link>
      </div>
    </>
  );
}
