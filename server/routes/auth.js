const express = require('express');
const { auth, db } = require('../config/firebase');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Register user (Firebase handles this on frontend, but we can store additional data)
router.post('/register', async (req, res) => {
  try {
    const { uid, email, username } = req.body;

    if (!uid || !email || !username) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Store additional user data in Firestore
    await db.collection('users').doc(uid).set({
      email,
      username,
      createdAt: new Date().toISOString()
    });

    res.status(201).json({
      message: 'User data saved successfully',
      user: { uid, email, username }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user data
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const userDoc = await db.collection('users').doc(req.user.uid).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userData = userDoc.data();
    res.json({
      user: {
        uid: req.user.uid,
        email: userData.email,
        username: userData.username
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;