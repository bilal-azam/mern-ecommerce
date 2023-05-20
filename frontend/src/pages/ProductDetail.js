import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewForm from '../components/ReviewForm';
import { Container, Card, ListGroup } from 'react-bootstrap';

const ProductDetail = ({ match }) => {
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const productId = match.params.id;

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/products/${productId}`);
      setProduct(data);
    };

    const fetchReviews = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/reviews/${productId}`);
      setReviews(data);
    };

    fetchProduct();
    fetchReviews();
  }, [productId]);

  const handleReviewAdded = () => {
    axios.get(`http://localhost:5000/api/reviews/${productId}`).then(({ data }) => {
      setReviews(data);
    });
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>${product.price}</Card.Text>
        </Card.Body>
      </Card>

      <ReviewForm productId={productId} onReviewAdded={handleReviewAdded} />

      <ListGroup>
        {reviews.map(review => (
          <ListGroup.Item key={review._id}>
            <strong>{review.userId.name}</strong> - {review.rating} stars
            <p>{review.comment}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default ProductDetail;
