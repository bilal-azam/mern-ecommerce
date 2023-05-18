const express = require('express');
const paypalClient = require('../config/paypal');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');
const router = express.Router();

// Create PayPal order
router.post('/create-order', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(400).json({ msg: 'No items in cart' });

    const total = cart.items.reduce((acc, item) => acc + item.quantity * item.productId.price, 0);

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: total.toFixed(2)
        }
      }],
      application_context: {
        return_url: 'http://localhost:3000/checkout/success',
        cancel_url: 'http://localhost:3000/checkout/cancel'
      }
    });

    const order = await paypalClient.execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Capture PayPal order
router.post('/capture-order', auth, async (req, res) => {
  try {
    const { orderId } = req.body;
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    const capture = await paypalClient.execute(request);
    // Handle order completion (e.g., saving order to DB)
    res.json(capture.result);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
