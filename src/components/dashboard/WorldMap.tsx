
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { mockRiskEvents } from '../../data/mockData';
import { motion } from 'framer-motion';
import { Info, Maximize2 } from 'lucide-react';
import { TacticalBadge } from '@/components/ui/tactical-badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useCodexStore } from '@/store/codexStore';

interface WorldMapProps {
  className?: string;
}

const WorldMap: React.FC<WorldMapProps> = ({ className }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { openCodex } = useCodexStore();

  useEffect(() => {
    // In a real app, we would use a mapping library like MapboxGL or Leaflet
    // For this mockup, we'll just place pins on a static world map image
    if (mapRef.current) {
      const mapContainer = mapRef.current;
      mapContainer.innerHTML = '';

      mockRiskEvents.forEach(event => {
        const pin = document.createElement('div');
        pin.className = `
          absolute w-3 h-3 rounded-full map-marker-pulse cursor-pointer
          ${event.riskLevel === 'High' ? 'risk-high' : 
            event.riskLevel === 'Medium' ? 'risk-medium' : 'risk-low'}
        `;
        
        // Convert lat/long to approximate positions within the container
        // Note: This is very simplified positioning for demo purposes
        const left = ((event.longitude + 180) / 360) * 100;
        const top = ((90 - event.latitude) / 180) * 100;
        
        pin.style.left = `${left}%`;
        pin.style.top = `${top}%`;
        
        // Add tooltip on hover
        pin.title = `${event.title} - ${event.location}`;
        
        // Add click handler to open codex
        pin.addEventListener('click', () => {
          openCodex(event.id);
        });
        
        mapContainer.appendChild(pin);
      });
    }
  }, [openCodex]);

  // Risk counts
  const highRiskCount = mockRiskEvents.filter(event => event.riskLevel === 'High').length;
  const mediumRiskCount = mockRiskEvents.filter(event => event.riskLevel === 'Medium').length;
  const lowRiskCount = mockRiskEvents.filter(event => event.riskLevel === 'Low').length;

  return (
    <Card className={`${className} overflow-hidden relative`}>
      <CardContent className="p-0 relative h-full">
        {/* Map legends and controls */}
        <div className="absolute top-4 left-4 z-20 flex gap-2 items-center">
          <TacticalBadge variant="high" glow="strong" animation="pulse" interactive>
            <span className="flex items-center">
              High Risk ({highRiskCount})
            </span>
          </TacticalBadge>
          <TacticalBadge variant="medium" glow="subtle" interactive>
            <span className="flex items-center">
              Medium Risk ({mediumRiskCount})
            </span>
          </TacticalBadge>
          <TacticalBadge variant="low" glow="subtle" interactive>
            <span className="flex items-center">
              Low Risk ({lowRiskCount})
            </span>
          </TacticalBadge>
        </div>
        
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-theme-dark-700/80 backdrop-blur-sm text-theme-blue-400 p-2 rounded-lg text-sm flex items-center gap-2 border border-theme-blue-500/30 hover:border-theme-blue-500/50 hover:bg-theme-dark-600/80 hover:shadow-[0_0_15px_rgba(0,116,245,0.15)] transition-all duration-300"
                >
                  <Info size={16} />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="left" className="bg-theme-dark-700/90 backdrop-blur-md border-theme-dark-600">
                <p>Global Risk Indicators</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-theme-dark-700/80 backdrop-blur-sm text-theme-blue-400 p-2 rounded-lg text-sm flex items-center gap-2 border border-theme-blue-500/30 hover:border-theme-blue-500/50 hover:bg-theme-dark-600/80 hover:shadow-[0_0_15px_rgba(0,116,245,0.15)] transition-all duration-300"
                >
                  <Maximize2 size={16} />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="left" className="bg-theme-dark-700/90 backdrop-blur-md border-theme-dark-600">
                <p>Expand Map</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="absolute bottom-4 left-4 z-20 bg-theme-dark-800/90 backdrop-blur-md py-1.5 px-3 rounded-lg border border-theme-dark-600/80 text-sm font-medium text-white/90">
          Global Risk Map
        </div>
        
        <div className="absolute bottom-4 right-4 z-20">
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(0,116,245,0.3)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openCodex('1')}
            className="bg-theme-dark-700/80 backdrop-blur-sm text-theme-blue-400 px-4 py-1.5 rounded-lg text-sm flex items-center gap-2 border border-theme-blue-500/30 hover:border-theme-blue-500/50 hover:bg-theme-dark-600/80 transition-all duration-300"
          >
            View Codex
          </motion.button>
        </div>
        
        <div ref={mapRef} className="relative w-full h-full">
          <div className="absolute inset-0 bg-theme-dark-800 flex items-center justify-center">
            <div className="w-full h-full relative">
              {/* Atmospheric glow effects */}
              <div className="absolute inset-0 bg-gradient-radial from-theme-blue-700/10 via-transparent to-transparent opacity-50" style={{ top: '30%', left: '30%' }}></div>
              <div className="absolute inset-0 bg-gradient-radial from-theme-purple-500/5 via-transparent to-transparent opacity-50" style={{ top: '60%', left: '70%' }}></div>
              
              {/* World map image background */}
              <div className="absolute inset-0 opacity-30">
                <motion.div
                  animate={{
                    rotateZ: [0, 2, 0, -2, 0],
                  }}
                  transition={{
                    duration: 120,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                  className="w-full h-full"
                >
                  <svg viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M600,300 m-300,0 a300,300 0 1,0 600,0 a300,300 0 1,0 -600,0" stroke="currentColor" strokeWidth="1" fill="none" />
                    <path d="M300,300 h600 M600,0 v600 M150,150 L1050,450 M150,450 L1050,150" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
                    {/* This is a simplified world map representation */}
                    <path d="M200,200 Q400,100 600,200 T1000,200 M300,300 Q500,250 700,300 T1100,300 M200,400 Q400,350 600,400 T1000,400" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
                    
                    {/* Add grid lines for a more tactical feel */}
                    <path d="M0,0 h1200 M0,100 h1200 M0,200 h1200 M0,300 h1200 M0,400 h1200 M0,500 h1200 M0,600 h1200" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.1" />
                    <path d="M0,0 v600 M100,0 v600 M200,0 v600 M300,0 v600 M400,0 v600 M500,0 v600 M600,0 v600 M700,0 v600 M800,0 v600 M900,0 v600 M1000,0 v600 M1100,0 v600 M1200,0 v600" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.1" />
                  </svg>
                </motion.div>
              </div>
              
              {/* Scanning effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-transparent via-theme-blue-500/5 to-transparent"
                animate={{
                  top: ['-100%', '100%'],
                }}
                transition={{
                  duration: 3,
                  ease: "linear",
                  repeat: Infinity,
                  repeatDelay: 5
                }}
              />
              
              {/* Map markers will be added here by the useEffect */}
            </div>
          </div>
        </div>
        
        {/* Enhance the global CSS for marker animation in index.css */}
        <style jsx>{`
          .map-marker-pulse {
            box-shadow: 0 0 0 rgba(255, 255, 255, 0.4);
            animation: pulse 2s infinite;
          }
          
          .risk-high {
            background-color: #ea384c;
            box-shadow: 0 0 0 rgba(234, 56, 76, 0.4);
          }
          
          .risk-medium {
            background-color: #f97316;
            box-shadow: 0 0 0 rgba(249, 115, 22, 0.4);
          }
          
          .risk-low {
            background-color: #10b981;
            box-shadow: 0 0 0 rgba(16, 185, 129, 0.4);
          }
          
          @keyframes pulse {
            0% {
              transform: scale(0.95);
              box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
            }
            
            70% {
              transform: scale(1);
              box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
            }
            
            100% {
              transform: scale(0.95);
              box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
            }
          }
        `}</style>
      </CardContent>
    </Card>
  );
};

export default WorldMap;
