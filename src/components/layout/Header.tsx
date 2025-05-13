
import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCommandStore } from '../../store/commandStore';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Header: React.FC = () => {
  const { setIsOpen } = useCommandStore();

  return (
    <header className="flex items-center justify-between p-8 border-b border-theme-dark-600">
      <div className="flex items-center gap-8">
        <h1 className="text-2xl font-bold tracking-wide">Eyes of the World</h1>
        <Button 
          variant="outline" 
          className="flex items-center text-muted-foreground gap-3 border-theme-dark-500 px-6 py-5 rounded-xl"
          onClick={() => setIsOpen(true)}
        >
          <Search className="w-4 h-4" />
          <span className="tracking-wide">Search...</span>
          <kbd className="ml-3 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-theme-dark-500 bg-theme-dark-700 px-2 font-mono text-[10px] font-medium opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>
      
      <div className="flex items-center space-x-6">
        <Button variant="outline" size="icon" className="relative h-12 w-12 rounded-xl">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-theme-blue-700 text-white text-lg">
            EW
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
