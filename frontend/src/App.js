import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import OrderHistory from './pages/OrderHistory';
import { Container } from 'react-bootstrap';
import Notifications from './pages/Notifications';
import LiveChat from './components/LiveChat';

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/chat" element={<LiveChat />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/orders" element={<PrivateRoute element={<OrderHistory />} />} />
          <Route path="/notifications" element={<PrivateRoute element={<Notifications />} />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
