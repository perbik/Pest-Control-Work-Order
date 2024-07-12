import React, { useContext, useState } from "react";
import "./NavBar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { product_list } from "../../assets/assets";

const NavBar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { getTotalCartAmount } = useContext(StoreContext);

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
    setSearchResults([]);
    setSearchInput("");
  };

  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    const filteredResults = product_list.filter((product) =>
      product.product_name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <div className="navbar">
      <Link to="/">
        <div className="navbar-logo-container">
          <img id="navbar-logo" src={assets.uno_pest_co} alt="" />
          <h2>Uno Pest Co.</h2>
        </div>
      </Link>
      <ul className="navbar-menu">
        <li
          onClick={() => setMenu("Home")}
          className={menu === "Home" ? "active" : ""}
        >
          Home
        </li>
        <li
          onClick={() => setMenu("Products")}
          className={menu === "Products" ? "active" : ""}
        >
          Products
        </li>
        <li
          onClick={() => setMenu("About")}
          className={menu === "About" ? "active" : ""}
        >
          About
        </li>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <img
            className="search-icon"
            src={assets.search_icon}
            alt="Search"
            onClick={handleSearchClick}
          />
          {}
          {showSearch && (
            <div className="navbar-search-box">
              <input
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              {}
              <ul className="search-results">
                {searchResults.map((product) => (
                  <li key={product._id}>{product.product_name}</li>
                ))}
              </ul>
            </div>
          )}
          <Link to="/cart">
            <img className="cart-icon" src={assets.cart_icon} alt="Cart" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        <button onClick={() => setShowLogin(true)}>Sign in</button>
      </div>
    </div>
  );
};

export default NavBar;
