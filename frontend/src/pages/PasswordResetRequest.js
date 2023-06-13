import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/reset-password', { email });
    } catch (err) {
      console.error('Error sending password reset email:', err);
    }
  };

  return (
    <Container>
      <h2>Reset Password</h2>
      <Form>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button onClick={handleSubmit}>Send Reset Link</Button>
      </Form>
    </Container>
  );
};

export default PasswordResetRequest;
