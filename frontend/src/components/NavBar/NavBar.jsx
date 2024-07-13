import React, { useContext, useState, useEffect } from "react";
import "./NavBar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { product_list } from "../../assets/assets";

const NavBar = () => {
  const [menu, setMenu] = useState("Home");
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [username, setUsername] = useState(""); // State for username
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const { getTotalCartAmount } = useContext(StoreContext);

  useEffect(() => {
    // Fetch username from the database or API
    const fetchUsername = async () => {
      // Replace with your actual fetch call
      const response = await fetch("/api/getUsername");
      const data = await response.json();
      setUsername(data.username);
    };

    fetchUsername();
  }, []);

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

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    // Implement logout functionality
    console.log("User logged out");
  };

  return (
    <div className="navbar">
      <Link to="/home">
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
          {showSearch && (
            <div className="navbar-search-box">
              <input
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              <ul className="search-results">
                {searchResults.map((product) => (
                  <li key={product._id}>{product.product_name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <Link to="/cart">
          <img className="cart-icon" src={assets.cart_icon} alt="Cart" />
        </Link>
        <div className="navbar-username" onClick={toggleDropdown}>
          Name {username}
          {dropdownVisible && (
            <div className="dropdown-menu">
              <button onClick={handleLogout}>Log out</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
