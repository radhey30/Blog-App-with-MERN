import React from "react";
import { Link } from "react-router-dom";

export default function Blog({
  _id,
  title,
  summary,
  content,
  image,
  author,
  createdAt,
}) {
  return (
    <div className="blog">
      <div className="blog-image">
        <Link to={`/post/${_id}`}>
          <img src={"http://localhost:4000/" + image} alt="blog" />
        </Link>
      </div>
      <div className="blog-text">
        <Link to={`/post/${_id}`}>
          <h2 className="title">{title}</h2>
        </Link>
        <p className="author">by {author.username}</p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
