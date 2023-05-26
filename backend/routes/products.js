const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { search, minPrice, maxPrice } = req.query;
    const query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = minPrice;
      if (maxPrice) query.price.$lte = maxPrice;
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    const reviews = await Review.find({ productId: product._id });
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0;

    res.json({ ...product.toObject(), averageRating });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/:id/reviews', async (req, res) => {
  const { page = 1, limit = 10, sort = 'date' } = req.query;
  try {
    const reviews = await Review.find({ productId: req.params.id })
      .sort({ [sort]: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
