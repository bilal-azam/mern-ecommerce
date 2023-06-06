import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, ListGroup } from 'react-bootstrap';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/orders/history', {
          headers: { 'x-auth-token': localStorage.getItem('authToken') }
        });
        setOrders(data);
      } catch (err) {
        console.error('Error fetching order history:', err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Container>
      <h2>Order History</h2>
      <ListGroup>
        {orders.map(order => (
          <ListGroup.Item key={order._id}>
            <h5>Order #{order._id} - ${order.totalPrice}</h5>
            <p>{order.items.map(item => `${item.productId.name} x ${item.quantity}`).join(', ')}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default OrderHistory;
