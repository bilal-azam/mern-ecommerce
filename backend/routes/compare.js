const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Compare products
router.post('/', async (req, res) => {
  const { productIds } = req.body;
  try {
    const products = await Product.find({ _id: { $in: productIds } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
