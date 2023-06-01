import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, ListGroup } from 'react-bootstrap';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/users/notifications', {
          headers: { 'x-auth-token': localStorage.getItem('authToken') }
        });
        setNotifications(data);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <Container>
      <h2>Notifications</h2>
      <ListGroup>
        {notifications.map((notification, index) => (
          <ListGroup.Item key={index}>
            {notification.message}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Notifications;
