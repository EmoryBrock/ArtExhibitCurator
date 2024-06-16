import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div>
        <Link to="/">ArtiQuest</Link>
      </div>
      <div>
        <Link to="/search">Search</Link>
      </div>
      <div>
        <Link to="/user">Profile</Link>
      </div>
    </>
  );
}
