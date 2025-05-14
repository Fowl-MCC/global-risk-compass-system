
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WorldMap from '../components/dashboard/WorldMap';
import EventList from '../components/dashboard/EventList';
import StockWatchlist from '../components/dashboard/StockWatchlist';
import ThreatPredictor from '../components/dashboard/ThreatPredictor';
import NewsFeed from '../components/dashboard/NewsFeed';
import { useCodexStore } from '../store/codexStore';
import { HolographicCard } from '@/components/ui/holographic-card';
import { TacticalBadge } from '@/components/ui/tactical-badge';
import { Brain, ArrowUp, ArrowDown, Globe, FileText, Newspaper, AlertTriangle, Briefcase } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { openCodex } = useCodexStore();
  
  // Animation variants
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
      className="grid grid-cols-12 gap-8 p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="col-span-12 md:col-span-8 flex flex-col gap-8"
        variants={itemVariants}
      >
        <HolographicCard className="h-[380px] relative overflow-hidden" interactive>
          <div className="absolute inset-0">
            <WorldMap className="h-full" />
          </div>
          <div className="absolute top-6 left-6 bg-theme-dark-800/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-theme-dark-600 text-base font-medium tracking-wide flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Global Risk Heatmap
          </div>
          <motion.button 
            className="absolute bottom-6 right-6 bg-theme-blue-600/80 backdrop-blur-sm px-5 py-2 rounded-lg text-sm tracking-wide flex items-center gap-2 border border-theme-blue-500/30"
            whileHover={{ scale: 1.05, boxShadow: '0 0 8px rgba(51, 144, 247, 0.5)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openCodex('1')}
          >
            <FileText className="w-4 h-4" />
            View Codex Entry
          </motion.button>
          
          {/* Risk level indicators */}
          <div className="absolute top-6 right-6 flex gap-2">
            <TacticalBadge variant="high" size="sm" animation="pulse">3 High</TacticalBadge>
            <TacticalBadge variant="medium" size="sm">7 Medium</TacticalBadge>
            <TacticalBadge variant="low" size="sm">12 Low</TacticalBadge>
          </div>
        </HolographicCard>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
          <motion.div variants={itemVariants}>
            <HolographicCard className="h-full" glowColor="blue">
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-medium tracking-wide text-primary flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Market Watch
                  </h2>
                  <motion.span 
                    className="text-sm bg-theme-blue-600/20 px-3 py-1 rounded-lg text-theme-blue-400 flex items-center gap-1"
                    animate={{
                      boxShadow: ['0 0 0 rgba(51, 144, 247, 0)', '0 0 8px rgba(51, 144, 247, 0.5)', '0 0 0 rgba(51, 144, 247, 0)']
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-theme-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-theme-blue-500"></span>
                    </span>
                    LIVE
                  </motion.span>
                </div>
                <div className="flex-1 overflow-auto">
                  <StockWatchlist />
                </div>
              </div>
            </HolographicCard>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <HolographicCard className="h-full" glowColor="purple">
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <motion.h2 
                    className="text-xl font-medium tracking-wide bg-gradient-to-r from-theme-blue-400 to-theme-purple-500 bg-clip-text text-transparent flex items-center gap-2"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                    }}
                    transition={{
                      duration: 8,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  >
                    <Brain className="w-5 h-5 text-theme-purple-400" />
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
                <div className="flex-1 overflow-auto">
                  <ThreatPredictor />
                </div>
              </div>
            </HolographicCard>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div 
        className="col-span-12 md:col-span-4 flex flex-col gap-8"
        variants={itemVariants}
      >
        <HolographicCard className="flex-1" glowColor="red">
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium tracking-wide text-primary flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Event Feed
              </h2>
              <TacticalBadge variant="high" animation="pulse">
                5 new alerts
              </TacticalBadge>
            </div>
            <div className="flex-1 overflow-auto">
              <EventList />
            </div>
          </div>
        </HolographicCard>
        
        <HolographicCard className="flex-1" glowColor="blue">
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium tracking-wide text-primary flex items-center gap-2">
                <Newspaper className="w-5 h-5" />
                News Feed
              </h2>
              <span className="text-sm bg-theme-dark-600 px-3 py-1.5 rounded-lg">Last updated 3m ago</span>
            </div>
            <div className="flex-1 overflow-auto">
              <NewsFeed />
            </div>
          </div>
        </HolographicCard>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
