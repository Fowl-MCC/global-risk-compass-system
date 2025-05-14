
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, CommandInput, CommandList, CommandGroup, CommandItem, CommandEmpty, CommandSeparator } from '@/components/ui/command';
import { useCommandStore } from '@/store/commandStore';
import { useCodexStore } from '@/store/codexStore';
import { 
  Brain, 
  Boxes, 
  Sun, 
  Moon, 
  Search, 
  FileText, 
  Globe, 
  Atom, 
  X, 
  ChevronRight
} from 'lucide-react';

const commandGroups = [
  {
    heading: 'Navigation',
    commands: [
      { name: 'Dashboard', icon: <Globe className="h-4 w-4" />, action: () => window.location.href = '/' },
      { name: 'Risk Map', icon: <Globe className="h-4 w-4" />, action: () => window.location.href = '/risk-map' },
      { name: 'News Feed', icon: <FileText className="h-4 w-4" />, action: () => window.location.href = '/news' },
      { name: 'Markets', icon: <Boxes className="h-4 w-4" />, action: () => window.location.href = '/markets' },
      { name: 'AI Forecasts', icon: <Brain className="h-4 w-4" />, action: () => window.location.href = '/forecasts' },
    ]
  },
  {
    heading: 'Actions',
    commands: [
      { name: 'Analyze Current Event', icon: <Brain className="h-4 w-4" />, action: () => console.log('Analyzing event...') },
      { name: 'Open Sector Forecast', icon: <FileText className="h-4 w-4" />, action: () => console.log('Opening forecast...') },
      { name: 'Toggle Theme', icon: <Sun className="h-4 w-4" />, action: () => console.log('Toggling theme...') },
    ]
  },
  {
    heading: 'Codex',
    commands: [
      { name: 'Open Codex: Taiwan Semiconductors', icon: <FileText className="h-4 w-4" />, action: () => console.log('Opening codex entry...') },
      { name: 'Open Codex: OPEC Meeting', icon: <FileText className="h-4 w-4" />, action: () => console.log('Opening codex entry...') },
      { name: 'Open Codex: Pacific Rim Storms', icon: <FileText className="h-4 w-4" />, action: () => console.log('Opening codex entry...') },
    ]
  },
  {
    heading: 'Special Features',
    commands: [
      { name: 'Boot Hyperspace Focus Mode', icon: <Atom className="h-4 w-4" />, action: () => document.body.classList.add('focus-mode') },
    ]
  }
];

const EnhancedCommandPalette: React.FC = () => {
  const { isOpen, setIsOpen } = useCommandStore();
  const [inputValue, setInputValue] = useState('');
  
  const handleCommandSelect = (command: any) => {
    command.action();
    setIsOpen(false);
    setInputValue('');
  };
  
  // Ripple effect on activation
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.2 } 
    }
  };
  
  // Ripple animation for focus mode
  const rippleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 30, 
      opacity: 0,
      transition: { duration: 1.5, ease: "easeOut" } 
    }
  };
  
  // Animation for command items
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.3 }
    })
  };
  
  if (!isOpen) return null;
  
  const handleClose = () => {
    setIsOpen(false);
    setInputValue('');
  };
  
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div className="absolute" initial="hidden" animate="visible" variants={rippleVariants}>
          <div className="w-4 h-4 rounded-full bg-theme-blue-500 opacity-0" />
        </motion.div>
        
        <motion.div 
          className="max-w-2xl w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="relative overflow-hidden rounded-2xl border border-theme-dark-500 bg-theme-dark-700/80 backdrop-blur-xl shadow-2xl">
            <button 
              className="absolute right-4 top-4 rounded-md p-1 text-theme-dark-100/70 hover:bg-theme-dark-600 hover:text-theme-dark-100 focus:outline-none"
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
            </button>
            
            <div className="relative border-b border-theme-dark-600">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
              <input
                className="w-full border-0 bg-transparent py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-0 sm:text-sm placeholder:text-muted-foreground"
                placeholder="Search commands..."
                autoFocus
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {commandGroups.map((group, groupIndex) => (
                <div key={group.heading} className="px-2 py-1.5">
                  <h3 className="text-xs font-medium text-muted-foreground px-2 mb-1.5">{group.heading}</h3>
                  <div className="space-y-1">
                    {group.commands
                      .filter(command => 
                        command.name.toLowerCase().includes(inputValue.toLowerCase())
                      )
                      .map((command, i) => (
                        <motion.div
                          key={command.name}
                          custom={i}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <button
                            className="command-item-hover w-full rounded-md px-2 py-1.5 text-left text-sm flex items-center justify-between"
                            onClick={() => handleCommandSelect(command)}
                          >
                            <div className="flex items-center">
                              <div className="mr-2 bg-theme-dark-600 rounded p-1">
                                {command.icon}
                              </div>
                              <span>{command.name}</span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </motion.div>
                      ))}
                  </div>
                  {groupIndex < commandGroups.length - 1 && (
                    <div className="my-2 border-t border-theme-dark-600" />
                  )}
                </div>
              ))}
              {!commandGroups.some(group => 
                group.commands.some(command => 
                  command.name.toLowerCase().includes(inputValue.toLowerCase())
                )
              ) && (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  No commands found.
                </div>
              )}
            </div>
            
            <div className="border-t border-theme-dark-600 p-3 flex justify-between items-center text-xs text-muted-foreground">
              <div>
                <span>Eyes of the World</span>
                <span className="mx-2">•</span>
                <span>Command Palette</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-theme-dark-500 bg-theme-dark-700 px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EnhancedCommandPalette;
