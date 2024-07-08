import React, { useContext } from "react";
import "./ProductDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import ProductItem from "../ProductItem/ProductItem";

const ProductDisplay = ({ category }) => {
  const { product_list } = useContext(StoreContext);
  return (
    <div className="product-display" id="product-display">
      <h2>Products</h2>
      <div className="product-display-list">
        {product_list.map((item, index) => {
          return (
            <ProductItem
              key={index}
              id={item._id}
              name={item.product_name}
              description={item.description}
              price={item.price}
              image={item.product_img}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductDisplay;
