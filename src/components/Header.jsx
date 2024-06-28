import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { isLoggedIn, logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <header className="bg-indigo-200">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link className="text-indigo-600 font-bold size-6 align-middle" to="/" aria-label="ArtiQuest Home">ArtiQuest</Link>
            </div>

            <div className="md:flex md:items-center md:gap-12">
              <nav aria-label="Main Navigation" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link className="text-gray-800 transition hover:text-red-500/75" to="/search">Search</Link>
                  </li>
                  {isLoggedIn ? (
                    <>
                      <li>
                        <Link className="text-gray-800 transition hover:text-red-500/75" to={`/collection/${currentUser.displayName}`}>My Exhibits</Link>
                      </li>
                      {/* <li>
                        <Link className="text-gray-500 transition hover:text-gray-500/75" to={`/user/${currentUser.displayName}`}>My Profile</Link>
                      </li> */}
                    </>
                  ) : null}
                </ul>
              </nav>
              <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                  {isLoggedIn ? (
                    <button
                      className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                      onClick={handleLogout}
                      aria-label="Sign Out"
                    >
                      Sign Out
                    </button>
                  ) : (
                    <Link
                      className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                      to="/sign-in"
                      aria-label="Sign In"
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="block md:hidden">
                <button 
                  className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                  aria-label="Open Menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}