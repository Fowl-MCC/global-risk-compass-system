
import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCommandStore } from '../../store/commandStore';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { TacticalBadge } from '@/components/ui/tactical-badge';
import { useFocusMode } from '@/hooks/use-focus-mode';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const Header: React.FC = () => {
  const { setIsOpen } = useCommandStore();
  const { focusMode, toggleFocusMode } = useFocusMode();
  
  return (
    <motion.header 
      className="flex items-center justify-between p-8 border-b border-theme-dark-600 backdrop-blur-md bg-theme-dark-800/80"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex items-center gap-8">
        <motion.h1 
          className="text-2xl font-bold tracking-wider bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent"
          animate={{
            textShadow: ['0 0 8px rgba(255,255,255,0.3)', '0 0 16px rgba(255,255,255,0.5)', '0 0 8px rgba(255,255,255,0.3)']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Eyes of the World
        </motion.h1>
        
        <Button 
          variant="outline" 
          className="flex items-center text-muted-foreground gap-3 border-theme-dark-500 px-6 py-5 rounded-xl hover:bg-theme-dark-600 hover:border-theme-dark-400 transition-all duration-300"
          onClick={() => setIsOpen(true)}
        >
          <Search className="w-4 h-4" />
          <span className="tracking-wide hidden md:inline">Search events, regions, entities...</span>
          <span className="tracking-wide md:hidden">Search...</span>
          <kbd className="ml-3 pointer-events-none hidden md:inline-flex h-5 select-none items-center gap-1 rounded border border-theme-dark-500 bg-theme-dark-700 px-2 font-mono text-[10px] font-medium opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>
      
      <div className="flex items-center space-x-6">
        <motion.button
          className={`px-4 py-1.5 rounded-lg text-xs font-medium border border-theme-dark-600 ${
            focusMode !== 'off' ? 'bg-theme-purple-600 text-white' : 'bg-theme-dark-700 text-muted-foreground'
          }`}
          onClick={toggleFocusMode}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {focusMode === 'off' ? 'STANDARD MODE' : focusMode === 'minimal' ? 'FOCUS MODE' : 'HYPERFOCUS'}
        </motion.button>
        
        <div className="relative">
          <Button variant="outline" size="icon" className="relative h-12 w-12 rounded-xl hover:bg-theme-dark-600 hover:border-theme-dark-400 transition-all duration-300">
            <Bell className="h-5 w-5" />
            <TacticalBadge 
              variant="high"
              size="sm"
              className="absolute top-1.5 right-1.5 min-w-5 h-5"
              animation="pulse"
            >
              3
            </TacticalBadge>
          </Button>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer"
            >
              <Avatar className="h-12 w-12 ring-2 ring-theme-blue-600/30 hover:ring-theme-blue-500/50 transition-all duration-300">
                <AvatarFallback className="bg-theme-blue-700 text-white text-lg">
                  EW
                </AvatarFallback>
              </Avatar>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mr-4 bg-theme-dark-700 border-theme-dark-600 backdrop-blur-md">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-theme-dark-600/50" />
            <DropdownMenuItem className="hover:bg-theme-dark-600/70 cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-theme-dark-600/70 cursor-pointer">Settings</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-theme-dark-600/70 cursor-pointer">Help</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-theme-dark-600/50" />
            <DropdownMenuItem className="hover:bg-danger/20 text-danger cursor-pointer">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
};

export default Header;
