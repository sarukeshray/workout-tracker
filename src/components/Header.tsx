import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Workout Tracker</h1>
          <p className="text-sm text-gray-600">Welcome, {user?.username}!</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 text-gray-600">
            <User size={16} />
            <span className="text-sm">{user?.username}</span>
          </div>
          <button
            onClick={logout}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;