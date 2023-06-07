import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, ListGroup, Button } from 'react-bootstrap';

const ProductComparison = () => {
  const [productIds, setProductIds] = useState([]);
  const [products, setProducts] = useState([]);

  const handleCompare = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/compare', { productIds });
      setProducts(data);
    } catch (err) {
      console.error('Error comparing products:', err);
    }
  };

  return (
    <Container>
      <h2>Product Comparison</h2>
      <Form>
        <Form.Group controlId="productIds">
          <Form.Label>Enter Product IDs (comma separated)</Form.Label>
          <Form.Control
            type="text"
            value={productIds}
            onChange={(e) => setProductIds(e.target.value.split(',').map(id => id.trim()))}
          />
        </Form.Group>
        <Button onClick={handleCompare}>Compare</Button>
      </Form>
      <ListGroup>
        {products.map(product => (
          <ListGroup.Item key={product._id}>
            <h5>{product.name} - ${product.price}</h5>
            <p>{product.description}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default ProductComparison;
