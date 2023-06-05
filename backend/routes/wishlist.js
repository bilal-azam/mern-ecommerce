const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// Add item to wish list
router.post('/add', auth, async (req, res) => {
  const { productId } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    if (!user.wishList.includes(productId)) {
      user.wishList.push(productId);
      await user.save();
    }

    res.json(user.wishList);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get user's wish list
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishList');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user.wishList);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
