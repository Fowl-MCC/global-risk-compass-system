
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
  Lightbulb,
  Command as CommandIcon,
  ChevronRight
} from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useCodexStore } from '@/store/codexStore';
import { useFocusMode } from '@/hooks/use-focus-mode';
import { TacticalBadge } from '@/components/ui/tactical-badge';

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
        <span key={index} className="bg-theme-blue-500/30 text-theme-blue-300 rounded px-1">{part}</span> : part
    );
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-[15vh]"
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
            <Command className="bg-theme-dark-800/90 border border-theme-dark-600/70 rounded-xl backdrop-blur-xl shadow-2xl shadow-black/30 overflow-hidden">
              <div className="flex items-center border-b border-theme-dark-600/70 px-3">
                <Search className="w-4 h-4 mr-2 text-theme-blue-400" />
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
                          className="flex items-center gap-2 px-3 py-3 hover:bg-theme-blue-500/10 cursor-pointer rounded-lg command-item-hover group"
                          onSelect={() => window.location.href = '/risk-map'}
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-theme-blue-500/20 text-theme-blue-400 border border-theme-blue-500/30 group-hover:border-theme-blue-500/50 transition-all duration-300">
                            <Globe className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-medium">{highlightText("Global Risk Map")}</div>
                            <div className="text-xs text-muted-foreground">View global threat analysis</div>
                          </div>
                          
                          <TacticalBadge variant="high" size="sm" className="ml-auto" glow="subtle">
                            HIGH ALERT
                          </TacticalBadge>
                          
                          <motion.div 
                            className="text-theme-blue-400/70 ml-2"
                            initial={{ x: 0 }}
                            whileHover={{ x: 3 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                          >
                            <ChevronRight size={16} />
                          </motion.div>
                        </CommandItem>
                      </motion.div>
                    </HoverCardTrigger>
                    <HoverCardContent side="right" className="w-80 border-theme-dark-600/70 bg-theme-dark-800/90 backdrop-blur-xl p-4 rounded-xl shadow-xl">
                      <div className="text-sm space-y-2">
                        <div className="font-medium tracking-wide text-white text-base mb-1">Global Risk Map</div>
                        <div className="text-sm text-muted-foreground">
                          Interactive visualization of global risk factors across regions, industries, and threat classifications.
                        </div>
                        <div className="bg-theme-dark-700/80 p-2 rounded-lg text-xs">
                          <div className="font-medium text-white mb-1">Current Alerts</div>
                          <div className="flex items-center gap-1 text-danger mb-1">
                            <AlertTriangle size={12} />
                            3 High Priority Situations
                          </div>
                          <div className="text-muted-foreground">Updated 4 minutes ago</div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>

                  <motion.div variants={itemVariants}>
                    <CommandItem 
                      className="flex items-center gap-2 px-3 py-3 hover:bg-theme-purple-500/10 cursor-pointer rounded-lg command-item-hover group"
                      onSelect={() => window.location.href = '/forecasts'}
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-theme-purple-500/20 text-theme-purple-400 border border-theme-purple-500/30 group-hover:border-theme-purple-500/50 transition-all duration-300">
                        <Brain className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium">{highlightText("AI Forecasts")}</div>
                        <div className="text-xs text-muted-foreground">View predictive risk analytics</div>
                      </div>
                      <motion.div 
                        className="text-theme-purple-400/70 ml-auto"
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        <ChevronRight size={16} />
                      </motion.div>
                    </CommandItem>
                  </motion.div>
                </CommandGroup>
                
                <CommandSeparator className="bg-theme-dark-600/60 my-2" />
                
                <CommandGroup heading="Actions" className="px-3 pb-2">
                  <motion.div variants={itemVariants}>
                    <CommandItem 
                      className="flex items-center gap-2 px-3 py-3 hover:bg-theme-blue-500/10 cursor-pointer rounded-lg command-item-hover group"
                      onSelect={() => handleCommand('view-taiwan-codex')}
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-theme-blue-500/20 text-theme-blue-400 border border-theme-blue-500/30 group-hover:border-theme-blue-500/50 transition-all duration-300">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium">{highlightText("Open Codex: Taiwan Semiconductors")}</div>
                        <div className="text-xs text-muted-foreground">View detailed risk analysis</div>
                      </div>
                      <motion.div 
                        className="text-theme-blue-400/70 ml-auto"
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        <ChevronRight size={16} />
                      </motion.div>
                    </CommandItem>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <CommandItem 
                      className="flex items-center gap-2 px-3 py-3 hover:bg-theme-blue-500/10 cursor-pointer rounded-lg command-item-hover group"
                      onSelect={() => handleCommand('view-russia-codex')}
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-theme-blue-500/20 text-theme-blue-400 border border-theme-blue-500/30 group-hover:border-theme-blue-500/50 transition-all duration-300">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium">{highlightText("Open Codex: Russian Energy Sanctions")}</div>
                        <div className="text-xs text-muted-foreground">View detailed risk analysis</div>
                      </div>
                      <motion.div 
                        className="text-theme-blue-400/70 ml-auto"
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        <ChevronRight size={16} />
                      </motion.div>
                    </CommandItem>
                  </motion.div>
                </CommandGroup>
                
                <CommandSeparator className="bg-theme-dark-600/60 my-2" />
                
                <CommandGroup heading="System" className="px-3">
                  <motion.div variants={itemVariants}>
                    <CommandItem 
                      className="flex items-center gap-2 px-3 py-3 hover:bg-theme-purple-500/10 cursor-pointer rounded-lg command-item-hover group"
                      onSelect={() => handleCommand('toggle-focus-mode')}
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-theme-purple-500/20 text-theme-purple-400 border border-theme-purple-500/30 group-hover:border-theme-purple-500/50 transition-all duration-300">
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
                      <motion.div 
                        className="text-theme-purple-400/70 ml-auto"
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        <ChevronRight size={16} />
                      </motion.div>
                    </CommandItem>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <CommandItem 
                      className="flex items-center gap-2 px-3 py-3 hover:bg-theme-purple-500/10 cursor-pointer rounded-lg command-item-hover group"
                      onSelect={() => handleCommand('toggle-focus-mode')}
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-theme-purple-500/20 text-theme-purple-400 border border-theme-purple-500/30 group-hover:border-theme-purple-500/50 transition-all duration-300">
                        <Wand2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium">{highlightText("Boot Hyperspace Focus Mode")}</div>
                        <div className="text-xs text-muted-foreground">Activate enhanced UI focus effects</div>
                      </div>
                      <TacticalBadge variant="default" size="sm" className="ml-auto" glow="subtle">
                        <span className="text-theme-purple-300">FUN</span>
                      </TacticalBadge>
                      <motion.div 
                        className="text-theme-purple-400/70 ml-1"
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        <ChevronRight size={16} />
                      </motion.div>
                    </CommandItem>
                  </motion.div>
                </CommandGroup>
              </CommandList>
            </Command>
            <div className="flex items-center justify-between mt-3 px-4 text-xs text-muted-foreground">
              <motion.div className="flex items-center gap-2" variants={itemVariants}>
                <CommandIcon size={14} className="text-theme-blue-400" />
                <span>Command Palette</span>
              </motion.div>
              <motion.div className="flex items-center gap-2" variants={itemVariants}>
                <kbd className="px-1.5 py-0.5 bg-theme-dark-700/80 rounded border border-theme-dark-600 font-mono text-xs mx-1">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-theme-dark-700/80 rounded border border-theme-dark-600 font-mono text-xs mx-1">↓</kbd>
                <span>to navigate</span>
                <kbd className="px-2.5 py-0.5 bg-theme-dark-700/80 rounded border border-theme-dark-600 font-mono text-xs mx-1">Enter</kbd>
                <span>to select</span>
                <kbd className="px-2.5 py-0.5 bg-theme-dark-700/80 rounded border border-theme-dark-600 font-mono text-xs mx-1">Esc</kbd>
                <span>to close</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EyesWorldCommandPalette;
