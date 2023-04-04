import "./Login.css";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import CommonContext from "../context/commonContext";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { API } from "../global";

function Login() {
  const [isLoading, setIsLoading] = useState();
  const navigate = useNavigate();

  const [registerInput, setRegisterInput] = useState({
    userName: "",
    password: "",
  });

  const handleInput = (e) => {
    setRegisterInput({ ...registerInput, [e.target.name]: e.target.value });
  };

  const { isLoggedIn, SetIsLoggedIn } = useContext(CommonContext);

  const registerSubmit = (e) => {
    e.preventDefault();
    try {
      const data = {
        userName: registerInput.userName,
        password: registerInput.password,
      };
      // console.log(data);
      fetch(`${API}/user/login`, {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((inv) => {
          if (inv.message == "Successfully Login") {
            console.log(inv.message);
            localStorage.setItem("x-auth-token", inv.token);
            localStorage.setItem("id", inv.id);
            localStorage.setItem("user", inv.userName);
            SetIsLoggedIn(true);
            setIsLoading(false);
            navigate("/");
          } else {
            console.log(inv.message);
          }
        });
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  return isLoggedIn ? (
    navigate("/")
  ) : (
    <Container>
      <div className="login">
        <div className="loginBody">
          <div className="loginBodyTop">
            <div className="loginLogo">
              <div className="logo">Login</div>
            </div>

            <Form onSubmit={registerSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
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
                  "Log in"
                )}
              </Button>
            </Form>
          </div>
          <div className="loginBodyBottom">
            <p>
              Dont have an account?
              <Link to="/signup">
                <Button className="customBtnOutline" variant="outline-primary">
                  Sign up
                </Button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Login;
