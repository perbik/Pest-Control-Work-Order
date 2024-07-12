import React, { useContext } from "react";
import "./ProductDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import ProductItem from "../ProductItem/ProductItem";

const ProductDisplay = ({ category }) => {
  const { product_list, clearCart } = useContext(StoreContext);
  return (
    <div className="product-display" id="product-display">
      <div className="product-display-header">
        <h2>Products</h2>
        <div className="product-display-subheader">
          <p>The minimum amount to purchase per product is 5 units.</p>
          <button className="clear-cart-button" onClick={clearCart}>
            Clear All
          </button>
        </div>
      </div>
      <div className="product-display-list">
        {product_list.map((item, index) => {
          if (category === "All" || category === item.category) {
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
          }
        })}
      </div>
    </div>
  );
};

export default ProductDisplay;
