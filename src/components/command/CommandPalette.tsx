
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Globe, 
  Search, 
  Newspaper, 
  MapPin, 
  Briefcase, 
  BarChart3, 
  Brain,
  Settings,
  X
} from 'lucide-react';
import { useCommandStore } from '../../store/commandStore';

type CommandOption = {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  action: () => void;
};

export const CommandPalette: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen, setIsOpen } = useCommandStore();
  const navigate = useNavigate();

  const commandOptions: CommandOption[] = [
    {
      id: 'dashboard',
      name: 'Go to Dashboard',
      description: 'Main overview page',
      icon: Globe,
      action: () => navigate('/')
    },
    {
      id: 'news',
      name: 'Go to News Feed',
      description: 'Latest global events',
      icon: Newspaper,
      action: () => navigate('/news')
    },
    {
      id: 'risk-map',
      name: 'Go to Risk Map',
      description: 'Global risk visualization',
      icon: MapPin,
      action: () => navigate('/risk-map')
    },
    {
      id: 'markets',
      name: 'Go to Markets',
      description: 'Stock and market data',
      icon: Briefcase,
      action: () => navigate('/markets')
    },
    {
      id: 'analysis',
      name: 'Go to Analysis',
      description: 'Impact analysis tools',
      icon: BarChart3,
      action: () => navigate('/analysis')
    },
    {
      id: 'forecasts',
      name: 'Go to AI Forecasts',
      description: 'Predictive market intelligence',
      icon: Brain,
      action: () => navigate('/forecasts')
    },
    {
      id: 'settings',
      name: 'Go to Settings',
      description: 'App configuration',
      icon: Settings,
      action: () => navigate('/settings')
    },
    {
      id: 'search-events',
      name: 'Search all events',
      description: 'Find events by keyword',
      icon: Search,
      action: () => {
        // This would open a more detailed search interface
        setIsOpen(false);
        navigate('/search');
      }
    }
  ];

  const filteredOptions = searchQuery
    ? commandOptions.filter(option => 
        option.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        option.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : commandOptions;

  const handleSelect = (option: CommandOption) => {
    option.action();
    setIsOpen(false);
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  const handleEscape = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in"
      onClick={handleClickOutside}
    >
      <div 
        className="bg-theme-dark-700 rounded-lg shadow-xl w-full max-w-lg overflow-hidden animate-scale-in"
        onKeyDown={handleEscape}
      >
        <div className="p-4 border-b border-theme-dark-600 flex items-center">
          <Search className="w-5 h-5 mr-2 text-muted-foreground" />
          <input
            className="bg-transparent flex-1 outline-none placeholder:text-muted-foreground"
            placeholder="Search commands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          <button onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
          </button>
        </div>
        <div className="max-h-80 overflow-auto">
          {filteredOptions.length > 0 ? (
            <div className="py-2">
              {filteredOptions.map((option) => (
                <button
                  key={option.id}
                  className="w-full px-4 py-2 text-left hover:bg-theme-dark-600 flex items-center"
                  onClick={() => handleSelect(option)}
                >
                  <option.icon className="w-5 h-5 mr-3 text-primary" />
                  <div className="flex-1">
                    <p>{option.name}</p>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              No commands found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
