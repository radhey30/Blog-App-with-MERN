import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {userInfo, setUserInfo} = useContext(UserContext)


  function login(e) {
    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/login",
        { username, password },
        { withCredentials: true }
      )
      .then((res) => {
        setUserInfo(res.data)
        setRedirect(true);
      })
      .catch(() => alert("Wrong credentials!"));
    setUsername("");
    setPassword("");
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
        <div className="login-container">
          <form id="login" onSubmit={login}>
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
            <input type="submit" value="Login" />
          </form>
          <div id="signup-text">
            <p className="signup-title">New account:</p>
            <Link to="/signup" id="signup-link">
              SignUp
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
