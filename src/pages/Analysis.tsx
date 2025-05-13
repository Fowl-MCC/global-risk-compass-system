
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Analysis: React.FC = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Sectoral Impact Analysis</h1>
      
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="events">Event Analysis</TabsTrigger>
          <TabsTrigger value="patterns">Pattern Recognition</TabsTrigger>
          <TabsTrigger value="correlations">Correlations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="events" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Event to Industry Mapping</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-theme-dark-500 rounded-md bg-theme-dark-700">
                  <h3 className="font-bold">Taiwan Flooding</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Semiconductors</span>
                      <span className="text-danger font-medium">High Impact</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Electronics Supply Chain</span>
                      <span className="text-warning font-medium">Medium Impact</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Consumer Electronics</span>
                      <span className="text-warning font-medium">Medium Impact</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-theme-dark-500 rounded-md bg-theme-dark-700">
                  <h3 className="font-bold">Russian Sanctions</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Energy Sector</span>
                      <span className="text-danger font-medium">High Impact</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>European Utilities</span>
                      <span className="text-danger font-medium">High Impact</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Global Banking</span>
                      <span className="text-warning font-medium">Medium Impact</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-theme-dark-500 rounded-md bg-theme-dark-700">
                  <h3 className="font-bold">US Port Strike</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Retail</span>
                      <span className="text-warning font-medium">Medium Impact</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Automotive</span>
                      <span className="text-warning font-medium">Medium Impact</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Food Distribution</span>
                      <span className="text-warning font-medium">Medium Impact</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="patterns" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Pattern recognition analysis would be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="correlations" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Correlation analysis would be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analysis;
