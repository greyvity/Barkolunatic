import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <Link to="/login">
        <li className="login">Login</li>
      </Link>
      <Link to="/">
        <li className="register">Register</li>
      </Link>
      <Link to="about">
        <li className="about">About</li>
      </Link>
    </nav>
  );
};

export default NavBar;
