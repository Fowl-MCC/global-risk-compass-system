
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockPredictions } from '../data/mockData';

const Forecasts: React.FC = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">AI Threat Forecasting</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-theme-purple-500 mr-2 animate-pulse"></div>
              <CardTitle>AI Generated Predictions</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPredictions.map((prediction) => (
                <div 
                  key={prediction.id} 
                  className="p-4 border border-theme-dark-500 rounded-md bg-gradient-to-r from-theme-dark-800 to-theme-dark-700"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-theme-purple-600 hover:bg-theme-purple-700">
                      {prediction.confidence}% Confidence
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Timeframe: {prediction.timeframe}
                    </span>
                  </div>
                  <p className="text-lg mb-3">{prediction.text}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className={`
                      ${prediction.impact === 'High' ? 'border-danger text-danger' : 
                        prediction.impact === 'Medium' ? 'border-warning text-warning' : 
                        'border-success text-success'}
                    `}>
                      {prediction.impact} Impact
                    </Badge>
                    <button className="text-sm text-primary hover:underline">
                      View Related Events
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Historical Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col">
                <div className="bg-theme-dark-700 p-3 rounded-t-md">
                  <span className="font-medium">Prediction Accuracy by Category</span>
                </div>
                <div className="border border-theme-dark-600 rounded-b-md">
                  <div className="p-3 border-b border-theme-dark-600 flex justify-between">
                    <span>Supply Chain Disruptions</span>
                    <span className="font-mono">89%</span>
                  </div>
                  <div className="p-3 border-b border-theme-dark-600 flex justify-between">
                    <span>Political Events</span>
                    <span className="font-mono">76%</span>
                  </div>
                  <div className="p-3 border-b border-theme-dark-600 flex justify-between">
                    <span>Natural Disasters</span>
                    <span className="font-mono">82%</span>
                  </div>
                  <div className="p-3 flex justify-between">
                    <span>Economic Changes</span>
                    <span className="font-mono">78%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Request Custom Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-6 text-center border border-dashed border-theme-dark-500 rounded-md bg-theme-dark-800">
              <p className="mb-4 text-muted-foreground">
                Use AI to generate custom forecasts based on specific scenarios or events.
              </p>
              <button className="px-4 py-2 bg-theme-purple-600 hover:bg-theme-purple-700 text-white rounded-md transition-colors">
                Generate Custom Forecast
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Forecasts;
