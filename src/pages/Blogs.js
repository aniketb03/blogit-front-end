import { useContext, useEffect, useState } from "react";
import CommonContext from "../context/commonContext";
import { BlogCard } from "../components/blogCard";
import { API } from "../global";

import "./Blog.css";
import { useNavigate } from "react-router-dom";

export function Blogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const { isLoggedIn } = useContext(CommonContext);
  useEffect(() => {
    const getData = async () => {
      if (!isLoggedIn) {
        navigate("/login");
      } else {
        try {
          fetch(`${API}/blog/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((data) => data.json())
            .then((bgs) => setBlogs(bgs));
        } catch (err) {
          console.log(err);
        }
      }
    };
    getData();
  });
  return (
    <div className="blogslists">
      {blogs.map((bg) => (
        <BlogCard blogs={bg} key={bg._id} id={bg._id} />
      ))}
    </div>
  );
}
