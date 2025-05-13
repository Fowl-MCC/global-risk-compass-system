
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { mockRiskEvents } from '../../data/mockData';

interface WorldMapProps {
  className?: string;
}

const WorldMap: React.FC<WorldMapProps> = ({ className }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a real app, we would use a mapping library like MapboxGL or Leaflet
    // For this mockup, we'll just place pins on a static world map image
    if (mapRef.current) {
      const mapContainer = mapRef.current;
      mapContainer.innerHTML = '';

      mockRiskEvents.forEach(event => {
        const pin = document.createElement('div');
        pin.className = `
          absolute w-3 h-3 rounded-full map-marker-pulse
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
        
        mapContainer.appendChild(pin);
      });
    }
  }, []);

  return (
    <Card className={`${className} overflow-hidden`}>
      <CardContent className="p-0 relative h-full">
        <div className="absolute top-4 left-4 bg-theme-dark-800/90 text-white px-3 py-1 rounded-md z-10 text-sm font-medium">
          Global Risk Map
        </div>
        <div ref={mapRef} className="relative w-full h-full">
          <div className="absolute inset-0 bg-theme-dark-800 flex items-center justify-center">
            <div className="w-full h-full relative bg-theme-dark-700">
              {/* World map image background */}
              <div className="absolute inset-0 opacity-30">
                <svg viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M600,300 m-300,0 a300,300 0 1,0 600,0 a300,300 0 1,0 -600,0" stroke="currentColor" strokeWidth="1" fill="none" />
                  <path d="M300,300 h600 M600,0 v600 M150,150 L1050,450 M150,450 L1050,150" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
                  {/* This is a simplified world map representation */}
                  <path d="M200,200 Q400,100 600,200 T1000,200 M300,300 Q500,250 700,300 T1100,300 M200,400 Q400,350 600,400 T1000,400" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
                </svg>
              </div>
              
              {/* Map markers will be added here by the useEffect */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorldMap;
