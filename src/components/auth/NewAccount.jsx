import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "../../firebase";

export default function NewAccount() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const lastPage = window.location.pathname;
    if (lastPage !== "/sign-in") {
      localStorage.setItem("lastPage", lastPage);
    }
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const newUserAccount = async (e) => {
    e.preventDefault();
    let isValid = true;
    
    if (!username) {
      setError("Username is blank. Please provide a username.")
      return
    }

    if (email === "") {
      setError("Email address is required.");
      isValid = false;
    } else if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      isValid = false;
    } else {
      setError("");
    }

    if (password === "") {
      setError("Password is required.");
      isValid = false;
    } else {
      setError("");
    }

    if (!isValid) return;

    try {
      console.log("Attempting to sign up...");
      const userCredential = await signUp(email, password, username);
      console.log("Sign up successful", userCredential);
      const lastPage = localStorage.getItem("lastPage");
      console.log("Navigating to", lastPage ? lastPage : "/sign-in");
      navigate(lastPage ? lastPage : "/sign-in");
    } catch (error) {
      // console.error("Sign up failed", error);
      setError(error.message || "Failed to create a new account");
    }
  }

  return (
        <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create A New Account
          </h2>
          {error && <p className="mt-2 text-sm text-center text-red-600">{error}</p>}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" id="NewUserAccount" onSubmit={newUserAccount}>
          <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  // autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  {/* <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a> */}
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Account
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            *All fields are required{" "}
            <br/>
            <br/>
            or go to {" "}
            <Link className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" to="/sign-in">Sign In</Link>
          </p>
        </div>
      </div>
    </>
  )

}
