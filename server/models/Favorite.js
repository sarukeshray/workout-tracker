const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  exerciseId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure unique favorites per user
favoriteSchema.index({ userId: 1, exerciseId: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);