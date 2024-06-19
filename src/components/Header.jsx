import React from "react";
import { Link } from "react-router-dom";
import {useAuth} from "../components/auth/AuthContext"

export default function Header() {
  const {isLoggedIn} = useAuth()

  return (
    <>
      <div>
        <Link to="/">ArtiQuest</Link>
      </div>
      <div>
        <Link to="/search">Search</Link>
      </div>
      {isLoggedIn ? (
        <>
          <div>
            <Link to="/my-colllection">My Collection</Link>
          </div>
          <div>
            <Link to="/sign-out">Sign Out</Link>
          </div>
        </>
      ) : (
        <>
      <div>
        <Link to="/user">Profile</Link>
      </div>
      <div>
        <Link to="/sign-in">Sign in</Link>
      </div>
    </>
  )}
  </>
  )
}
