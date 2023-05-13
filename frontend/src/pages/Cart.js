import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cart');
        setCart(response.data);
      } catch (err) {
        console.error('Error fetching cart:', err);
        navigate('/login');
      }
    };
    fetchCart();
  }, [navigate]);

  return (
    <Container>
      <h2>Your Cart</h2>
      {cart ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.items.map((item) => (
              <tr key={item.productId._id}>
                <td>{item.productId.name}</td>
                <td>{item.quantity}</td>
                <td>${item.productId.price}</td>
                <td>${item.quantity * item.productId.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default Cart;
