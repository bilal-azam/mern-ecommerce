import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../store/authSlice';
import { Form, Button } from 'react-bootstrap';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <Form.Group controlId="name">
        <Form.Control
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Control
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit">Register</Button>
    </Form>
  );
};

export default Register;
