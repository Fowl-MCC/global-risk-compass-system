
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Search, 
  Newspaper, 
  MapPin, 
  Briefcase, 
  BarChart3, 
  Brain,
  Settings,
  X,
  BookOpen,
  Zap,
  Moon,
  Sun,
  Rocket
} from 'lucide-react';
import { useCommandStore } from '../../store/commandStore';
import { useCodexStore } from '../../store/codexStore';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

type CommandOption = {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  action: () => void;
  category?: string;
  keywords?: string[];
};

export const CommandPalette: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen, setIsOpen } = useCommandStore();
  const { openCodex } = useCodexStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [activeTheme, setActiveTheme] = useState<'default' | 'dark'>('default');
  const [focusModeActive, setFocusModeActive] = useState(false);

  // Focus the input element when the command palette opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const toggleTheme = () => {
    setActiveTheme(activeTheme === 'default' ? 'dark' : 'default');
    toast({
      title: `Mood switched to ${activeTheme === 'default' ? 'Dark' : 'Default'}`,
      description: "Interface tone adjusted to your preference",
      duration: 2000,
    });
  };

  const activateHyperspaceFocus = () => {
    setFocusModeActive(true);
    setIsOpen(false);
    
    // Show the focus mode effect
    const focusOverlay = document.createElement('div');
    focusOverlay.className = 'fixed inset-0 bg-theme-blue-500/10 z-[100] pointer-events-none';
    document.body.appendChild(focusOverlay);
    
    // Add animation classes
    focusOverlay.animate([
      { transform: 'scale(1)', opacity: 0 },
      { transform: 'scale(1.5)', opacity: 0.3 },
      { transform: 'scale(2)', opacity: 0 }
    ], { duration: 1500, iterations: 1 });
    
    setTimeout(() => {
      document.body.removeChild(focusOverlay);
      toast({
        title: "Hyperspace Focus Mode Activated",
        description: "All distractions neutralized. Time to focus.",
        duration: 3000,
      });
    }, 1500);
  };

  const commandOptions: CommandOption[] = [
    // Navigation commands
    {
      id: 'dashboard',
      name: 'Go to Dashboard',
      description: 'Main overview page',
      icon: Globe,
      action: () => navigate('/'),
      category: 'navigation',
      keywords: ['home', 'main', 'overview']
    },
    {
      id: 'news',
      name: 'Go to News Feed',
      description: 'Latest global events',
      icon: Newspaper,
      action: () => navigate('/news'),
      category: 'navigation',
      keywords: ['events', 'updates', 'articles']
    },
    {
      id: 'risk-map',
      name: 'Go to Risk Map',
      description: 'Global risk visualization',
      icon: MapPin,
      action: () => navigate('/risk-map'),
      category: 'navigation',
      keywords: ['threats', 'global', 'map', 'risks']
    },
    {
      id: 'markets',
      name: 'Go to Markets',
      description: 'Stock and market data',
      icon: Briefcase,
      action: () => navigate('/markets'),
      category: 'navigation',
      keywords: ['stocks', 'finance', 'economy']
    },
    {
      id: 'analysis',
      name: 'Go to Analysis',
      description: 'Impact analysis tools',
      icon: BarChart3,
      action: () => navigate('/analysis'),
      category: 'navigation',
      keywords: ['data', 'impact', 'metrics']
    },
    {
      id: 'forecasts',
      name: 'Go to AI Forecasts',
      description: 'Predictive market intelligence',
      icon: Brain,
      action: () => navigate('/forecasts'),
      category: 'navigation',
      keywords: ['predictions', 'ai', 'future']
    },
    {
      id: 'settings',
      name: 'Go to Settings',
      description: 'App configuration',
      icon: Settings,
      action: () => navigate('/settings'),
      category: 'navigation',
      keywords: ['config', 'preferences', 'options']
    },
    
    // Action commands
    {
      id: 'analyze-event',
      name: 'Analyze this Event',
      description: 'Perform impact analysis on current event',
      icon: Zap,
      action: () => {
        setIsOpen(false);
        toast({
          title: "Event Analysis Initiated",
          description: "Scanning and correlating all related data points...",
          duration: 3000,
        });
      },
      category: 'action',
      keywords: ['analyze', 'event', 'impact', 'assessment']
    },
    {
      id: 'open-sector-forecast',
      name: 'Open Sector Forecast',
      description: 'View AI predictions for market sectors',
      icon: Brain,
      action: () => {
        navigate('/forecasts');
        setIsOpen(false);
        toast({
          title: "Sector Forecast Ready",
          description: "AI predictions and market sector analysis loaded",
          duration: 3000,
        });
      },
      category: 'action',
      keywords: ['forecast', 'sector', 'prediction', 'market']
    },
    {
      id: 'toggle-mood',
      name: 'Toggle Mood',
      description: 'Switch between interface themes',
      icon: activeTheme === 'default' ? Moon : Sun,
      action: toggleTheme,
      category: 'system',
      keywords: ['theme', 'dark', 'light', 'mode', 'ui']
    },
    {
      id: 'open-codex-taiwan',
      name: 'Open Codex: Taiwan Semiconductors',
      description: 'View intelligence report on semiconductor industry',
      icon: BookOpen,
      action: () => {
        openCodex('taiwan-semiconductors');
        setIsOpen(false);
      },
      category: 'codex',
      keywords: ['taiwan', 'semiconductors', 'chips', 'tech', 'report', 'intel']
    },
    {
      id: 'hyperspace-focus',
      name: 'Boot Hyperspace Focus Mode',
      description: 'Eliminate distractions for deep work',
      icon: Rocket,
      action: activateHyperspaceFocus,
      category: 'system',
      keywords: ['focus', 'concentrate', 'distraction', 'hyperspace', 'work']
    },
    {
      id: 'search-events',
      name: 'Search all events',
      description: 'Find events by keyword',
      icon: Search,
      action: () => {
        setIsOpen(false);
        navigate('/search');
      },
      category: 'search',
      keywords: ['find', 'search', 'query', 'events']
    }
  ];

  // Filter commands based on search query
  const filteredOptions = searchQuery
    ? commandOptions.filter(option => 
        option.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        option.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        option.keywords?.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : commandOptions;

  // Group commands by category
  const groupedOptions = filteredOptions.reduce((acc, option) => {
    const category = option.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(option);
    return acc;
  }, {} as Record<string, CommandOption[]>);

  // Order categories
  const orderedCategories = ['navigation', 'action', 'codex', 'system', 'search', 'other'];

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
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={handleClickOutside}
      >
        <motion.div 
          className="bg-theme-dark-800/90 border border-theme-dark-600/50 rounded-lg shadow-xl w-full max-w-lg overflow-hidden"
          initial={{ y: -20, scale: 0.95, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: -20, scale: 0.95, opacity: 0 }}
          transition={{ 
            type: 'spring', 
            damping: 25, 
            stiffness: 300 
          }}
          onKeyDown={handleEscape}
        >
          <div className="p-4 border-b border-theme-dark-600 flex items-center bg-theme-dark-700/50">
            <Search className="w-5 h-5 mr-2 text-theme-blue-400" />
            <input
              ref={inputRef}
              className="bg-transparent flex-1 outline-none placeholder:text-muted-foreground text-theme-blue-100"
              placeholder="Search commands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <motion.button 
              onClick={() => setIsOpen(false)}
              whileHover={{ rotate: 90 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </motion.button>
          </div>
          <div className="max-h-[70vh] overflow-auto">
            {filteredOptions.length > 0 ? (
              <div className="py-2">
                {orderedCategories.map(category => {
                  const options = groupedOptions[category];
                  if (!options || options.length === 0) return null;
                  
                  return (
                    <div key={category} className="mb-2">
                      <div className="px-4 py-1 text-xs uppercase tracking-wider text-muted-foreground">
                        {category}
                      </div>
                      {options.map((option, index) => (
                        <motion.button
                          key={option.id}
                          className="w-full px-4 py-3 text-left hover:bg-theme-blue-600/20 flex items-center group"
                          onClick={() => handleSelect(option)}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            delay: index * 0.05,
                            type: 'spring',
                            stiffness: 200, 
                            damping: 20 
                          }}
                          whileHover={{ 
                            backgroundColor: 'rgba(51, 144, 247, 0.2)',
                            transition: { duration: 0.1 }  
                          }}
                        >
                          <div className="rounded-full p-2 bg-theme-dark-600/50 text-primary mr-3 group-hover:bg-theme-blue-600/30">
                            <option.icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-foreground group-hover:text-theme-blue-400 transition-colors">{option.name}</p>
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  );
                })}
              </div>
            ) : (
              <motion.div 
                className="p-8 text-center text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No commands found matching "{searchQuery}"
              </motion.div>
            )}
          </div>
          
          <div className="p-2 border-t border-theme-dark-600 bg-theme-dark-700/50">
            <div className="flex justify-between items-center px-4 py-2">
              <div className="text-xs text-muted-foreground">
                <kbd className="px-1.5 py-0.5 bg-theme-dark-600 rounded text-xs mr-1">↑↓</kbd>
                to navigate
              </div>
              <div className="text-xs text-muted-foreground">
                <kbd className="px-1.5 py-0.5 bg-theme-dark-600 rounded text-xs mr-1">Enter</kbd>
                to select
              </div>
              <div className="text-xs text-muted-foreground">
                <kbd className="px-1.5 py-0.5 bg-theme-dark-600 rounded text-xs mr-1">Esc</kbd>
                to close
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
