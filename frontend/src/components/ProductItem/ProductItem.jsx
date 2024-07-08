import React from "react";
import "./ProductItem.css";
import { assets } from "../../assets/assets";
const ProductItem = ({ id, name, price, description, image }) => {
  return (
    <div className="product-item">
      <div className="product-item-container">
        <img className="product-item-img" src={image} alt="" />
      </div>
      <div className="product-item-info">
        <p className="product-name">{name}</p>
        <p className="product-item-description">{description}</p>
        <p className="product-item-price">PHP{price}</p>
      </div>
    </div>
  );
};

export default ProductItem;
