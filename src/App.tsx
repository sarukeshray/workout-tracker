import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import Header from './components/Header';
import Navigation from './components/Navigation';
import HomeScreen from './components/HomeScreen';
import WorkoutList from './components/WorkoutList';
import TrackingScreen from './components/TrackingScreen';
import HistoryScreen from './components/HistoryScreen';
import ProgressScreen from './components/ProgressScreen';

type Screen = 'home' | 'category' | 'exercise' | 'tracking' | 'history' | 'progress';
type AuthScreen = 'login' | 'register';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [authScreen, setAuthScreen] = useState<AuthScreen>('login');
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        {authScreen === 'login' && (
          <LoginScreen onSwitchToRegister={() => setAuthScreen('register')} />
        )}
        {authScreen === 'register' && (
          <RegisterScreen onSwitchToLogin={() => setAuthScreen('login')} />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
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
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;