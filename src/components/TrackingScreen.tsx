import React, { useState } from 'react';
import { exercises } from '../data/exercises';
import { storage } from '../utils/storage';
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react';
import { WorkoutSet, WorkoutEntry } from '../types';

interface TrackingScreenProps {
  exerciseId: string;
  onBack: () => void;
  onSaved: () => void;
}

const TrackingScreen: React.FC<TrackingScreenProps> = ({ exerciseId, onBack, onSaved }) => {
  const exercise = exercises.find(ex => ex.id === exerciseId);
  const [sets, setSets] = useState<WorkoutSet[]>([{ reps: 0, weight: 0 }]);
  const [notes, setNotes] = useState('');

  if (!exercise) {
    return <div>Exercise not found</div>;
  }

  const addSet = () => {
    setSets([...sets, { reps: 0, weight: 0 }]);
  };

  const removeSet = (index: number) => {
    if (sets.length > 1) {
      setSets(sets.filter((_, i) => i !== index));
    }
  };

  const updateSet = (index: number, field: keyof WorkoutSet, value: number) => {
    const newSets = [...sets];
    newSets[index] = { ...newSets[index], [field]: value };
    setSets(newSets);
  };

  const saveWorkout = () => {
    const validSets = sets.filter(set => set.reps > 0 && set.weight > 0);
    
    if (validSets.length === 0) {
      alert('Please add at least one set with reps and weight');
      return;
    }

    const workoutData = {
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      category: exercise.category,
      sets: validSets,
      notes: notes.trim()
    };

    storage.saveWorkout(workoutData).then(() => {
      onSaved();
    }).catch((error) => {
      console.error('Error saving workout:', error);
      alert('Error saving workout. Please try again.');
    });
  };

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="mr-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">{exercise.name}</h1>
          <p className="text-gray-600">{exercise.muscle}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Sets</h3>
            <button
              onClick={addSet}
              className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} className="mr-1" />
              Add Set
            </button>
          </div>

          <div className="space-y-3">
            {sets.map((set, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600 w-8">#{index + 1}</span>
                
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">Reps</label>
                  <input
                    type="number"
                    value={set.reps || ''}
                    onChange={(e) => updateSet(index, 'reps', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-center font-medium"
                    min="0"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={set.weight || ''}
                    onChange={(e) => updateSet(index, 'weight', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-center font-medium"
                    min="0"
                  />
                </div>

                {sets.length > 1 && (
                  <button
                    onClick={() => removeSet(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Notes (Optional)</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about tempo, rest time, form, etc..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg resize-none"
            rows={3}
          />
        </div>

        <button
          onClick={saveWorkout}
          className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
        >
          <Save size={20} className="mr-2" />
          Save Workout
        </button>
      </div>
    </div>
  );
};

export default TrackingScreen;