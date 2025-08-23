import axios from 'axios';
import { auth } from '../config/firebase';
import { WorkoutEntry } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add Firebase auth token to requests
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, Firebase will handle re-authentication
      console.error('Authentication error:', error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: async (userData: { uid: string; username: string; email: string }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

export const workoutAPI = {
  getWorkouts: async (): Promise<WorkoutEntry[]> => {
    const response = await api.get('/workouts');
    return response.data;
  },

  createWorkout: async (workout: Omit<WorkoutEntry, 'id' | 'date'>) => {
    const response = await api.post('/workouts', workout);
    return response.data;
  },

  deleteWorkout: async (workoutId: string) => {
    const response = await api.delete(`/workouts/${workoutId}`);
    return response.data;
  },

  getWorkoutsByExercise: async (exerciseId: string) => {
    const response = await api.get(`/workouts/exercise/${exerciseId}`);
    return response.data;
  }
};

export const favoriteAPI = {
  getFavorites: async (): Promise<string[]> => {
    const response = await api.get('/favorites');
    return response.data;
  },

  toggleFavorite: async (exerciseId: string) => {
    const response = await api.post('/favorites/toggle', { exerciseId });
    return response.data;
  }
};

export default api;