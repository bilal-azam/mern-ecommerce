const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');
const router = express.Router();

// Create order
router.post('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(400).json({ msg: 'No items in cart' });

    const total = cart.items.reduce((acc, item) => acc + item.quantity * item.productId.price, 0);
    const order = new Order({
      userId: req.user._id,
      items: cart.items,
      total
    });

    await order.save();
    await Cart.deleteOne({ userId: req.user._id });

    res.json(order);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
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

module.exports = router;
