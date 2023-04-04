import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import { API } from "../global";
export function ReadBlog() {
  const { id } = useParams();
  console.log(id);
  const [oneBlog, setOneBlogs] = useState(null);

  const getBlogs = () => {
    fetch(`${API}/blog/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((bgs) => setOneBlogs(bgs));
  };
  useEffect(() => getBlogs(), []);

  return oneBlog ? <ReadBlogOne oneBlog={oneBlog} /> : "loading...";
}

function ReadBlogOne({ oneBlog }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(oneBlog.title);
  const [body, setBody] = useState(oneBlog.body);
  const [poster, setPoster] = useState(oneBlog.poster);

  return (
    <div className="blogDiv">
      <img src={poster} alt="Blog Poster" className="blogPoster" />
      <h2 className="blogTitle">{title}</h2>
      <p className="blogBody">{body}</p>

      <Button onClick={() => navigate(-1)} startIcon={<ArrowBackIosIcon />}>
        Back
      </Button>
    </div>
    // <></>
  );
}
