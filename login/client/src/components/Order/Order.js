import React from 'react';
import api from '../../services/api';

const Order = ({ cartItems }) => {
    const handleSubmitOrder = async () => {
        try {
            await api.post('/orders', { items: cartItems });
            alert('Order submitted successfully');
        } catch (err) {
            console.error(err);
            alert('Order submission failed');
        }
    };

    return (
        <div>
            <h2>Order</h2>
            <button onClick={handleSubmitOrder}>Submit Order</button>
        </div>
    );
};

export default Order;
