import { Button, Container, Form } from "react-bootstrap";
import * as Yup from "yup";
import "./createBlog.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { API } from "../global";
import { useState } from "react";

const blogvalidationSchema = Yup.object({
  title: Yup.string()
    .min(3, "minimum 3 characters")
    .max(100, "maximum 100 characters")
    .required("required"),
  body: Yup.string()
    .min(5, "minimum 5 characters")
    .max(20000, "maximum 20000 characters")
    .required("required"),
});
function CreateBlog() {
  const navigate = useNavigate();

  const categories = [
    { value: "automotive", label: "automotive" },
    { value: "business", label: "business" },
    { value: "diy", label: "diy" },
    { value: "fashion", label: "fashion" },
    { value: "finance", label: "finance" },
    { value: "fitness", label: "fitness" },
    { value: "food", label: "food" },
    { value: "gaming", label: "gaming" },
    { value: "lifestyle", label: "lifestyle" },
    { value: "movie", label: "movie" },
    { value: "music", label: "music" },
    { value: "news", label: "news" },
    { value: "personal", label: "personal" },
    { value: "pet", label: "pet" },
    { value: "politics", label: "politics" },
    { value: "sports", label: "sports" },
    { value: "technology", label: "technology" },
    { value: "travel", label: "travel" },
    { value: "other", label: "other" },
  ];

  const [selectedCategories, setSelectedCategories] = useState(
    categories[0].value
  );

  const handleSelectChange = (event) => {
    console.log(event.target.value);
    setSelectedCategories(event.target.value);
  };

  const addBlog = (newBlog) => {
    fetch(`${API}/blog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBlog),
    }).then((res) => navigate("/home"));
    console.log(newBlog);
  };

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        poster: "",
        title: "",
        body: "",
        categories: selectedCategories,
      },
      validationSchema: blogvalidationSchema,
      onSubmit: (newBlog) => {
        console.log("onSubmit", newBlog);
        addBlog(newBlog);
      },
    });

  return (
    <Container>
      <div className="wrapper">
        <div className="pageTitleDiv">
          <h2>Create new blog</h2>
        </div>
        <div className="paddingV1H0">
          <Form onSubmit={handleSubmit} className="blog-form ">
            <Form.Group className=" mb-3">
              <Form.Label>Post url of picture in .jpg format</Form.Label>
              <Form.Control
                type="text"
                name="poster"
                placeholder="Enter blog Url"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.poster}
                error={touched.poster && Boolean(errors.poster)}
                helperText={
                  touched.poster && errors.poster ? errors.poster : " "
                }
              />
            </Form.Group>
            <Form.Group className="mb-3 ">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter blog title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title ? errors.title : " "}
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
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.body}
                error={touched.body && Boolean(errors.body)}
                helperText={touched.body && errors.body ? errors.body : " "}
              />

              <Form.Text className="redColor"></Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicBio">
              <Form.Label>
                <span className="miniText">(select tag)</span>
              </Form.Label>
              <select value={selectedCategories} onChange={handleSelectChange}>
                {categories.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
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

export default CreateBlog;
