import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, ListGroup, Button } from 'react-bootstrap';

const WishList = () => {
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/wishlist', {
          headers: { 'x-auth-token': localStorage.getItem('authToken') }
        });
        setWishList(data);
      } catch (err) {
        console.error('Error fetching wish list:', err);
      }
    };

    fetchWishList();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await axios.post('http://localhost:5000/api/wishlist/remove', { productId }, {
        headers: { 'x-auth-token': localStorage.getItem('authToken') }
      });
      setWishList(wishList.filter(product => product._id !== productId));
    } catch (err) {
      console.error('Error removing item from wish list:', err);
    }
  };

  return (
    <Container>
      <h2>Wish List</h2>
      <ListGroup>
        {wishList.map(product => (
          <ListGroup.Item key={product._id}>
            <h5>{product.name} - ${product.price}</h5>
            <Button onClick={() => handleRemove(product._id)}>Remove</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default WishList;
