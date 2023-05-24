import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, ListGroup } from 'react-bootstrap';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get('http://localhost:5000/api/users/orders', {
        headers: { 'x-auth-token': localStorage.getItem('authToken') }
      });
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <Container>
      <h2>Order History</h2>
      <ListGroup>
        {orders.map(order => (
          <ListGroup.Item key={order._id}>
            <h5>Order ID: {order._id}</h5>
            <ul>
              {order.items.map(item => (
                <li key={item._id}>{item.productId.name} - {item.quantity} x ${item.productId.price}</li>
              ))}
            </ul>
            <h6>Total: ${order.totalPrice}</h6>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default OrderHistory;
