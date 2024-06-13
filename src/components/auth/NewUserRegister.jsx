import React, { useState } from "react";
import { signUp } from '../../firebase'


export default function NewUserRegister() {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const newUserAccount = (e) => {
      e.preventDefault()
      signUp(email,password)
      .then((userCredential) => {
        console.log(userCredential)
      }).catch( error => {
        console.log(error)
      })
    }
// Add error catch for emails, blank email input
// strong password prompt 6 chars, 1 number, 1 special character
  return (
    <div className="sign-up--container">
      <form onSubmit={newUserAccount}>
        <h2>Create New Account</h2>
        <input type="email" placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}>
        </input>
        <input type="password" placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}>
        </input>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
}
