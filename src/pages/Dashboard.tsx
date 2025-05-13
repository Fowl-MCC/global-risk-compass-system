
import React from 'react';
import { motion } from 'framer-motion';
import WorldMap from '../components/dashboard/WorldMap';
import EventList from '../components/dashboard/EventList';
import StockWatchlist from '../components/dashboard/StockWatchlist';
import ThreatPredictor from '../components/dashboard/ThreatPredictor';
import NewsFeed from '../components/dashboard/NewsFeed';
import { useCodexStore } from '../store/codexStore';

const Dashboard: React.FC = () => {
  const { openCodex } = useCodexStore();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: 'spring', 
        damping: 15, 
        stiffness: 100 
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="md:col-span-2 lg:col-span-2 flex flex-col gap-4"
        variants={itemVariants}
      >
        <HolographicPanel className="h-[300px] relative overflow-hidden">
          <div className="absolute inset-0">
            <WorldMap className="h-full" />
          </div>
          <div className="absolute top-2 left-2 bg-theme-dark-800/80 backdrop-blur-sm px-3 py-1 rounded-md border border-theme-dark-600 text-sm font-medium">
            Global Risk Heatmap
          </div>
          <motion.button 
            className="absolute bottom-2 right-2 bg-theme-blue-600/80 backdrop-blur-sm px-3 py-1 rounded-md text-xs"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openCodex('1')}
          >
            View Codex Entry
          </motion.button>
        </HolographicPanel>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          <StockWatchlistPanel />
          <ThreatPredictorPanel />
        </div>
      </motion.div>
      
      <motion.div 
        className="lg:col-span-1 flex flex-col"
        variants={itemVariants}
      >
        <HolographicPanel className="flex-1">
          <div className="h-full overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-medium text-primary">Event Feed</h2>
              <span className="text-xs bg-theme-dark-600 px-2 py-1 rounded text-warning">5 new alerts</span>
            </div>
            <EventList className="flex-1" />
          </div>
        </HolographicPanel>
      </motion.div>
      
      <motion.div 
        className="lg:col-span-1 flex flex-col"
        variants={itemVariants}
      >
        <HolographicPanel className="flex-1">
          <div className="h-full overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-medium text-primary">News Feed</h2>
              <span className="text-xs bg-theme-dark-600 px-2 py-1 rounded">Last updated 3m ago</span>
            </div>
            <NewsFeed className="flex-1" />
          </div>
        </HolographicPanel>
      </motion.div>
    </motion.div>
  );
};

const HolographicPanel: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={`relative rounded-lg bg-theme-dark-700/40 backdrop-blur-sm border border-theme-dark-600/50 overflow-hidden shadow-lg ${className}`}>
      {/* Holographic glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-theme-blue-500/5 to-theme-purple-600/5 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      
      {/* Top highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-theme-blue-500/30 to-transparent pointer-events-none" />
      
      {/* Panel content */}
      <div className="p-4 h-full relative z-10">
        {children}
      </div>
    </div>
  );
};

const StockWatchlistPanel: React.FC = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: 'spring', 
        damping: 15, 
        stiffness: 100 
      }
    }
  };
  
  return (
    <motion.div variants={itemVariants}>
      <HolographicPanel className="h-full">
        <div className="h-full overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-medium text-primary">Market Watch</h2>
            <span className="text-xs bg-theme-blue-600/20 px-2 py-1 rounded text-theme-blue-400">LIVE</span>
          </div>
          <StockWatchlist />
        </div>
      </HolographicPanel>
    </motion.div>
  );
};

const ThreatPredictorPanel: React.FC = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: 'spring', 
        damping: 15, 
        stiffness: 100 
      }
    }
  };
  
  return (
    <motion.div variants={itemVariants}>
      <HolographicPanel className="h-full">
        <div className="h-full overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-medium bg-gradient-to-r from-theme-blue-400 to-theme-purple-500 bg-clip-text text-transparent">
              AI Forecast
            </h2>
            <div className="flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-theme-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-theme-purple-500"></span>
              </span>
              <span className="text-xs">Predicting</span>
            </div>
          </div>
          <ThreatPredictor />
        </div>
      </HolographicPanel>
    </motion.div>
  );
};

export default Dashboard;
