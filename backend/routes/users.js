const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user._id, { name, email }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get order history
router.get('/orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate('items.productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Upload profile image
router.post('/profile/image', auth, upload.single('image'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.profileImage = req.file.path;
    await user.save();
    res.json({ profileImage: user.profileImage });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add referral
router.post('/referral', auth, async (req, res) => {
  const { referralCode } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    if (referralCode) {
      user.referralCode = referralCode;
      await user.save();
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
