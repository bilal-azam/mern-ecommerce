import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ProductFilter = ({ onFilter }) => {
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onFilter({ search, minPrice, maxPrice });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="search">
        <Form.Label>Search</Form.Label>
        <Form.Control
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="minPrice">
        <Form.Label>Min Price</Form.Label>
        <Form.Control
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="maxPrice">
        <Form.Label>Max Price</Form.Label>
        <Form.Control
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </Form.Group>
      <Button type="submit">Apply Filters</Button>
    </Form>
  );
};

export default ProductFilter;
