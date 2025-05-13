
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
        <CardTitle>Market Impact</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {mockStocks.map((stock) => (
            <div 
              key={stock.ticker} 
              className="flex items-center justify-between p-2 rounded-md hover:bg-theme-dark-700 cursor-pointer"
            >
              <div className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-md flex items-center justify-center mr-3
                  ${stock.change >= 0 ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'}
                `}>
                  {stock.change >= 0 ? 
                    <ChevronUp className="h-4 w-4" /> : 
                    <ChevronDown className="h-4 w-4" />
                  }
                </div>
                <div>
                  <p className="font-medium">{stock.ticker}</p>
                  <p className="text-xs text-muted-foreground">{stock.company}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono">${stock.price.toFixed(2)}</p>
                <p className={`text-xs ${stock.change >= 0 ? 'text-success' : 'text-danger'}`}>
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
