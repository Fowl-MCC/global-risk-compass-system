
import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
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
import { useCommandStore } from '../../store/commandStore';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const { setIsOpen } = useCommandStore();
  
  const navItems = [
    { icon: Globe, label: 'Dashboard', path: '/', unlocked: true },
    { icon: Newspaper, label: 'News Feed', path: '/news', unlocked: true },
    { icon: MapPin, label: 'Risk Map', path: '/risk-map', unlocked: true },
    { icon: Briefcase, label: 'Markets', path: '/markets', unlocked: true },
    { icon: BarChart3, label: 'Analysis', path: '/analysis', unlocked: true },
    { icon: Brain, label: 'AI Forecasts', path: '/forecasts', unlocked: true },
    { icon: Settings, label: 'Settings', path: '/settings', unlocked: true }
  ];

  return (
    <div 
      className={cn(
        "bg-sidebar h-full flex flex-col border-r border-theme-dark-600 transition-all duration-300 relative z-10",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 h-16">
        {!collapsed && (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-theme-blue-500 to-theme-purple-600 flex items-center justify-center mr-2 shadow-lg shadow-theme-blue-500/20">
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
      
      <nav className="flex-1 py-4 relative">
        {/* Constellation line effect */}
        <div className="absolute left-8 top-4 bottom-24 w-[1px] bg-gradient-to-b from-theme-purple-600/10 via-theme-blue-500/30 to-theme-purple-600/10"></div>
        
        <TooltipProvider>
          <ul className="space-y-6 px-2 relative">
            {navItems.map((item, index) => (
              <li key={item.path} className="relative">
                {/* Connecting dots */}
                {index > 0 && item.unlocked && (
                  <div className="absolute left-[23px] -top-6 h-6 w-[1px] bg-theme-blue-500/30"></div>
                )}
                
                {!item.unlocked ? (
                  <div className={cn(
                    "flex items-center py-2 px-3 opacity-40",
                    collapsed ? "justify-center" : ""
                  )}>
                    <div className="h-5 w-5 rounded-full border border-theme-dark-400 flex-shrink-0"></div>
                    {!collapsed && <span className="ml-3 text-theme-dark-300">Locked</span>}
                  </div>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) => cn(
                          "group flex items-center py-2 px-3 rounded-md transition-all relative z-10",
                          isActive 
                            ? "text-primary" 
                            : "text-sidebar-foreground hover:text-theme-blue-500",
                          collapsed ? "justify-center" : ""
                        )}
                      >
                        {/* Star icon with glow effect */}
                        <motion.div 
                          className={cn(
                            "flex-shrink-0 rounded-full p-1 bg-theme-dark-700 relative",
                            "border border-transparent",
                            "group-hover:border-theme-blue-500/50",
                            "group-hover:shadow-lg group-hover:shadow-theme-blue-500/20"
                          )}
                          whileHover={{ scale: 1.15 }}
                        >
                          <item.icon className="h-5 w-5" />
                          
                          {/* Glow effect */}
                          <motion.div
                            className="absolute inset-0 rounded-full bg-theme-blue-500/10 blur-md -z-10"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                              duration: 3,
                              ease: "easeInOut",
                              repeat: Infinity,
                            }}
                          />
                        </motion.div>
                        
                        {!collapsed && (
                          <span className="ml-3 text-sm tracking-wide">{item.label}</span>
                        )}
                      </NavLink>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right" className="border-theme-dark-600 bg-theme-dark-700">
                        {item.label}
                      </TooltipContent>
                    )}
                  </Tooltip>
                )}
              </li>
            ))}
          </ul>
        </TooltipProvider>
      </nav>
      
      <div className="p-4">
        {!collapsed ? (
          <div 
            className="p-3 rounded-lg bg-theme-dark-700/50 border border-theme-dark-600 cursor-pointer hover:bg-theme-dark-700 transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Command Palette</p>
              <div className="text-xs bg-theme-dark-600 px-1.5 py-0.5 rounded text-muted-foreground">⌘K</div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <motion.div
                className="h-2 w-2 rounded-full bg-warning mr-2"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
              <p className="font-medium">ELEVATED RISK</p>
            </div>
          </div>
        ) : (
          <motion.div
            className="mx-auto h-8 w-8 rounded-full flex items-center justify-center cursor-pointer bg-theme-dark-700/50 border border-theme-dark-600"
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(true)}
            animate={{
              boxShadow: ['0 0 0 rgba(51, 144, 247, 0)', '0 0 8px rgba(51, 144, 247, 0.5)', '0 0 0 rgba(51, 144, 247, 0)']
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity
            }}
          >
            <span className="text-xs text-muted-foreground">⌘K</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
