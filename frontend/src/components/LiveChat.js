import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';

const socket = io('http://localhost:5000');

const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('receiveMessage', (msg) => {
      setMessages([...messages, msg]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [messages]);

  const handleSend = () => {
    socket.emit('sendMessage', message);
    setMessage('');
  };

  return (
    <Container>
      <h2>Live Chat</h2>
      <ListGroup>
        {messages.map((msg, index) => (
          <ListGroup.Item key={index}>{msg}</ListGroup.Item>
        ))}
      </ListGroup>
      <Form>
        <Form.Group controlId="chatMessage">
          <Form.Control
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>
        <Button onClick={handleSend}>Send</Button>
      </Form>
    </Container>
  );
};

export default LiveChat;
