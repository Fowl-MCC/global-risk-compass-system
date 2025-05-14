
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { mockRiskEvents } from '../data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HolographicCard } from '@/components/ui/holographic-card';
import { TacticalBadge } from '@/components/ui/tactical-badge';
import { Globe, Activity, Boxes, MapPin, Info } from 'lucide-react';
import { useCodexStore } from '../store/codexStore';

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
        <h1 className="text-2xl font-bold tracking-wider text-white">Global Risk Heatmap</h1>
        
        <div className="flex items-center space-x-4">
          <TacticalBadge variant="default" leftIcon={<Info className="h-3 w-3" />}>
            Last Updated: 4 minutes ago
          </TacticalBadge>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="map" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="bg-theme-dark-700/50 backdrop-blur-md p-1 rounded-xl">
              <TabsTrigger 
                value="map" 
                className="data-[state=active]:bg-theme-dark-600 data-[state=active]:text-white rounded-lg transition-all duration-300 px-4"
              >
                <Globe className="h-4 w-4 mr-2" />
                Map View
              </TabsTrigger>
              <TabsTrigger 
                value="regions" 
                className="data-[state=active]:bg-theme-dark-600 data-[state=active]:text-white rounded-lg transition-all duration-300 px-4"
              >
                <MapPin className="h-4 w-4 mr-2" />
                By Region
              </TabsTrigger>
              <TabsTrigger 
                value="sectors" 
                className="data-[state=active]:bg-theme-dark-600 data-[state=active]:text-white rounded-lg transition-all duration-300 px-4"
              >
                <Boxes className="h-4 w-4 mr-2" />
                By Sector
              </TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <TacticalBadge
                variant={activeFilter === 'all' ? "default" : "dark"}
                interactive
                glow={activeFilter === 'all' ? "subtle" : "none"}
                onClick={() => setActiveFilter('all')}
              >
                All Events
              </TacticalBadge>
              <TacticalBadge
                variant={activeFilter === 'political' ? "default" : "dark"}
                interactive
                glow={activeFilter === 'political' ? "subtle" : "none"}
                onClick={() => setActiveFilter('political')}
              >
                Political
              </TacticalBadge>
              <TacticalBadge
                variant={activeFilter === 'natural' ? "default" : "dark"}
                interactive
                glow={activeFilter === 'natural' ? "subtle" : "none"}
                onClick={() => setActiveFilter('natural')}
              >
                Natural
              </TacticalBadge>
              <TacticalBadge
                variant={activeFilter === 'economic' ? "default" : "dark"}
                interactive
                glow={activeFilter === 'economic' ? "subtle" : "none"}
                onClick={() => setActiveFilter('economic')}
              >
                Economic
              </TacticalBadge>
            </div>
          </div>

          <TabsContent value="map" className="mt-0">
            <HolographicCard glowColor="blue" className="overflow-hidden">
              <CardContent className="p-0 h-[calc(100vh-250px)]">
                <div className="w-full h-full bg-theme-dark-700 relative">
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    <TacticalBadge variant="high" glow="subtle" animation="pulse">
                      <span className="flex items-center">
                        <Activity className="h-3 w-3 mr-1" />
                        3 High Alerts
                      </span>
                    </TacticalBadge>
                    <TacticalBadge variant="medium" glow="subtle">
                      <span className="flex items-center">
                        <Activity className="h-3 w-3 mr-1" />
                        7 Medium Alerts
                      </span>
                    </TacticalBadge>
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <button
                      className="bg-theme-dark-700/80 backdrop-blur-sm text-theme-blue-400 px-5 py-1.5 rounded-lg text-sm flex items-center gap-2 border border-theme-dark-600 hover:border-theme-blue-500/30 hover:bg-theme-dark-600/80 transition-all duration-300"
                      onClick={() => openCodex('1')}
                    >
                      View Codex Entry
                    </button>
                  </div>

                  {/* World Map Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-xl font-bold mb-2">Interactive Risk Map</p>
                      <p className="text-muted-foreground">
                        In a complete implementation, this would display an interactive map showing global risk hotspots.
                      </p>
                    </div>
                  </div>

                  {/* Sample risk markers with improved visibility */}
                  {filteredEvents.map((event) => (
                    <motion.div 
                      key={event.id}
                      className={`
                        absolute w-4 h-4 rounded-full map-marker-pulse z-10 cursor-pointer
                        ${event.riskLevel === 'High' ? 'risk-high' : 
                          event.riskLevel === 'Medium' ? 'risk-medium' : 'risk-low'}
                      `}
                      style={{
                        left: `${((event.longitude + 180) / 360) * 100}%`,
                        top: `${((90 - event.latitude) / 180) * 100}%`
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 260, 
                        damping: 20,
                        delay: Math.random() * 0.5 
                      }}
                      whileHover={{ 
                        scale: 1.5, 
                        boxShadow: event.riskLevel === 'High' 
                          ? '0 0 15px rgba(234, 56, 76, 0.7)' 
                          : event.riskLevel === 'Medium'
                            ? '0 0 15px rgba(249, 115, 22, 0.7)'
                            : '0 0 15px rgba(16, 185, 129, 0.7)'
                      }}
                      title={`${event.title} - ${event.location}`}
                    />
                  ))}
                </div>
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
                      className="p-4 border border-theme-dark-600 rounded-xl bg-theme-dark-700/50 backdrop-blur-sm hover:bg-theme-dark-600/50 transition-all duration-300"
                      whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)' }}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium">{region}</h3>
                        <TacticalBadge
                          variant={region === 'Asia' ? 'high' : region === 'Europe' ? 'medium' : 'low'}
                          size="sm"
                        >
                          {region === 'Asia' ? 'HIGH' : region === 'Europe' ? 'MEDIUM' : 'LOW'}
                        </TacticalBadge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {region === 'Asia' ? '8 active incidents' : 
                         region === 'Europe' ? '5 active incidents' : 
                         `${Math.floor(Math.random() * 4) + 1} active incidents`}
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
                      className="p-4 border border-theme-dark-600 rounded-xl bg-theme-dark-700/50 backdrop-blur-sm hover:bg-theme-dark-600/50 transition-all duration-300"
                      whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)' }}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium">{sector}</h3>
                        <TacticalBadge
                          variant={sector === 'Energy' ? 'high' : sector === 'Technology' ? 'medium' : 'low'}
                          size="sm"
                        >
                          {sector === 'Energy' ? 'HIGH' : sector === 'Technology' ? 'MEDIUM' : 'LOW'}
                        </TacticalBadge>
                      </div>
                      <div className="h-2 bg-theme-dark-600 rounded-full mt-3 overflow-hidden">
                        <div 
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
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </HolographicCard>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default RiskMap;
