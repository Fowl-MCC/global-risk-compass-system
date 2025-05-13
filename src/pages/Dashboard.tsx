
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
      className="grid grid-cols-12 gap-8 h-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="col-span-12 md:col-span-8 flex flex-col gap-8"
        variants={itemVariants}
      >
        <HolographicPanel className="h-[380px] relative overflow-hidden">
          <div className="absolute inset-0">
            <WorldMap className="h-full" />
          </div>
          <div className="absolute top-6 left-6 bg-theme-dark-800/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-theme-dark-600 text-base font-medium tracking-wide">
            Global Risk Heatmap
          </div>
          <motion.button 
            className="absolute bottom-6 right-6 bg-theme-blue-600/80 backdrop-blur-sm px-5 py-2 rounded-lg text-sm tracking-wide"
            whileHover={{ scale: 1.05, boxShadow: '0 0 8px rgba(51, 144, 247, 0.5)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openCodex('1')}
          >
            View Codex Entry
          </motion.button>
        </HolographicPanel>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
          <StockWatchlistPanel variants={itemVariants} />
          <ThreatPredictorPanel variants={itemVariants} />
        </div>
      </motion.div>
      
      <motion.div 
        className="col-span-12 md:col-span-4 flex flex-col gap-8"
        variants={itemVariants}
      >
        <HolographicPanel className="flex-1">
          <div className="h-full overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium tracking-wide text-primary">Event Feed</h2>
              <motion.span 
                className="text-sm bg-theme-dark-600 px-3 py-1.5 rounded-lg text-warning"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.9, 1, 0.9]
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                5 new alerts
              </motion.span>
            </div>
            <EventList className="flex-1" />
          </div>
        </HolographicPanel>
        
        <HolographicPanel className="flex-1">
          <div className="h-full overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium tracking-wide text-primary">News Feed</h2>
              <span className="text-sm bg-theme-dark-600 px-3 py-1.5 rounded-lg">Last updated 3m ago</span>
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
    <motion.div 
      className={`relative rounded-2xl bg-theme-dark-700/40 backdrop-blur-sm border border-theme-dark-600/50 overflow-hidden shadow-lg ${className}`}
      whileHover={{
        boxShadow: [
          '0 8px 24px rgba(0, 0, 0, 0.2)',
          '0 12px 32px rgba(51, 144, 247, 0.15)'
        ],
        borderColor: 'rgba(51, 144, 247, 0.3)',
        transition: { duration: 0.3 }
      }}
    >
      {/* Holographic glow effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-theme-blue-500/5 to-theme-purple-600/5 pointer-events-none"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 15,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      
      {/* Top highlight */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-theme-blue-500/30 to-transparent pointer-events-none"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          backgroundPosition: ['0% 0%', '100% 0%'],
        }}
        transition={{
          duration: 3,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      
      {/* Panel content */}
      <div className="p-8 h-full relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

interface PanelProps {
  variants?: any;
}

const StockWatchlistPanel: React.FC<PanelProps> = ({ variants }) => {
  return (
    <motion.div variants={variants}>
      <HolographicPanel className="h-full">
        <div className="h-full overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium tracking-wide text-primary">Market Watch</h2>
            <motion.span 
              className="text-sm bg-theme-blue-600/20 px-3 py-1.5 rounded-lg text-theme-blue-400"
              animate={{
                boxShadow: ['0 0 0 rgba(51, 144, 247, 0)', '0 0 8px rgba(51, 144, 247, 0.5)', '0 0 0 rgba(51, 144, 247, 0)']
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              LIVE
            </motion.span>
          </div>
          <StockWatchlist />
        </div>
      </HolographicPanel>
    </motion.div>
  );
};

const ThreatPredictorPanel: React.FC<PanelProps> = ({ variants }) => {
  return (
    <motion.div variants={variants}>
      <HolographicPanel className="h-full">
        <div className="h-full overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <motion.h2 
              className="text-xl font-medium tracking-wide bg-gradient-to-r from-theme-blue-400 to-theme-purple-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
              }}
              transition={{
                duration: 8,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              AI Forecast
            </motion.h2>
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-theme-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-theme-purple-500"></span>
              </span>
              <span className="text-sm tracking-wide">Predicting</span>
            </div>
          </div>
          <ThreatPredictor />
        </div>
      </HolographicPanel>
    </motion.div>
  );
};

export default Dashboard;
