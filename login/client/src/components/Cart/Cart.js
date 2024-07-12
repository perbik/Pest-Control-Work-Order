// src/components/Cart/Cart.js
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            const response = await api.get('/cart');
            setCartItems(response.data);
        };

        fetchCartItems();
    }, []);

    const handleQuantityChange = (productId, quantity) => {
        // Logic to update cart item quantity
    };

    const handleRemoveItem = (productId) => {
        // Logic to remove item from cart
    };

    return (
        <div>
            <h2>Cart</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item.id}>
                        {item.name} - {item.quantity}
                        <button onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}>+</button>
                        <button onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}>-</button>
                        <button onClick={() => handleRemoveItem(item.productId)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;
