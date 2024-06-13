import React, { useState } from "react";
import { logIn } from '../../firebase'


export default function SingIn() {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = (e) => {
      e.preventDefault()
      logIn(email, password)
      .then((userCredential) => {
        console.log(userCredential)
      }).catch( error => {
        console.log(error)
      })
    }
// Add error catch for emails, blank email, 
  return (
    <div className="sign-in--container">
      <form onSubmit={signIn}>
        <h2>Log In to Your ArtiQuest Account</h2>
        <input type="email" placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}>
        </input>
        <input type="password" placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}>
        </input>
        <button type='submit'>Log In</button>
      </form>
    </div>
  );
}
