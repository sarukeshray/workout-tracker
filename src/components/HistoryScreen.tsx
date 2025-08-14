import React, { useState, useMemo } from 'react';
import { storage } from '../utils/storage';
import { WorkoutEntry } from '../types';
import { Calendar, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const HistoryScreen: React.FC = () => {
  const [workouts] = useState<WorkoutEntry[]>(() => storage.getWorkouts());
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());

  const groupedWorkouts = useMemo(() => {
    const groups: { [key: string]: WorkoutEntry[] } = {};
    
    workouts.forEach(workout => {
      const date = new Date(workout.date).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(workout);
    });

    // Sort dates in descending order (most recent first)
    const sortedEntries = Object.entries(groups).sort((a, b) => 
      new Date(b[0]).getTime() - new Date(a[0]).getTime()
    );

    return sortedEntries;
  }, [workouts]);

  const toggleDate = (date: string) => {
    const newExpanded = new Set(expandedDates);
    if (newExpanded.has(date)) {
      newExpanded.delete(date);
    } else {
      newExpanded.add(date);
    }
    setExpandedDates(newExpanded);
  };

  const deleteWorkout = (workoutId: string) => {
    if (confirm('Are you sure you want to delete this workout?')) {
      storage.deleteWorkout(workoutId);
      window.location.reload(); // Simple refresh to update the list
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  const getTotalVolume = (sets: WorkoutEntry['sets']) => {
    return sets.reduce((total, set) => total + (set.reps * set.weight), 0);
  };

  if (workouts.length === 0) {
    return (
      <div className="p-4 pb-20">
        <h1 className="text-xl font-bold text-gray-900 mb-6">Workout History</h1>
        <div className="text-center py-12">
          <Calendar className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No workouts yet</h3>
          <p className="text-gray-500">Start tracking your workouts to see your history here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pb-20">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Workout History</h1>

      <div className="space-y-4">
        {groupedWorkouts.map(([date, dateWorkouts]) => {
          const isExpanded = expandedDates.has(date);
          const totalVolume = dateWorkouts.reduce((sum, w) => sum + getTotalVolume(w.sets), 0);
          
          return (
            <div key={date} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleDate(date)}
                className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{formatDate(date)}</h3>
                    <p className="text-sm text-gray-600">
                      {dateWorkouts.length} exercise{dateWorkouts.length !== 1 ? 's' : ''} • 
                      {totalVolume.toLocaleString()}kg total volume
                    </p>
                  </div>
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-gray-100">
                  {dateWorkouts.map((workout, index) => (
                    <div key={workout.id} className={`p-4 ${index !== dateWorkouts.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-2">{workout.exerciseName}</h4>
                          
                          <div className="space-y-1 mb-3">
                            {workout.sets.map((set, setIndex) => (
                              <div key={setIndex} className="flex items-center text-sm text-gray-600">
                                <span className="w-8">#{setIndex + 1}</span>
                                <span className="font-medium">{set.reps} reps</span>
                                <span className="mx-2">×</span>
                                <span className="font-medium">{set.weight}kg</span>
                                <span className="ml-2 text-gray-400">
                                  = {(set.reps * set.weight)}kg
                                </span>
                              </div>
                            ))}
                          </div>

                          {workout.notes && (
                            <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                              <strong>Notes:</strong> {workout.notes}
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() => deleteWorkout(workout.id)}
                          className="ml-3 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryScreen;