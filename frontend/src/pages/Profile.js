import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';

const Profile = () => {
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { 'x-auth-token': localStorage.getItem('authToken') }
      });
      setUser(data);
      setName(data.name);
      setEmail(data.email);
    };

    fetchUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/users/profile', { name, email }, {
        headers: { 'x-auth-token': localStorage.getItem('authToken') }
      });
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  return (
    <Container>
      <h2>User Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Update Profile</Button>
      </Form>
    </Container>
  );
};

export default Profile;
