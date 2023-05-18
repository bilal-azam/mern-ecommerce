import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { isAuthenticated } from '../utils/auth';

const stripePromise = loadStripe('your_stripe_public_key');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  if (!isAuthenticated()) {
    navigate('/login');
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      const { data: { clientSecret } } = await axios.post('http://localhost:5000/api/orders/checkout', {}, {
        headers: {
          'x-auth-token': localStorage.getItem('authToken')
        }
      });

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        console.error('Payment failed:', error);
      } else if (paymentIntent.status === 'succeeded') {
        navigate('/orders');
      }
    } catch (err) {
      console.error('Error processing payment:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Load PayPal script
  const script = document.createElement('script');
  script.src = "https://www.paypal.com/sdk/js?client-id=your_paypal_client_id";
  script.addEventListener('load', () => {
    window.paypal.Buttons({
      createOrder: async () => {
        const { data: { id } } = await axios.post('http://localhost:5000/api/paypal/create-order');
        return id;
      },
      onApprove: async (data) => {
        await axios.post('http://localhost:5000/api/paypal/capture-order', { orderId: data.orderID });
        navigate('/orders');
      },
      onError: (err) => {
        console.error('PayPal error:', err);
      }
    }).render('#paypal-button-container');
  });
  document.body.appendChild(script);

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </Button>
      <div id="paypal-button-container"></div>
    </form>
  );
};

const Checkout = () => {
  return (
    <Container>
      <h2>Checkout</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Container>
  );
};

export default Checkout;
