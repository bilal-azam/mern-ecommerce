import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, ListGroup, Button } from 'react-bootstrap';

const AdminDashboard = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/reviews', {
          headers: { 'x-auth-token': localStorage.getItem('authToken') }
        });
        setReviews(data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };

    fetchReviews();
  }, []);

  const handleModerate = async (reviewId, approved) => {
    try {
      await axios.post('http://localhost:5000/api/reviews/moderate', { reviewId, approved }, {
        headers: { 'x-auth-token': localStorage.getItem('authToken') }
      });
      setReviews(reviews.filter(review => review._id !== reviewId));
    } catch (err) {
      console.error('Error moderating review:', err);
    }
  };

  return (
    <Container>
      <h2>Admin Dashboard</h2>
      <ListGroup>
        {reviews.map(review => (
          <ListGroup.Item key={review._id}>
            <h5>{review.userId.name} - {review.rating} stars</h5>
            <p>{review.comment}</p>
            <Button onClick={() => handleModerate(review._id, true)}>Approve</Button>
            <Button onClick={() => handleModerate(review._id, false)}>Reject</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default AdminDashboard;
