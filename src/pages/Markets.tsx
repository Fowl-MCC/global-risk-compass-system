
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { mockStocks } from '../data/mockData';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Markets: React.FC = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Market Impact Analysis</h1>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
          <TabsTrigger value="sectors">Sectors</TabsTrigger>
          <TabsTrigger value="commodities">Commodities</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Market Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-2 bg-theme-dark-700 rounded-md">
                    <span>Global Risk Index</span>
                    <Badge variant="outline" className="bg-warning text-white">Elevated</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-theme-dark-700 rounded-md">
                    <span>Market Volatility</span>
                    <Badge variant="outline" className="bg-danger text-white">High</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-theme-dark-700 rounded-md">
                    <span>Supply Chain Stress</span>
                    <Badge variant="outline" className="bg-warning text-white">Medium</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-theme-dark-700 rounded-md">
                    <span>Geopolitical Tension</span>
                    <Badge variant="outline" className="bg-danger text-white">High</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Most Impacted Sectors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 border-b border-theme-dark-600">
                    <span>Semiconductors</span>
                    <span className="text-danger">-3.8%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 border-b border-theme-dark-600">
                    <span>Energy</span>
                    <span className="text-danger">-2.9%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 border-b border-theme-dark-600">
                    <span>Shipping</span>
                    <span className="text-danger">-2.5%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 border-b border-theme-dark-600">
                    <span>Cybersecurity</span>
                    <span className="text-success">+4.2%</span>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <span>Defense</span>
                    <span className="text-success">+1.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="stocks" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Impacted Stocks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockStocks.map((stock) => (
                  <div 
                    key={stock.ticker}
                    className="flex items-center justify-between p-3 bg-theme-dark-700 rounded-md"
                  >
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-md flex items-center justify-center mr-4
                        ${stock.change >= 0 ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'}`}
                      >
                        {stock.change >= 0 ? 
                          <ChevronUp className="h-6 w-6" /> : 
                          <ChevronDown className="h-6 w-6" />
                        }
                      </div>
                      <div>
                        <div className="font-bold">{stock.ticker}</div>
                        <div className="text-sm text-muted-foreground">{stock.company}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-lg">${stock.price.toFixed(2)}</div>
                      <div className={`${stock.change >= 0 ? 'text-success' : 'text-danger'}`}>
                        {stock.change > 0 && '+'}{stock.change.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sectors" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Sector impact analysis would be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commodities" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Commodity impact analysis would be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Markets;
