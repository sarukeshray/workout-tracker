const express = require('express');
const Favorite = require('../models/Favorite');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user's favorites
router.get('/', auth, async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user._id });
    const exerciseIds = favorites.map(fav => fav.exerciseId);
    res.json(exerciseIds);
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle favorite
router.post('/toggle', auth, async (req, res) => {
  try {
    const { exerciseId } = req.body;

    if (!exerciseId) {
      return res.status(400).json({ message: 'Exercise ID is required' });
    }

    const existingFavorite = await Favorite.findOne({
      userId: req.user._id,
      exerciseId
    });

    if (existingFavorite) {
      // Remove from favorites
      await Favorite.findByIdAndDelete(existingFavorite._id);
      res.json({ message: 'Removed from favorites', isFavorite: false });
    } else {
      // Add to favorites
      const favorite = new Favorite({
        userId: req.user._id,
        exerciseId
      });
      await favorite.save();
      res.json({ message: 'Added to favorites', isFavorite: true });
    }
  } catch (error) {
    console.error('Toggle favorite error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;