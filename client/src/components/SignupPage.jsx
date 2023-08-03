import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {userInfo} = useContext(UserContext)

  function signup(e) {
    e.preventDefault();
    axios
      .post("http://localhost:4000/signup", { username, password })
      .then(res => console.log(res))
      .catch((err) => alert("Error in signing!"));
    setUsername("");
    setPassword("");
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="main">
      <div className="container">
        <div className="container-title">
          <h1 className="title">Blogster</h1>
        </div>
        <div className="signup-container">
          <form id="signup" onSubmit={signup}>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              autoComplete="off"
            />
            <label className="password-label">
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </label>
            <input type="submit" value="Create Account" />
          </form>
          <div id="login-text">
            <p className="login-title">Already have an account:</p>
            <Link to="/login" id="login-link">
              Login
            </Link>
          </div>
        </div>
      </div>
      {userInfo && (
        <div className="alert-container">
          <h1>Logout to continue.</h1>
          <Link to="/">Go Home</Link>
        </div>
      )}
    </div>
  );
}
