const express = require('express');
const Workout = require('../models/Workout');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all workouts for user
router.get('/', auth, async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user._id })
      .sort({ date: -1 });
    
    res.json(workouts);
  } catch (error) {
    console.error('Get workouts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new workout
router.post('/', auth, async (req, res) => {
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

    const workout = new Workout({
      userId: req.user._id,
      exerciseId,
      exerciseName,
      category,
      sets,
      notes: notes || ''
    });

    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    console.error('Create workout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete workout
router.delete('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    await Workout.findByIdAndDelete(req.params.id);
    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    console.error('Delete workout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get workouts by exercise
router.get('/exercise/:exerciseId', auth, async (req, res) => {
  try {
    const workouts = await Workout.find({
      userId: req.user._id,
      exerciseId: req.params.exerciseId
    }).sort({ date: 1 });

    res.json(workouts);
  } catch (error) {
    console.error('Get exercise workouts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;