import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [redirect, setRedirect] = useState(false);

  function create(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", file[0]);
    axios
      .post("http://localhost:4000/create", data, { withCredentials: true })
      .then((res) => {
        if (res.data) setRedirect(true);
      });
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="blog-form">
      <div className="container">
        <h1 className="title">Create New Blog</h1>
        <form onSubmit={create}>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files)}
          />
          <label htmlFor="image" className="image-btn" tabIndex={0}>
            Upload Image
          </label>
          {!file && <div className="imageDiv">No Image Selected</div>}
          <input
            type="text"
            name="summary"
            id="summary"
            placeholder="Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          />
          <ReactQuill
            className="textBox"
            modules={modules}
            formats={formats}
            value={content}
            onChange={(e) => setContent(e)}
          />
          <input type="submit" value="Create Blog" />
        </form>
        <Link to="/" className="backBtn">
          Go Back
        </Link>
      </div>
    </div>
  );
}
