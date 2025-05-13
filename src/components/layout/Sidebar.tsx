
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Globe, 
  BarChart3, 
  Newspaper, 
  Briefcase, 
  MapPin, 
  Brain,
  Settings,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const navItems = [
    { icon: Globe, label: 'Dashboard', path: '/' },
    { icon: Newspaper, label: 'News Feed', path: '/news' },
    { icon: MapPin, label: 'Risk Map', path: '/risk-map' },
    { icon: Briefcase, label: 'Markets', path: '/markets' },
    { icon: BarChart3, label: 'Analysis', path: '/analysis' },
    { icon: Brain, label: 'AI Forecasts', path: '/forecasts' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <div 
      className={cn(
        "bg-sidebar h-full flex flex-col border-r border-theme-dark-600 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 h-16">
        {!collapsed && (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-theme-blue-500 to-theme-purple-600 flex items-center justify-center mr-2">
              <span className="font-bold">E</span>
            </div>
            <span className="font-bold text-lg">EyesWorld</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          className={cn("p-1", collapsed && "mx-auto")}
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft className={cn(
            "h-5 w-5 transition-transform", 
            collapsed && "rotate-180"
          )} />
        </Button>
      </div>
      
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center py-2 px-3 rounded-md transition-colors",
                  isActive 
                    ? "bg-theme-dark-600 text-primary" 
                    : "text-sidebar-foreground hover:bg-theme-dark-700",
                  collapsed ? "justify-center" : ""
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="ml-3">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4">
        {!collapsed && (
          <div className="p-3 rounded-lg bg-theme-dark-700 text-center">
            <p className="text-xs text-muted-foreground">Threat Level</p>
            <p className="text-lg font-bold text-warning">ELEVATED</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
