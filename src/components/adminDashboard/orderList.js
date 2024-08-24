import React, { useState, useEffect } from 'react';
import orderService from '../../server/orderService';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getAllOrders();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            {order.customerName} - {order.total} USD
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersList;
