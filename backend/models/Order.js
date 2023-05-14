const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Order', OrderSchema);
