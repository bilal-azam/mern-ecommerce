const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const notificationRoutes = require('./notifications');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');
const stripe = require('../config/stripe');

const YOUR_DOMAIN = 'http://localhost:5000';
const router = express.Router();

// Use notification routes
app.use('/api/notifications', notificationRoutes);

// Create order
router.post('/', auth, async (req, res) => {
  const { items, totalPrice } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice * 100, // Amount in cents
      currency: 'usd',
      description: 'Order payment',
      payment_method: req.body.paymentMethodId,
      confirm: true,
    });

    const order = new Order({
      userId: req.user._id,
      items,
      totalPrice,
      paymentIntentId: paymentIntent.id,
    });

    await order.save();

    // Notify user
    await axios.post('http://localhost:5000/api/notifications', {
      userId: req.user._id,
      message: `Your order #${order._id} has been successfully placed.`,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ msg: 'Payment failed or Order creation failed' });
  }
});

// Get user's orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create order with payment intent
router.post('/checkout', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(400).json({ msg: 'No items in cart' });

    const total = cart.items.reduce((acc, item) => acc + item.quantity * item.productId.price, 0);

    // Create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total * 100, // Amount in cents
      currency: 'usd',
      metadata: { integration_check: 'accept_a_payment' }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get user's order history
router.get('/history', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
