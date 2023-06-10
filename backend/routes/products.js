const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { search, minPrice, maxPrice, category, sort } = req.query;
    const query = {};

    if (category) query.category = category;

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = minPrice;
      if (maxPrice) query.price.$lte = maxPrice;
    }

    const sortOptions = sort ? { price: sort === 'asc' ? 1 : -1 } : {};

    const products = await Product.find(query).sort(sortOptions);
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

// Get product review summary
router.get('/:id/review-summary', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews');
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    const reviewSummary = product.reviews.reduce((summary, review) => {
      summary.totalReviews += 1;
      summary.totalRating += review.rating;
      return summary;
    }, { totalReviews: 0, totalRating: 0 });

    reviewSummary.averageRating = reviewSummary.totalReviews ? (reviewSummary.totalRating / reviewSummary.totalReviews).toFixed(2) : 0;

    res.json(reviewSummary);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/search', async (req, res) => {
  const { query, category, priceRange } = req.query;
  try {
    const products = await Product.find({
      $text: { $search: query },
      category: category ? category : { $exists: true },
      price: priceRange ? { $gte: priceRange.split('-')[0], $lte: priceRange.split('-')[1] } : { $exists: true },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
