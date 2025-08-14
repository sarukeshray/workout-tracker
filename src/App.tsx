import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HomeScreen from './components/HomeScreen';
import WorkoutList from './components/WorkoutList';
import TrackingScreen from './components/TrackingScreen';
import HistoryScreen from './components/HistoryScreen';
import ProgressScreen from './components/ProgressScreen';

type Screen = 'home' | 'category' | 'exercise' | 'tracking' | 'history' | 'progress';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedExercise, setSelectedExercise] = useState<string>('');

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentScreen('category');
  };

  const handleExerciseSelect = (exerciseId: string) => {
    setSelectedExercise(exerciseId);
    setCurrentScreen('tracking');
  };

  const handleBack = () => {
    if (currentScreen === 'category') {
      setCurrentScreen('home');
    } else if (currentScreen === 'tracking') {
      setCurrentScreen('category');
    }
  };

  const handleScreenChange = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const handleWorkoutSaved = () => {
    setCurrentScreen('home');
    // Show success message
    setTimeout(() => {
      alert('Workout saved successfully! 💪');
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
        {currentScreen === 'home' && (
          <HomeScreen onCategorySelect={handleCategorySelect} />
        )}
        
        {currentScreen === 'category' && (
          <WorkoutList
            category={selectedCategory}
            onExerciseSelect={handleExerciseSelect}
            onBack={handleBack}
          />
        )}
        
        {currentScreen === 'tracking' && (
          <TrackingScreen
            exerciseId={selectedExercise}
            onBack={handleBack}
            onSaved={handleWorkoutSaved}
          />
        )}
        
        {currentScreen === 'history' && <HistoryScreen />}
        
        {currentScreen === 'progress' && <ProgressScreen />}
      </main>

      <Navigation 
        currentScreen={currentScreen} 
        onScreenChange={handleScreenChange} 
      />
    </div>
  );
}

export default App;