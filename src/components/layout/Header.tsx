
import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCommandStore } from '../../store/commandStore';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Header: React.FC = () => {
  const { setIsOpen } = useCommandStore();

  return (
    <header className="flex items-center justify-between p-4 border-b border-theme-dark-600">
      <div className="flex items-center">
        <h1 className="text-xl font-bold mr-8">Eyes of the World</h1>
        <Button 
          variant="outline" 
          className="flex items-center text-muted-foreground gap-2 border-theme-dark-500"
          onClick={() => setIsOpen(true)}
        >
          <Search className="w-4 h-4" />
          <span>Search...</span>
          <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-theme-dark-500 bg-theme-dark-700 px-1.5 font-mono text-[10px] font-medium opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
        <Avatar>
          <AvatarFallback className="bg-theme-blue-700 text-white">
            EW
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
