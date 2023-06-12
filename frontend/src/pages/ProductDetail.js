import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewForm from '../components/ReviewForm';
import { Container, Card, ListGroup } from 'react-bootstrap';

const ProductDetail = ({ match }) => {
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('date');
  const [reviewSummary, setReviewSummary] = useState({});
  const productId = match.params.id;

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/products/${productId}`);
      setProduct(data);
    };

    const fetchReviews = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/products/${product._id}/reviews`, {
        params: { page, limit: 5, sort }
      });
      setReviews(data);
    };

    const fetchReviewSummary = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${productId}/review-summary`);
        setReviewSummary(data);
      } catch (err) {
        console.error('Error fetching review summary:', err);
      }
    };

    fetchProduct();
    fetchReviews();
    fetchReviewSummary();
  }, [productId, page, sort]);

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
          <Card.Text>Average Rating: {product.averageRating.toFixed(1)} stars</Card.Text>
          <Card.Subtitle>Average Rating: {reviewSummary.averageRating} ({reviewSummary.totalReviews} reviews)</Card.Subtitle>
          <p>Inventory: {product.inventory}</p>
        </Card.Body>
      </Card>

      <ReviewForm productId={productId} onReviewAdded={handleReviewAdded} />

      <Container>
        <h2>Reviews</h2>
        <Form.Group controlId="sort">
          <Form.Label>Sort By</Form.Label>
          <Form.Control
            as="select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="date">Date</option>
            <option value="rating">Rating</option>
          </Form.Control>
        </Form.Group>
        <ListGroup>
          {reviews.map(review => (
            <ListGroup.Item key={review._id}>
              <h5>{review.userId.name} - {review.rating} stars</h5>
              <p>{review.comment}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</Button>
        <Button onClick={() => setPage(page + 1)}>Next</Button>
      </Container>
    </Container>
  );
};

export default ProductDetail;
