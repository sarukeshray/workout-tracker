// Type definitions for the workout tracker app
export interface Exercise {
  id: string;
  name: string;
  category: string;
  muscle: string;
  description?: string;
}

export interface WorkoutSet {
  reps: number;
  weight: number;
}

export interface WorkoutEntry {
  id: string;
  exerciseId: string;
  exerciseName: string;
  sets: WorkoutSet[];
  notes?: string;
  date: string;
  category: string;
}

export interface ProgressData {
  date: string;
  maxWeight: number;
  totalVolume: number;
  totalReps: number;
}

export type Category = 
  | 'chest' 
  | 'back' 
  | 'shoulders' 
  | 'arms' 
  | 'legs' 
  | 'core' 
  | 'full-body' 
  | 'others';