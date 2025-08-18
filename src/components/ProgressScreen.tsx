import React, { useState, useMemo } from 'react';
import { storage } from '../utils/storage';
import { exercises } from '../data/exercises';
import { WorkoutEntry, ProgressData } from '../types';
import { TrendingUp, Calendar } from 'lucide-react';

const ProgressScreen: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState<string>('');
  const [workouts, setWorkouts] = useState<WorkoutEntry[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const data = await storage.getWorkouts();
        setWorkouts(data);
      } catch (error) {
        console.error('Error loading workouts:', error);
      } finally {
        setLoading(false);
      }
    };
    loadWorkouts();
  }, []);

  // Get unique exercises from workout history
  const availableExercises = useMemo(() => {
    const exerciseIds = [...new Set(workouts.map(w => w.exerciseId))];
    return exerciseIds
      .map(id => exercises.find(ex => ex.id === id))
      .filter(Boolean)
      .sort((a, b) => (a?.name || '').localeCompare(b?.name || ''));
  }, [workouts]);

  // Calculate progress data for selected exercise
  const progressData = useMemo((): ProgressData[] => {
    if (!selectedExercise) return [];

    const exerciseWorkouts = workouts
      .filter(w => w.exerciseId === selectedExercise)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return exerciseWorkouts.map(workout => {
      const maxWeight = Math.max(...workout.sets.map(set => set.weight));
      const totalVolume = workout.sets.reduce((sum, set) => sum + (set.reps * set.weight), 0);
      const totalReps = workout.sets.reduce((sum, set) => sum + set.reps, 0);

      return {
        date: workout.date,
        maxWeight,
        totalVolume,
        totalReps
      };
    });
  }, [selectedExercise, workouts]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  const getProgressChange = (data: ProgressData[], metric: keyof ProgressData) => {
    if (data.length < 2) return null;
    
    const first = data[0][metric] as number;
    const last = data[data.length - 1][metric] as number;
    const change = ((last - first) / first) * 100;
    
    return {
      value: change,
      isPositive: change > 0,
      absolute: Math.abs(last - first)
    };
  };

  if (loading) {
    return (
      <div className="p-4 pb-20">
        <h1 className="text-xl font-bold text-gray-900 mb-6">Progress Tracking</h1>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading progress data...</p>
        </div>
      </div>
    );
  }

  if (availableExercises.length === 0) {
    return (
      <div className="p-4 pb-20">
        <h1 className="text-xl font-bold text-gray-900 mb-6">Progress Tracking</h1>
        <div className="text-center py-12">
          <TrendingUp className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No progress data yet</h3>
          <p className="text-gray-500">Complete some workouts to track your progress</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pb-20">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Progress Tracking</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Exercise
        </label>
        <select
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Choose an exercise</option>
          {availableExercises.map((exercise) => (
            <option key={exercise!.id} value={exercise!.id}>
              {exercise!.name}
            </option>
          ))}
        </select>
      </div>

      {selectedExercise && progressData.length > 0 && (
        <div className="space-y-6">
          {/* Progress Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Max Weight Progress */}
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Max Weight</h3>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  {progressData[progressData.length - 1]?.maxWeight}kg
                </span>
                {(() => {
                  const change = getProgressChange(progressData, 'maxWeight');
                  return change && (
                    <span className={`text-sm font-medium ${change.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {change.isPositive ? '+' : ''}{change.absolute}kg
                    </span>
                  );
                })()}
              </div>
            </div>

            {/* Total Volume Progress */}
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Latest Volume</h3>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  {progressData[progressData.length - 1]?.totalVolume}kg
                </span>
                {(() => {
                  const change = getProgressChange(progressData, 'totalVolume');
                  return change && (
                    <span className={`text-sm font-medium ${change.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {change.isPositive ? '+' : ''}{change.absolute}kg
                    </span>
                  );
                })()}
              </div>
            </div>

            {/* Total Sessions */}
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Sessions</h3>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  {progressData.length}
                </span>
                <Calendar size={20} className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Progress Chart (Simple Line Visualization) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Max Weight Progress</h3>
            <div className="relative">
              <div className="flex justify-between items-end h-40 space-x-2">
                {progressData.map((data, index) => {
                  const maxHeight = Math.max(...progressData.map(d => d.maxWeight));
                  const height = (data.maxWeight / maxHeight) * 100;
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="bg-blue-600 rounded-t-md w-full transition-all duration-300 hover:bg-blue-700"
                        style={{ height: `${height}%` }}
                        title={`${data.maxWeight}kg on ${formatDate(data.date)}`}
                      />
                      <span className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left">
                        {formatDate(data.date)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Sessions */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Recent Sessions</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {progressData.slice(-5).reverse().map((data, index) => (
                <div key={index} className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{formatDate(data.date)}</p>
                      <p className="text-sm text-gray-600">
                        Max: {data.maxWeight}kg • Volume: {data.totalVolume}kg • Reps: {data.totalReps}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedExercise && progressData.length === 0 && (
        <div className="text-center py-12">
          <TrendingUp className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No data for this exercise</h3>
          <p className="text-gray-500">Complete workouts for this exercise to see progress</p>
        </div>
      )}
    </div>
  );
};

export default ProgressScreen;