import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/auth/AuthContext";

export default function Header() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
            <Link to="/collection">My Collection</Link>
          </div>
          <div>
            <Link to="/user">Profile</Link>
          </div>
          <div>
            <a href="#" onClick={handleLogout}>
              Sign Out
            </a>
          </div>
        </>
      ) : (
        <>
          <div>
            <Link to="/sign-in">Sign In</Link>
          </div>
        </>
      )}
    </>
  );
}
