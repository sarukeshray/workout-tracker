import React from 'react';
import { categories } from '../data/exercises';
import { ArrowRight } from 'lucide-react';

interface HomeScreenProps {
  onCategorySelect: (category: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onCategorySelect }) => {
  return (
    <div className="p-4 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Workout Tracker</h1>
        <p className="text-gray-600">Choose a muscle group to start your workout</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
          >
            <div className="text-center">
              <div className="text-3xl mb-2">{category.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
              <div className="flex items-center justify-center text-blue-600 group-hover:text-blue-700">
                <span className="text-sm mr-1">View exercises</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;