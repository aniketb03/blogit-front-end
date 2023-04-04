import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API } from "../global";

export function UpdateBlog() {
  const { id } = useParams();
  console.log(id);
  const categories = [
    "automotive",
    "business",
    "diy",
    "fashion",
    "finance",
    "fitness",
    "food",
    "gaming",
    "lifestyle",
    "movie",
    "music",
    "news",
    "personal",
    "pet",
    "politics",
    "sports",
    "technology",
    "travel",
    "other",
  ];
  const [blog, setOneBlogs] = useState({});

  const [photo, setPhoto] = useState(null);

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
  return (
    <Container>
      <div className="wrapper">
        <div className="pageTitleDiv">
          <h2>Update your blog</h2>
        </div>
        <div className="paddingV1H0">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select a picture from computer</Form.Label>
              <Form.Control type="file" name="file" o />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter blog title"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="body"
                placeholder="Enter blog body"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicBio">
              <Form.Label>
                Categories{" "}
                <span className="miniText">
                  (select multiple using ctrl + click)
                </span>
              </Form.Label>
              <Form.Select required multiple>
                {categories.map((c, i) => (
                  <option key={c + i} value={c}>
                    {c}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" className="customBtn">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
}
