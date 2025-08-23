const express = require('express');
const { db } = require('../config/firebase');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get user's favorites
router.get('/', authMiddleware, async (req, res) => {
  try {
    const favoritesRef = db.collection('favorites');
    const snapshot = await favoritesRef
      .where('userId', '==', req.user.uid)
      .get();

    const exerciseIds = [];
    snapshot.forEach(doc => {
      exerciseIds.push(doc.data().exerciseId);
    });

    res.json(exerciseIds);
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle favorite
router.post('/toggle', authMiddleware, async (req, res) => {
  try {
    const { exerciseId } = req.body;

    if (!exerciseId) {
      return res.status(400).json({ message: 'Exercise ID is required' });
    }

    const favoritesRef = db.collection('favorites');
    const snapshot = await favoritesRef
      .where('userId', '==', req.user.uid)
      .where('exerciseId', '==', exerciseId)
      .get();

    if (!snapshot.empty) {
      // Remove from favorites
      const doc = snapshot.docs[0];
      await doc.ref.delete();
      res.json({ message: 'Removed from favorites', isFavorite: false });
    } else {
      // Add to favorites
      await favoritesRef.add({
        userId: req.user.uid,
        exerciseId,
        createdAt: new Date().toISOString()
      });
      res.json({ message: 'Added to favorites', isFavorite: true });
    }
  } catch (error) {
    console.error('Toggle favorite error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;