
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { mockRiskEvents } from '../data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RiskMap: React.FC = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Global Risk Heatmap</h1>

      <Tabs defaultValue="map" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="regions">By Region</TabsTrigger>
          <TabsTrigger value="sectors">By Sector</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="mt-0">
          <Card className="overflow-hidden">
            <CardContent className="p-0 h-[calc(100vh-200px)]">
              <div className="w-full h-full bg-theme-dark-700 relative">
                {/* Map implementation would go here */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xl font-bold mb-2">Interactive Risk Map</p>
                    <p className="text-muted-foreground">
                      In a complete implementation, this would display an interactive map showing global risk hotspots.
                    </p>
                  </div>
                </div>

                {/* Sample risk markers */}
                {mockRiskEvents.map((event) => (
                  <div 
                    key={event.id}
                    className={`
                      absolute w-3 h-3 rounded-full map-marker-pulse
                      ${event.riskLevel === 'High' ? 'risk-high' : 
                        event.riskLevel === 'Medium' ? 'risk-medium' : 'risk-low'}
                    `}
                    style={{
                      left: `${((event.longitude + 180) / 360) * 100}%`,
                      top: `${((90 - event.latitude) / 180) * 100}%`
                    }}
                    title={`${event.title} - ${event.location}`}
                  ></div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regions" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Regional risk analysis would be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sectors" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Sectoral risk analysis would be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RiskMap;
