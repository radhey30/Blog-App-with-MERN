import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function BlogPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios.get("http://localhost:4000/post/" + id).then((res) => {
      setPostInfo(res.data);
    });
  }, []);

  function handleDelete() {
    axios.delete("http://localhost:4000/post/" + id).then(() => {
      alert("Post Deleted");
      navigate("/");
    });
  }

  if (!postInfo) return "";

  return (
    <div className="post-page">
      <Link to="/">Home</Link>
      <div>
        <h1 className="title">{postInfo.title}</h1>
        <time className="time">
          {formatISO9075(new Date(postInfo.createdAt))}
        </time>
        <div className="author">
          by <b>{postInfo.author.username}</b>
        </div>
      </div>
      {userInfo.id === postInfo.author._id && (
        <div className="editpage-buttondiv">
          <Link to={`/edit/${postInfo._id}`} className="editBtn">
            Edit Post
          </Link>
          <button onClick={handleDelete} className="editBtn">
            Delete Post
          </button>
        </div>
      )}
      {postInfo.image && (
        <img
          src={"http://localhost:4000/" + postInfo.image}
          alt="blogimage"
          height={200}
        />
      )}
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      ></div>
    </div>
  );
}
