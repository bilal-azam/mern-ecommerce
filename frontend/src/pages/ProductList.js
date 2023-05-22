import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductFilter from '../components/ProductFilter';
import { Container, Row, Col, Card } from 'react-bootstrap';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('http://localhost:5000/api/products', { params: filters });
      setProducts(data);
    };

    fetchProducts();
  }, [filters]);

  return (
    <Container>
      <ProductFilter onFilter={setFilters} />

      <Row>
        {products.map(product => (
          <Col key={product._id} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>${product.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
