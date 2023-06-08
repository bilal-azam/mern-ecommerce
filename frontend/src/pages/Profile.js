import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Image } from 'react-bootstrap';

const Profile = () => {
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [referralCode, setReferralCode] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { 'x-auth-token': localStorage.getItem('authToken') }
      });
      setUser(data);
      setName(data.name);
      setEmail(data.email);
      setProfileImage(data.profileImage);
    };

    fetchUser();
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/profile/image', formData, {
        headers: {
          'x-auth-token': localStorage.getItem('authToken'),
          'Content-Type': 'multipart/form-data'
        }
      });
      setProfileImage(data.profileImage);
    } catch (err) {
      console.error('Error uploading image:', err);
    }
  };

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

  const handleReferralSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/users/referral', { referralCode }, {
        headers: { 'x-auth-token': localStorage.getItem('authToken') }
      });
    } catch (err) {
      console.error('Error submitting referral code:', err);
    }
  };

  return (
    <Container>
      <h2>User Profile</h2>
      <Image src={`http://localhost:5000/${profileImage}`} roundedCircle width="100" />
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
        <Form.Group controlId="image">
          <Form.Label>Profile Image</Form.Label>
          <Form.Control
            type="file"
            onChange={handleImageUpload}
          />
        </Form.Group>
        <Button type="submit">Update Profile</Button>
      </Form>
      <Form>
        <Form.Group controlId="referralCode">
          <Form.Label>Referral Code</Form.Label>
          <Form.Control
            type="text"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
          />
        </Form.Group>
        <Button onClick={handleReferralSubmit}>Submit Referral Code</Button>
      </Form>
    </Container>
  );
};

export default Profile;
