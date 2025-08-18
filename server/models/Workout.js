const mongoose = require('mongoose');

const workoutSetSchema = new mongoose.Schema({
  reps: {
    type: Number,
    required: true,
    min: 1
  },
  weight: {
    type: Number,
    required: true,
    min: 0
  }
});

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  exerciseId: {
    type: String,
    required: true
  },
  exerciseName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  sets: [workoutSetSchema],
  notes: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient queries
workoutSchema.index({ userId: 1, date: -1 });
workoutSchema.index({ userId: 1, exerciseId: 1, date: -1 });

module.exports = mongoose.model('Workout', workoutSchema);