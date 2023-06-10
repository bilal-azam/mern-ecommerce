import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, ListGroup, Button } from 'react-bootstrap';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('http://localhost:5000/api/products/search', {
        params: { query, category, priceRange }
      });
      setProducts(data);
    };

    fetchProducts();
  }, [query, category, priceRange]);

  const handleFilterAndSort = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/products', {
        params: { category, sort }
      });
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

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
        <Form.Group controlId="sort">
          <Form.Label>Sort by Price</Form.Label>
          <Form.Control
            as="select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">None</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Form.Control>
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
