import React, { useState } from "react";
import "./NavBar.css";
import search_icon from "../../assets/search_icon.png";
import cart_icon from "../../assets/cart_icon.png";
import { assets } from "../../assets/assets";

const NavBar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");

  return (
    <div className="navbar">
      <div className="navbar-logo-container">
        <img id="navbar-logo" src={assets.uno_pest_co} alt="" />
        <h2>Uno Pest Co.</h2>
      </div>
      <ul className="navbar-menu">
        <li
          onClick={() => setMenu("Home")}
          className={menu === "Home" ? "active" : ""}
        >
          Home
        </li>
        <li
          onClick={() => setMenu("Menu")}
          className={menu === "Menu" ? "active" : ""}
        >
          Menu
        </li>
        <li
          onClick={() => setMenu("About")}
          className={menu === "About" ? "active" : ""}
        >
          About
        </li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <img src={assets.cart_icon} alt="" />
          <div className="dot"></div>
        </div>
        <button onClick={() => setShowLogin(true)}>Sign in</button>
      </div>
    </div>
  );
};

export default NavBar;
