
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { mockRiskEvents } from '../data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HolographicCard } from '@/components/ui/holographic-card';
import { TacticalBadge } from '@/components/ui/tactical-badge';
import { Globe, Activity, Boxes, MapPin, Info, Command, Lightbulb } from 'lucide-react';
import { useCodexStore } from '../store/codexStore';
import WorldMap from '@/components/dashboard/WorldMap';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const RiskMap: React.FC = () => {
  const { openCodex } = useCodexStore();
  const [activeFilter, setActiveFilter] = useState<'all' | 'political' | 'natural' | 'economic'>('all');
  
  // Filter events based on selected category
  const filteredEvents = activeFilter === 'all' 
    ? mockRiskEvents 
    : mockRiskEvents.filter(event => {
        if (activeFilter === 'political') return event.categories.includes('Political');
        if (activeFilter === 'natural') return event.categories.includes('Natural Disaster');
        if (activeFilter === 'economic') return event.categories.includes('Economic');
        return true;
      });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };
  
  return (
    <motion.div 
      className="container mx-auto px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="flex items-center justify-between mb-8"
        variants={itemVariants}
      >
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-wider text-white">Global Risk Heatmap</h1>
          <p className="text-muted-foreground text-sm">Real-time visualization of global risk factors and threats</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <TacticalBadge variant="default" leftIcon={<Info className="h-3 w-3" />} glow="subtle">
            Last Updated: 4 minutes ago
          </TacticalBadge>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="sm"
                    variant="outline" 
                    className="bg-theme-dark-700/80 border-theme-dark-600 text-theme-blue-400 flex items-center gap-2 hover:bg-theme-dark-600/80 hover:border-theme-blue-500/30 hover:text-theme-blue-300"
                  >
                    <Command className="h-3.5 w-3.5" />
                    <span className="text-xs">⌘K</span>
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-theme-dark-700/90 backdrop-blur-md border-theme-dark-600">
                <p className="text-xs">Open Command Palette</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="map" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="bg-theme-dark-700/50 backdrop-blur-md p-1 rounded-xl border border-theme-dark-600/50">
              <TabsTrigger 
                value="map" 
                className="data-[state=active]:bg-theme-blue-500/20 data-[state=active]:text-theme-blue-400 data-[state=active]:shadow-[0_0_10px_rgba(0,116,245,0.2)] rounded-lg transition-all duration-300 px-4 hover:text-theme-blue-400"
              >
                <Globe className="h-4 w-4 mr-2" />
                Map View
              </TabsTrigger>
              <TabsTrigger 
                value="regions" 
                className="data-[state=active]:bg-theme-blue-500/20 data-[state=active]:text-theme-blue-400 data-[state=active]:shadow-[0_0_10px_rgba(0,116,245,0.2)] rounded-lg transition-all duration-300 px-4 hover:text-theme-blue-400"
              >
                <MapPin className="h-4 w-4 mr-2" />
                By Region
              </TabsTrigger>
              <TabsTrigger 
                value="sectors" 
                className="data-[state=active]:bg-theme-blue-500/20 data-[state=active]:text-theme-blue-400 data-[state=active]:shadow-[0_0_10px_rgba(0,116,245,0.2)] rounded-lg transition-all duration-300 px-4 hover:text-theme-blue-400"
              >
                <Boxes className="h-4 w-4 mr-2" />
                By Sector
              </TabsTrigger>
            </TabsList>
            
            <div className="flex gap-3">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <TacticalBadge
                  variant={activeFilter === 'all' ? "default" : "dark"}
                  interactive
                  glow={activeFilter === 'all' ? "subtle" : "none"}
                  onClick={() => setActiveFilter('all')}
                >
                  All Events
                </TacticalBadge>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <TacticalBadge
                  variant={activeFilter === 'political' ? "default" : "dark"}
                  interactive
                  glow={activeFilter === 'political' ? "subtle" : "none"}
                  onClick={() => setActiveFilter('political')}
                >
                  Political
                </TacticalBadge>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <TacticalBadge
                  variant={activeFilter === 'natural' ? "default" : "dark"}
                  interactive
                  glow={activeFilter === 'natural' ? "subtle" : "none"}
                  onClick={() => setActiveFilter('natural')}
                >
                  Natural
                </TacticalBadge>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <TacticalBadge
                  variant={activeFilter === 'economic' ? "default" : "dark"}
                  interactive
                  glow={activeFilter === 'economic' ? "subtle" : "none"}
                  onClick={() => setActiveFilter('economic')}
                >
                  Economic
                </TacticalBadge>
              </motion.div>
            </div>
          </div>

          <TabsContent value="map" className="mt-0">
            <HolographicCard glowColor="blue" className="overflow-hidden" glowIntensity="medium">
              <CardContent className="p-0 h-[calc(100vh-250px)]">
                <WorldMap />
              </CardContent>
            </HolographicCard>
          </TabsContent>

          <TabsContent value="regions" className="mt-6">
            <HolographicCard>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['North America', 'South America', 'Europe', 'Asia', 'Africa', 'Oceania'].map(region => (
                    <motion.div
                      key={region}
                      className="p-6 border border-theme-dark-600/50 rounded-xl bg-theme-dark-700/50 backdrop-blur-sm hover:bg-theme-dark-600/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.3)]"
                      whileHover={{ y: -5, borderColor: 'rgba(255,255,255,0.2)' }}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium text-lg">{region}</h3>
                        <TacticalBadge
                          variant={region === 'Asia' ? 'high' : region === 'Europe' ? 'medium' : 'low'}
                          size="sm"
                          glow={region === 'Asia' ? 'strong' : 'subtle'}
                        >
                          {region === 'Asia' ? 'HIGH' : region === 'Europe' ? 'MEDIUM' : 'LOW'}
                        </TacticalBadge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">
                        {region === 'Asia' ? '8 active incidents' : 
                         region === 'Europe' ? '5 active incidents' : 
                         `${Math.floor(Math.random() * 4) + 1} active incidents`}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {region === 'Asia' && (
                          <>
                            <TacticalBadge variant="high" size="sm">Political</TacticalBadge>
                            <TacticalBadge variant="medium" size="sm">Economic</TacticalBadge>
                          </>
                        )}
                        {region === 'Europe' && (
                          <>
                            <TacticalBadge variant="medium" size="sm">Economic</TacticalBadge>
                            <TacticalBadge variant="low" size="sm">Supply Chain</TacticalBadge>
                          </>
                        )}
                        {region !== 'Asia' && region !== 'Europe' && (
                          <TacticalBadge variant="low" size="sm">Stable</TacticalBadge>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </HolographicCard>
          </TabsContent>

          <TabsContent value="sectors" className="mt-6">
            <HolographicCard>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {['Technology', 'Finance', 'Energy', 'Agriculture', 'Manufacturing', 'Healthcare'].map(sector => (
                    <motion.div
                      key={sector}
                      className="p-6 border border-theme-dark-600/50 rounded-xl bg-theme-dark-700/50 backdrop-blur-sm hover:bg-theme-dark-600/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.3)]"
                      whileHover={{ y: -5, borderColor: 'rgba(255,255,255,0.2)' }}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium text-lg">{sector}</h3>
                        <TacticalBadge
                          variant={sector === 'Energy' ? 'high' : sector === 'Technology' ? 'medium' : 'low'}
                          size="sm"
                          glow={sector === 'Energy' ? 'strong' : 'subtle'}
                        >
                          {sector === 'Energy' ? 'HIGH' : sector === 'Technology' ? 'MEDIUM' : 'LOW'}
                        </TacticalBadge>
                      </div>
                      <div className="text-sm text-muted-foreground">Risk Impact Level</div>
                      <div className="h-2.5 bg-theme-dark-600/80 rounded-full mt-3 overflow-hidden">
                        <motion.div 
                          className={`h-full rounded-full ${
                            sector === 'Energy' ? 'bg-danger' : 
                            sector === 'Technology' ? 'bg-warning' : 'bg-success'
                          }`}
                          style={{ 
                            width: `${
                              sector === 'Energy' ? '85' : 
                              sector === 'Technology' ? '60' : 
                              Math.floor(Math.random() * 40) + 10
                            }%` 
                          }}
                          initial={{ width: 0 }}
                          animate={{ 
                            width: `${
                              sector === 'Energy' ? '85' : 
                              sector === 'Technology' ? '60' : 
                              Math.floor(Math.random() * 40) + 10
                            }%` 
                          }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                      <div className="mt-4 flex justify-between text-sm">
                        <span>Low</span>
                        <span>Medium</span>
                        <span>High</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </HolographicCard>
          </TabsContent>
        </Tabs>
      </motion.div>
      
      <motion.div 
        className="mt-6 text-center"
        variants={itemVariants}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-theme-blue-500/10 text-theme-blue-400 px-4 py-2 rounded-lg border border-theme-blue-500/20 hover:bg-theme-blue-500/15 hover:border-theme-blue-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,116,245,0.2)]"
              onClick={() => openCodex('global-risk')} 
            >
              <Lightbulb size={16} />
              <span>Explore Risk Intelligence Codex</span>
            </motion.button>
          </TooltipTrigger>
          <TooltipContent className="bg-theme-dark-700/90 backdrop-blur-md border-theme-dark-600">
            <p className="text-xs">View detailed analysis and forecasts</p>
          </TooltipContent>
        </Tooltip>
      </motion.div>
    </motion.div>
  );
};

export default RiskMap;
