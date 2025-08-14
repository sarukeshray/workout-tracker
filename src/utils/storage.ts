import { WorkoutEntry } from '../types';

const STORAGE_KEY = 'workout-tracker-data';
const FAVORITES_KEY = 'workout-favorites';

export const storage = {
  getWorkouts: (): WorkoutEntry[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading workouts:', error);
      return [];
    }
  },

  saveWorkout: (workout: WorkoutEntry): void => {
    try {
      const workouts = storage.getWorkouts();
      workouts.push(workout);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
    } catch (error) {
      console.error('Error saving workout:', error);
    }
  },

  deleteWorkout: (workoutId: string): void => {
    try {
      const workouts = storage.getWorkouts();
      const filtered = workouts.filter(w => w.id !== workoutId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  },

  getFavorites: (): string[] => {
    try {
      const data = localStorage.getItem(FAVORITES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  },

  toggleFavorite: (exerciseId: string): void => {
    try {
      const favorites = storage.getFavorites();
      const index = favorites.indexOf(exerciseId);
      
      if (index > -1) {
        favorites.splice(index, 1);
      } else {
        favorites.push(exerciseId);
      }
      
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }
};