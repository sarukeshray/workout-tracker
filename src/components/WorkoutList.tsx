import React, { useState, useMemo } from 'react';
import { exercises } from '../data/exercises';
import { storage } from '../utils/storage';
import { ArrowLeft, Star, Search } from 'lucide-react';
import SearchBar from './SearchBar';

interface WorkoutListProps {
  category: string;
  onExerciseSelect: (exerciseId: string) => void;
  onBack: () => void;
}

const WorkoutList: React.FC<WorkoutListProps> = ({ category, onExerciseSelect, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = React.useState<string[]>([]);

  React.useEffect(() => {
    const loadFavorites = async () => {
      const favs = await storage.getFavorites();
      setFavorites(favs);
    };
    loadFavorites();
  }, []);

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
  
  const filteredExercises = useMemo(() => {
    let filtered = exercises.filter(ex => ex.category === category);
    
    if (searchTerm) {
      filtered = filtered.filter(ex => 
        ex.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort by favorites first, then alphabetically
    return filtered.sort((a, b) => {
      const aFav = favorites.includes(a.id);
      const bFav = favorites.includes(b.id);
      
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [category, searchTerm, favorites]);

  const toggleFavorite = (exerciseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    storage.toggleFavorite(exerciseId).then(() => {
      storage.getFavorites().then(setFavorites);
    });
  };

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center mb-4">
        <button
          onClick={onBack}
          className="mr-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">{categoryName} Exercises</h1>
      </div>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder={`Search ${categoryName.toLowerCase()} exercises...`}
      />

      <div className="space-y-2">
        {filteredExercises.map((exercise) => (
          <div
            key={exercise.id}
            onClick={() => onExerciseSelect(exercise.id)}
            className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{exercise.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{exercise.muscle}</p>
              </div>
              <button
                onClick={(e) => toggleFavorite(exercise.id, e)}
                className={`p-2 rounded-full transition-colors ${
                  favorites.includes(exercise.id)
                    ? 'text-yellow-500 hover:text-yellow-600'
                    : 'text-gray-300 hover:text-gray-400'
                }`}
              >
                <Star size={20} fill={favorites.includes(exercise.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        ))}

        {filteredExercises.length === 0 && (
          <div className="text-center py-8">
            <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500">No exercises found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutList;