const express = require('express');
const Review = require('../models/Review');
const auth = require('../middleware/auth');
const router = express.Router();

// Add a review
router.post('/', auth, async (req, res) => {
  const { productId, rating, comment } = req.body;

  try {
    const review = new Review({
      productId,
      userId: req.user._id,
      rating,
      comment
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get reviews for a product
router.get('/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).populate('userId', 'name');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;