import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import Select from "react-select";
import { API } from "../global";
import "./editBlog.css";
export function EditBlog() {
  const { id } = useParams();
  console.log(id);

  const [blog, setBlog] = useState(null);

  const getBlog = () => {
    fetch(`${API}/blog/${id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((mv) => setBlog(mv));
  };
  useEffect(() => getBlog(), []);
  return blog ? <EditBlogForm blog={blog} /> : "loading...";
}

function EditBlogForm({ blog }) {
  const [poster, setPoster] = useState(blog.poster);
  const [title, setTitle] = useState(blog.title);
  const [body, setBody] = useState(blog.body);
  const [categories, setCategories] = useState(blog.categories);

  const navigate = useNavigate();

  const addBlog = () => {
    const newBlog = {
      poster: poster,
      title: title,
      body: body,
      categories: categories,
    };

    fetch(`${API}/blog/${blog._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBlog),
    }).then((res) => navigate("/"));
  };
  return (
    <Container>
      <div className="wrapper">
        <div className="pageTitleDiv">
          <h2>Create new blog</h2>
        </div>
        <div className="paddingV1H0">
          <Form className="blog-form ">
            <Form.Group className=" mb-3">
              <Form.Label>Post url of picture in .jpg format</Form.Label>
              <Form.Control
                type="text"
                name="poster"
                placeholder="Enter blog Url"
                value={poster}
                onChange={(event) => setPoster(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3 ">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter blog title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
              <Form.Text className="redColor"></Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="body"
                placeholder="Enter blog body"
                value={body}
                onChange={(event) => setBody(event.target.value)}
              />
              <Form.Text className="redColor"></Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicBio">
              <Form.Label>
                <span className="miniText">(select multiple tags)</span>
              </Form.Label>
              <Select
                isMulti
                onChange={(event) => setCategories(event.target.value)}
                value={categories}
              />
            </Form.Group>
            <Button
              onClick={addBlog}
              variant="primary"
              type="submit"
              className="customBtn"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
}
