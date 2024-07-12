import React, { useRef } from "react";
import "./Header.css";

const Header = () => {
  const productItemRef = useRef(null);

  const scrollToProductItem = () => {
    if (productItemRef.current) {
      productItemRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order pest control products here</h2>
        <p>
          Select from these pest control solutions to effectively prevent,
          mitigate, and eliminate pest infestations.
        </p>
        <button onClick={scrollToProductItem}>View Products</button>
      </div>
      {}
      <div ref={productItemRef}></div>
    </div>
  );
};

export default Header;
