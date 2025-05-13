
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockStocks } from '../../data/mockData';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface StockWatchlistProps {
  className?: string;
}

const StockWatchlist: React.FC<StockWatchlistProps> = ({ className }) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="tracking-wide">Market Impact</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockStocks.map((stock) => (
            <div 
              key={stock.ticker} 
              className="flex items-center justify-between p-4 rounded-lg hover:bg-theme-dark-700 cursor-pointer"
            >
              <div className="flex items-center">
                <div className={`
                  w-12 h-12 rounded-lg flex items-center justify-center mr-4
                  ${stock.change >= 0 ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'}
                `}>
                  {stock.change >= 0 ? 
                    <ChevronUp className="h-6 w-6" /> : 
                    <ChevronDown className="h-6 w-6" />
                  }
                </div>
                <div>
                  <p className="font-medium tracking-wide text-base">{stock.ticker}</p>
                  <p className="text-sm text-muted-foreground">{stock.company}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-lg">${stock.price.toFixed(2)}</p>
                <p className={`text-base ${stock.change >= 0 ? 'text-success' : 'text-danger'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StockWatchlist;
