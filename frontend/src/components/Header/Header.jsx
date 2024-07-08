import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order pest control products here</h2>
        <p>
          Select from these pest control solutions to effectively prevent,
          mitigate, and eliminate pest infestations.
        </p>
        <button>View Products</button>
      </div>
    </div>
  );
};

export default Header;
