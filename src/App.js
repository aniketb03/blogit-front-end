import "./App.css";
import * as React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { About } from "./pages/About";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import CreateBlog from "./pages/createBlog";
import { AccountCircle } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import CommonContext from "./context/commonContext";
import { ReadBlog } from "./pages/readBlog";
import { EditBlog } from "./components/editBlog";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, SetIsLoggedIn] = React.useState(
    localStorage.getItem("token")
  );

  const clearFun = () => {
    if (isLoggedIn) {
      localStorage.removeItem("x-auth-token");
      localStorage.removeItem("id");
      localStorage.removeItem("user");
      SetIsLoggedIn(false);
      navigate("/login");
    } else {
      navigate("/login");
    }
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="App">
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Button color="inherit" onClick={() => navigate("/home")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/about")}>
            About
          </Button>
          {isLoggedIn == true ? (
            <>
              <IconButton
                style={{ marginLeft: "auto" }}
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={(handleClose, () => navigate("/blog/create"))}
                >
                  Add Blog
                </MenuItem>
                <MenuItem onClick={clearFun}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                style={{ marginLeft: "auto" }}
                color="inherit"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/signup")}>
                Sign-up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <section className="router-container">
        <CommonContext.Provider value={{ isLoggedIn, SetIsLoggedIn }}>
          <Routes>
            <Route path="*" element={<Navigate replace to="/404 " />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/blog/create" element={<CreateBlog />} />
            <Route path="/blog/read/:id" element={<ReadBlog />} />
            <Route path="/blog/edit/:id" element={<EditBlog />} />
          </Routes>
        </CommonContext.Provider>
      </section>
    </div>
  );
}

function NotFound() {
  return (
    <>
      <img
        style={{ alignItems: "center" }}
        src="https://cdn.dribbble.com/users/1175431/screenshots/6188233/404-error-dribbble-800x600.gif"
        alt="404 Not Found"
        className="not-found"
      />
    </>
  );
}

export default App;
