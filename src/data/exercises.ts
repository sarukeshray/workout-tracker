import { Exercise } from '../types';

export const exercises: Exercise[] = [
  // Chest exercises
  { id: 'bench-press', name: 'Bench Press', category: 'chest', muscle: 'Pectorals' },
  { id: 'incline-bench', name: 'Incline Bench Press', category: 'chest', muscle: 'Upper Pectorals' },
  { id: 'decline-bench', name: 'Decline Bench Press', category: 'chest', muscle: 'Lower Pectorals' },
  { id: 'incline-dumbbell-press', name: 'Incline Dumbbell Press', category: 'chest', muscle: 'Upper Pectorals' },
  { id: 'chest-flyes', name: 'Chest Flyes', category: 'chest', muscle: 'Pectorals' },
  { id: 'push-ups', name: 'Push-ups', category: 'chest', muscle: 'Pectorals' },
  { id: 'dips', name: 'Dips', category: 'chest', muscle: 'Pectorals, Triceps' },
  { id: 'cable-crossover', name: 'Cable Crossover', category: 'chest', muscle: 'Pectorals' },
  { id: 'pec-deck', name: 'Pec Deck Machine', category: 'chest', muscle: 'Pectorals' },

  // Back exercises
  { id: 'deadlift', name: 'Deadlift', category: 'back', muscle: 'Entire Back, Glutes' },
  { id: 'pull-ups', name: 'Pull-ups', category: 'back', muscle: 'Latissimus Dorsi' },
  { id: 'lat-pulldown', name: 'Lat Pulldown', category: 'back', muscle: 'Latissimus Dorsi' },
  { id: 'barbell-rows', name: 'Barbell Rows', category: 'back', muscle: 'Rhomboids, Lats' },
  { id: 'dumbbell-rows', name: 'Dumbbell Rows', category: 'back', muscle: 'Rhomboids, Lats' },
  { id: 't-bar-rows', name: 'T-Bar Rows', category: 'back', muscle: 'Middle Trapezius' },
  { id: 'cable-rows', name: 'Cable Rows', category: 'back', muscle: 'Rhomboids, Lats' },
  { id: 'face-pulls', name: 'Face Pulls', category: 'back', muscle: 'Rear Deltoids' },

  // Shoulders exercises
  { id: 'shoulder-press', name: 'Shoulder Press', category: 'shoulders', muscle: 'Deltoids' },
  { id: 'lateral-raises', name: 'Lateral Raises', category: 'shoulders', muscle: 'Side Deltoids' },
  { id: 'front-raises', name: 'Front Raises', category: 'shoulders', muscle: 'Front Deltoids' },
  { id: 'rear-delt-flyes', name: 'Rear Delt Flyes', category: 'shoulders', muscle: 'Rear Deltoids' },
  { id: 'upright-rows', name: 'Upright Rows', category: 'shoulders', muscle: 'Deltoids, Traps' },
  { id: 'shrugs', name: 'Shrugs', category: 'shoulders', muscle: 'Trapezius' },
  { id: 'arnold-press', name: 'Arnold Press', category: 'shoulders', muscle: 'All Deltoids' },

  // Arms exercises
  { id: 'bicep-curls', name: 'Bicep Curls', category: 'arms', muscle: 'Biceps' },
  { id: 'hammer-curls', name: 'Hammer Curls', category: 'arms', muscle: 'Biceps, Forearms' },
  { id: 'tricep-dips', name: 'Tricep Dips', category: 'arms', muscle: 'Triceps' },
  { id: 'tricep-extensions', name: 'Tricep Extensions', category: 'arms', muscle: 'Triceps' },
  { id: 'preacher-curls', name: 'Preacher Curls', category: 'arms', muscle: 'Biceps' },
  { id: 'close-grip-press', name: 'Close-Grip Bench Press', category: 'arms', muscle: 'Triceps' },
  { id: 'cable-curls', name: 'Cable Curls', category: 'arms', muscle: 'Biceps' },
  { id: 'unilateral-tricep-pushdown', name: 'Unilateral Tricep Pushdown', category: 'arms', muscle: 'Triceps' },

  // Legs exercises
  { id: 'squats', name: 'Squats', category: 'legs', muscle: 'Quadriceps, Glutes' },
  { id: 'leg-press', name: 'Leg Press', category: 'legs', muscle: 'Quadriceps, Glutes' },
  { id: 'leg-extensions', name: 'Leg Extensions', category: 'legs', muscle: 'Quadriceps' },
  { id: 'leg-curls', name: 'Leg Curls', category: 'legs', muscle: 'Hamstrings' },
  { id: 'calf-raises', name: 'Calf Raises', category: 'legs', muscle: 'Calves' },
  { id: 'lunges', name: 'Lunges', category: 'legs', muscle: 'Quadriceps, Glutes' },
  { id: 'romanian-deadlift', name: 'Romanian Deadlift', category: 'legs', muscle: 'Hamstrings, Glutes' },
  { id: 'hip-thrusts', name: 'Hip Thrusts', category: 'legs', muscle: 'Glutes' },

  // Core exercises
  { id: 'planks', name: 'Planks', category: 'core', muscle: 'Core' },
  { id: 'crunches', name: 'Crunches', category: 'core', muscle: 'Abdominals' },
  { id: 'russian-twists', name: 'Russian Twists', category: 'core', muscle: 'Obliques' },
  { id: 'leg-raises', name: 'Leg Raises', category: 'core', muscle: 'Lower Abs' },
  { id: 'mountain-climbers', name: 'Mountain Climbers', category: 'core', muscle: 'Core' },
  { id: 'bicycle-crunches', name: 'Bicycle Crunches', category: 'core', muscle: 'Obliques' },
  { id: 'dead-bugs', name: 'Dead Bugs', category: 'core', muscle: 'Core Stability' },

  // Full body exercises
  { id: 'burpees', name: 'Burpees', category: 'full-body', muscle: 'Full Body' },
  { id: 'thrusters', name: 'Thrusters', category: 'full-body', muscle: 'Full Body' },
  { id: 'clean-and-press', name: 'Clean and Press', category: 'full-body', muscle: 'Full Body' },
  { id: 'turkish-getups', name: 'Turkish Get-ups', category: 'full-body', muscle: 'Full Body' },
  { id: 'kettlebell-swings', name: 'Kettlebell Swings', category: 'full-body', muscle: 'Full Body' },

  // Others
  { id: 'farmers-walk', name: 'Farmer\'s Walk', category: 'others', muscle: 'Grip, Core' },
  { id: 'battle-ropes', name: 'Battle Ropes', category: 'others', muscle: 'Cardio, Core' },
  { id: 'box-jumps', name: 'Box Jumps', category: 'others', muscle: 'Plyometric' },
  { id: 'sled-push', name: 'Sled Push', category: 'others', muscle: 'Full Body' }
];

export const categories = [
  { id: 'chest', name: 'Chest', icon: '💪' },
  { id: 'back', name: 'Back', icon: '🏋️' },
  { id: 'shoulders', name: 'Shoulders', icon: '🤸' },
  { id: 'arms', name: 'Arms', icon: '💪' },
  { id: 'legs', name: 'Legs', icon: '🦵' },
  { id: 'core', name: 'Core', icon: '🔥' },
  { id: 'full-body', name: 'Full Body', icon: '🚀' },
  { id: 'others', name: 'Others', icon: '⚡' }
];