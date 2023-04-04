import React from "react";
import "./blogCard.css";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import { CardActions } from "@mui/material";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import { API } from "../global";
export function BlogCard({ blogs, id }) {
  const navigate = useNavigate();
  const deleteBlog = (id) => {
    fetch(`${API}/blog/${id}`, {
      method: "DELETE",
    }).then(() => navigate("/"));
  };
  return (
    <Card className="cardBody" style={{ width: "18rem" }}>
      <Card.Img src={blogs.poster} variant="top" className="hoverPointer" />
      <Card.Body>
        <Card.Title className="hoverPointer">{blogs.title}</Card.Title>
        <Card.Text>
          {blogs.body.split(" ").slice(0, 20).join(" ")}
          {blogs.body.split(" ").length > 20 && " ..."}
        </Card.Text>
      </Card.Body>
      <CardActions>
        <Link className="linkEntity" to={`/blog/read/${id}`}>
          Read more
        </Link>

        <RiDeleteBin5Fill
          style={{ marginLeft: "auto", color: "red" }}
          size={25}
          onClick={() => deleteBlog(blogs._id)}
        />
        <AiFillEdit
          size={25}
          style={{ color: "66347F" }}
          onClick={() => navigate(`/blog/edit/${blogs._id}`)}
        />
      </CardActions>
    </Card>
  );
}
