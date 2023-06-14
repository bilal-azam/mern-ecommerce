import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, ListGroup, Button } from 'react-bootstrap';

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

  const markAsRead = async (notificationId) => {
    try {
      await axios.post('http://localhost:5000/api/users/notifications/read', { notificationId }, {
        headers: { 'x-auth-token': localStorage.getItem('authToken') }
      });
      setNotifications(notifications.map(notification =>
        notification._id === notificationId ? { ...notification, read: true } : notification
      ));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  return (
    <Container>
      <h2>Notifications</h2>
      <ListGroup>
        {notifications.map(notification => (
          <ListGroup.Item key={notification._id} className={notification.read ? 'read' : ''}>
            <p>{notification.message}</p>
            {!notification.read && <Button onClick={() => markAsRead(notification._id)}>Mark as Read</Button>}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Notifications;
