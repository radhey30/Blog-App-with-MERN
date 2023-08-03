import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function Navbar() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("http://localhost:4000/profile", { withCredentials: true })
      .then((res) => {
        setUserInfo(res.data);
      });
  }, []);

  function logout() {
    axios
      .get("http://localhost:4000/logout", { withCredentials: true })
      setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <nav>
      <div className="links">
        {username && (
          <>
            <Link to="/create">Create New Post</Link>
            <a to="/login" onClick={logout}>
              Logout
            </a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">SignUp</Link>
          </>
        )}
      </div>
    </nav>
  );
}
