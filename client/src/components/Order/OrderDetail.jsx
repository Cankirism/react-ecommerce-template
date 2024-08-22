import React, { useState } from 'react';
import './OrderDetail.css'; // Import the CSS file for styling

const OrderDetail = (props) => {
    const [orders,setOrders]=useState(props.order)
    console.log("order detail",orders)
  if (!orders) return <p>Loading...</p>;

  return (
    <div className="order-detail">
    
      <div className="order-info">
        {/* <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
        <p><strong>Status:</strong> {order.status}</p> */}
      </div>
      <div className="order-items">
        <h5>Sipariş edilenler</h5>
        <ul>
          {orders.map(item => (
            <li key={item._id} className="order-item">
            
              <span className="item-name">{item.name}</span>
              <span className="item-quantity">x{item.quantity}</span>
              <span className="item-price">{item.price.toFixed(2)} TL</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="order-total">
        <h5>Toplam</h5>
     <p>{orders.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)} TL</p> 
      </div>
    </div>
  );
};

export default OrderDetail;