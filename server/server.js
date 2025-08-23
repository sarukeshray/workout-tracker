const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import Firebase config to initialize
require('./config/firebase');

const authRoutes = require('./routes/auth');
const workoutRoutes = require('./routes/workouts');
const favoriteRoutes = require('./routes/favorites');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/favorites', favoriteRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Firebase backend server is running!' });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Firebase backend server running on port ${PORT}`);
});