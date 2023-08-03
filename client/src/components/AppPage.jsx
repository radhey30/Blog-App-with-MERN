import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Blog from "./Blog";
import axios from "axios";

export default function AppPage() {
  const [posts, setPosts] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:4000/blogs").then(res => {
      setPosts(res.data)
    })
  }, [])
  return (
    <>
      <Navbar />
      <main>
        <div className="blog-container-page">
          {posts.length > 0 && posts.map(post => {
            return <Blog {...post} />
          })}
        </div>
      </main>
    </>
  );
}
