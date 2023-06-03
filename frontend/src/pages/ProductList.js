import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, ListGroup, Button } from 'react-bootstrap';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('http://localhost:5000/api/products/search', {
        params: { query, category, priceRange }
      });
      setProducts(data);
    };

    fetchProducts();
  }, [query, category, priceRange]);

  return (
    <Container>
      <h2>Product List</h2>
      <Form>
        <Form.Group controlId="search">
          <Form.Label>Search</Form.Label>
          <Form.Control
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="priceRange">
          <Form.Label>Price Range</Form.Label>
          <Form.Control
            type="text"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            placeholder="e.g., 10-50"
          />
        </Form.Group>
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

export default ProductList;
