import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Form } from 'react-bootstrap';

const Checkout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      await axios.post('http://localhost:5000/api/orders');
      navigate('/orders');
    } catch (err) {
      console.error('Error processing order:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Container>
      <h2>Checkout</h2>
      <Form>
        <Button
          variant="primary"
          onClick={handleCheckout}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Place Order'}
        </Button>
      </Form>
    </Container>
  );
};

export default Checkout;
