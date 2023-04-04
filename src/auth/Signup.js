import "./Signup.css";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../global";
function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [registerInput, setRegisterInput] = useState({
    email: "",
    fullName: "",
    userName: "",
    password: "",
  });

  const handleInput = (e) => {
    setRegisterInput({ ...registerInput, [e.target.name]: e.target.value });
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: registerInput.email,
      fullName: registerInput.fullName,
      userName: registerInput.userName,
      password: registerInput.password,
    };
    console.log(data);
    fetch(`${API}/user/signup`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) {
        setIsLoading(false);
        toast.success("Registered successfully!");
        navigate("/login");
      }
    });
  };

  return (
    <Container>
      <div className="register">
        <div className="loginBody">
          <div className="loginBodyTop">
            <div className="loginLogo">
              <div className="logo">Register</div>
            </div>

            <Form onSubmit={registerSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Full name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  placeholder="Enter full name"
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicUn">
                <Form.Label>User name</Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
                  placeholder="Enter username"
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Min 6 characters"
                  onChange={handleInput}
                />
              </Form.Group>
              <Button type="submit" className="customBtn">
                {isLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Register"
                )}
              </Button>
            </Form>
          </div>
          <div className="loginBodyBottom">
            <p>
              Have an account already?
              <Link to="/login">
                <Button className="customBtnOutline" variant="outline-primary">
                  Log in
                </Button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Signup;
