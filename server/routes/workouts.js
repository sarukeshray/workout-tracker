const express = require('express');
const { db } = require('../config/firebase');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get all workouts for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const workoutsRef = db.collection('workouts');
    const snapshot = await workoutsRef
      .where('userId', '==', req.user.uid)
      .orderBy('date', 'desc')
      .get();

    const workouts = [];
    snapshot.forEach(doc => {
      workouts.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(workouts);
  } catch (error) {
    console.error('Get workouts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new workout
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { exerciseId, exerciseName, category, sets, notes } = req.body;

    // Validation
    if (!exerciseId || !exerciseName || !category || !sets || sets.length === 0) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Validate sets
    for (const set of sets) {
      if (!set.reps || !set.weight || set.reps < 1 || set.weight < 0) {
        return res.status(400).json({ message: 'Invalid set data' });
      }
    }

    const workoutData = {
      userId: req.user.uid,
      exerciseId,
      exerciseName,
      category,
      sets,
      notes: notes || '',
      date: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    const docRef = await db.collection('workouts').add(workoutData);
    
    res.status(201).json({
      id: docRef.id,
      ...workoutData
    });
  } catch (error) {
    console.error('Create workout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete workout
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const workoutRef = db.collection('workouts').doc(req.params.id);
    const workout = await workoutRef.get();

    if (!workout.exists) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    const workoutData = workout.data();
    if (workoutData.userId !== req.user.uid) {
      return res.status(403).json({ message: 'Not authorized to delete this workout' });
    }

    await workoutRef.delete();
    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    console.error('Delete workout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get workouts by exercise
router.get('/exercise/:exerciseId', authMiddleware, async (req, res) => {
  try {
    const workoutsRef = db.collection('workouts');
    const snapshot = await workoutsRef
      .where('userId', '==', req.user.uid)
      .where('exerciseId', '==', req.params.exerciseId)
      .orderBy('date', 'asc')
      .get();

    const workouts = [];
    snapshot.forEach(doc => {
      workouts.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(workouts);
  } catch (error) {
    console.error('Get exercise workouts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;