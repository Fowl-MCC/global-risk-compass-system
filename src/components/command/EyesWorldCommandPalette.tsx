
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Command, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem,
  CommandSeparator 
} from '@/components/ui/command';
import {
  Globe,
  Brain,
  BarChart3,
  AlertTriangle,
  Search,
  Zap,
  Map,
  FileText,
  Wand2,
  Moon,
  Sun,
  Lightbulb
} from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useCodexStore } from '@/store/codexStore';
import { useFocusMode } from '@/hooks/use-focus-mode';

interface CommandPaletteProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const EyesWorldCommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, setIsOpen }) => {
  const { openCodex } = useCodexStore();
  const { toggleFocusMode, focusMode } = useFocusMode();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleCommand = (action: string) => {
    switch (action) {
      case 'view-taiwan-codex':
        openCodex('1');
        break;
      case 'view-russia-codex':
        openCodex('2');
        break;
      case 'toggle-focus-mode':
        toggleFocusMode();
        break;
      // Add more commands as needed
    }
    setIsOpen(false);
  };

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.2 
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.2 
      }
    }
  };

  const commandVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
      scale: 0.98
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: 'spring',
        damping: 25,
        stiffness: 300,
        delay: 0.1
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      scale: 0.98,
      transition: { 
        duration: 0.2 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1,
      x: 0,
      transition: { 
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    }
  };

  const highlightText = (text: string) => {
    if (!searchQuery) return text;
    
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === searchQuery.toLowerCase() ? 
        <span key={index} className="bg-theme-blue-500/20 text-theme-blue-400 rounded px-1">{part}</span> : part
    );
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh]"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className="w-full max-w-2xl max-h-[85vh] overflow-hidden" 
            variants={commandVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={e => e.stopPropagation()}
          >
            <Command className="bg-theme-dark-800/90 border border-theme-dark-600 rounded-xl backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="flex items-center border-b border-theme-dark-600 px-3">
                <Search className="w-4 h-4 mr-2 text-muted-foreground" />
                <CommandInput 
                  placeholder="Search commands, codex entries, analytics..." 
                  className="h-14 text-base placeholder:text-muted-foreground/50 bg-transparent"
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                />
              </div>
              <CommandList className="py-3 max-h-[50vh] overflow-y-auto scrollbar-thin">
                <CommandEmpty className="py-6 text-center text-muted-foreground">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <Search className="w-8 h-8 text-muted-foreground/50" />
                    <p>No results found for "<span className="text-theme-blue-400">{searchQuery}</span>"</p>
                  </div>
                </CommandEmpty>
                
                <CommandGroup heading="Navigation" className="px-3 pb-2">
                  <HoverCard openDelay={300}>
                    <HoverCardTrigger asChild>
                      <motion.div variants={itemVariants}>
                        <CommandItem
                          className="flex items-center gap-2 px-3 py-2.5 hover:bg-theme-blue-500/10 cursor-pointer rounded-lg command-item-hover"
                          onSelect={() => window.location.href = '/risk-map'}
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-theme-dark-600/80 text-theme-blue-400">
                            <Globe className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-medium">{highlightText("Global Risk Map")}</div>
                            <div className="text-xs text-muted-foreground">View global threat analysis</div>
                          </div>
                          <div className="ml-auto text-xs text-muted-foreground bg-theme-dark-700 px-2 py-0.5 rounded">
                            G
                          </div>
                        </CommandItem>
                      </motion.div>
                    </HoverCardTrigger>
                    <HoverCardContent side="right" className="w-80 border-theme-dark-600 bg-theme-dark-700/80 backdrop-blur-xl p-3">
                      <div className="text-sm">
                        <div className="font-medium tracking-wide text-white mb-1">Global Risk Map</div>
                        <div className="text-xs text-muted-foreground">
                          Interactive visualization of global risk factors across regions, industries, and threat classifications.
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>

                  <motion.div variants={itemVariants}>
                    <CommandItem 
                      className="flex items-center gap-2 px-3 py-2.5 hover:bg-theme-blue-500/10 cursor-pointer rounded-lg command-item-hover"
                      onSelect={() => window.location.href = '/forecasts'}
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-theme-dark-600/80 text-theme-purple-400">
                        <Brain className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium">{highlightText("AI Forecasts")}</div>
                        <div className="text-xs text-muted-foreground">View predictive risk analytics</div>
                      </div>
                    </CommandItem>
                  </motion.div>
                </CommandGroup>
                
                <CommandSeparator className="bg-theme-dark-600/50 my-2" />
                
                <CommandGroup heading="Actions" className="px-3 pb-2">
                  <motion.div variants={itemVariants}>
                    <CommandItem 
                      className="flex items-center gap-2 px-3 py-2.5 hover:bg-theme-blue-500/10 cursor-pointer rounded-lg command-item-hover"
                      onSelect={() => handleCommand('view-taiwan-codex')}
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-theme-dark-600/80 text-theme-blue-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium">{highlightText("Open Codex: Taiwan Semiconductors")}</div>
                        <div className="text-xs text-muted-foreground">View detailed risk analysis</div>
                      </div>
                    </CommandItem>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <CommandItem 
                      className="flex items-center gap-2 px-3 py-2.5 hover:bg-theme-blue-500/10 cursor-pointer rounded-lg command-item-hover"
                      onSelect={() => handleCommand('view-russia-codex')}
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-theme-dark-600/80 text-theme-blue-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium">{highlightText("Open Codex: Russian Energy Sanctions")}</div>
                        <div className="text-xs text-muted-foreground">View detailed risk analysis</div>
                      </div>
                    </CommandItem>
                  </motion.div>
                </CommandGroup>
                
                <CommandSeparator className="bg-theme-dark-600/50 my-2" />
                
                <CommandGroup heading="System" className="px-3">
                  <motion.div variants={itemVariants}>
                    <CommandItem 
                      className="flex items-center gap-2 px-3 py-2.5 hover:bg-theme-purple-500/10 cursor-pointer rounded-lg command-item-hover"
                      onSelect={() => handleCommand('toggle-focus-mode')}
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-theme-dark-600/80 text-theme-purple-400">
                        {focusMode === 'off' ? (
                          <Lightbulb className="w-4 h-4" />
                        ) : focusMode === 'minimal' ? (
                          <Moon className="w-4 h-4" />
                        ) : (
                          <Zap className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{highlightText(`Toggle Focus Mode: ${focusMode === 'off' ? 'Standard' : focusMode === 'minimal' ? 'Focus' : 'Hyperfocus'}`)}</div>
                        <div className="text-xs text-muted-foreground">{focusMode === 'off' ? 'Enhance concentration by reducing UI elements' : 'Return to standard UI mode'}</div>
                      </div>
                    </CommandItem>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <CommandItem 
                      className="flex items-center gap-2 px-3 py-2.5 hover:bg-theme-purple-500/10 cursor-pointer rounded-lg command-item-hover"
                      onSelect={() => handleCommand('toggle-focus-mode')}
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-theme-dark-600/80 text-theme-purple-400">
                        <Wand2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium">{highlightText("Boot Hyperspace Focus Mode")}</div>
                        <div className="text-xs text-muted-foreground">Activate enhanced UI focus effects</div>
                      </div>
                      <div className="ml-auto text-xs text-muted-foreground bg-theme-purple-600/30 px-2 py-0.5 rounded text-theme-purple-300">
                        Fun
                      </div>
                    </CommandItem>
                  </motion.div>
                </CommandGroup>
              </CommandList>
            </Command>
            <div className="flex items-center justify-between mt-2 px-3 text-xs text-muted-foreground">
              <div>Press <kbd className="px-1.5 py-0.5 bg-theme-dark-700 rounded border border-theme-dark-600 font-mono text-xs mx-1">↑</kbd><kbd className="px-1.5 py-0.5 bg-theme-dark-700 rounded border border-theme-dark-600 font-mono text-xs mx-1">↓</kbd> to navigate</div>
              <div>Press <kbd className="px-1.5 py-0.5 bg-theme-dark-700 rounded border border-theme-dark-600 font-mono text-xs mx-1">Enter</kbd> to select</div>
              <div>Press <kbd className="px-1.5 py-0.5 bg-theme-dark-700 rounded border border-theme-dark-600 font-mono text-xs mx-1">Esc</kbd> to close</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EyesWorldCommandPalette;
