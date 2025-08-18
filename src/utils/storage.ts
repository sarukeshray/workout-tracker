import { WorkoutEntry } from '../types';
import { workoutAPI, favoriteAPI } from './api';

// Keep local storage as fallback for offline functionality
const LOCAL_STORAGE_KEY = 'workout-tracker-offline-data';
const LOCAL_FAVORITES_KEY = 'workout-favorites-offline';

export const storage = {
  getWorkouts: async (): Promise<WorkoutEntry[]> => {
    try {
      // Try to get from API first
      return await workoutAPI.getWorkouts();
    } catch (error) {
      console.error('Error loading workouts from API, using local storage:', error);
      // Fallback to local storage
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    }
  },

  saveWorkout: async (workout: Omit<WorkoutEntry, 'id' | 'date'>): Promise<WorkoutEntry> => {
    try {
      // Save to API
      const savedWorkout = await workoutAPI.createWorkout(workout);
      
      // Also save to local storage as backup
      const localWorkouts = this.getLocalWorkouts();
      localWorkouts.push(savedWorkout);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localWorkouts));
      
      return savedWorkout;
    } catch (error) {
      console.error('Error saving workout to API:', error);
      // Fallback to local storage only
      const localWorkout: WorkoutEntry = {
        ...workout,
        id: Date.now().toString(),
        date: new Date().toISOString()
      };
      const localWorkouts = this.getLocalWorkouts();
      localWorkouts.push(localWorkout);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localWorkouts));
      return localWorkout;
    }
  },

  deleteWorkout: async (workoutId: string): Promise<void> => {
    try {
      // Delete from API
      await workoutAPI.deleteWorkout(workoutId);
      
      // Also delete from local storage
      const localWorkouts = this.getLocalWorkouts();
      const filtered = localWorkouts.filter(w => w.id !== workoutId);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting workout from API:', error);
      // Fallback to local storage only
      const localWorkouts = this.getLocalWorkouts();
      const filtered = localWorkouts.filter(w => w.id !== workoutId);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
    }
  },

  getFavorites: async (): Promise<string[]> => {
    try {
      // Try to get from API first
      return await favoriteAPI.getFavorites();
    } catch (error) {
      console.error('Error loading favorites from API, using local storage:', error);
      // Fallback to local storage
      const data = localStorage.getItem(LOCAL_FAVORITES_KEY);
      return data ? JSON.parse(data) : [];
    }
  },

  toggleFavorite: async (exerciseId: string): Promise<void> => {
    try {
      // Toggle in API
      await favoriteAPI.toggleFavorite(exerciseId);
      
      // Also update local storage
      const localFavorites = this.getLocalFavorites();
      const index = localFavorites.indexOf(exerciseId);
      
      if (index > -1) {
        localFavorites.splice(index, 1);
      } else {
        localFavorites.push(exerciseId);
      }
      
      localStorage.setItem(LOCAL_FAVORITES_KEY, JSON.stringify(localFavorites));
    } catch (error) {
      console.error('Error toggling favorite in API:', error);
      // Fallback to local storage only
      const localFavorites = this.getLocalFavorites();
      const index = localFavorites.indexOf(exerciseId);
      
      if (index > -1) {
        localFavorites.splice(index, 1);
      } else {
        localFavorites.push(exerciseId);
      }
      
      localStorage.setItem(LOCAL_FAVORITES_KEY, JSON.stringify(localFavorites));
    }
  },

  // Helper methods for local storage
  getLocalWorkouts: (): WorkoutEntry[] => {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading local workouts:', error);
      return [];
    }
  },

  getLocalFavorites: (): string[] => {
    try {
      const data = localStorage.getItem(LOCAL_FAVORITES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading local favorites:', error);
      return [];
    }
  }
};