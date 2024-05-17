import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const NavBar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/add-product">Add Product</Link>
    </nav>
  );
};

export default NavBar;
