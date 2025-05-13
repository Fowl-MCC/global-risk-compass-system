
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockNews } from '../../data/mockData';
import { formatDistanceToNow } from 'date-fns';

interface NewsFeedProps {
  className?: string;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ className }) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle>Latest News</CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-auto max-h-[calc(100%-3rem)]">
        {mockNews.map((item) => (
          <div 
            key={item.id}
            className="mb-3 p-3 border-b border-theme-dark-600 last:border-0 hover:bg-theme-dark-700 cursor-pointer transition-colors rounded-md"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-medium">{item.title}</h3>
              <Badge className="ml-2 shrink-0" variant="outline">
                {item.source}
              </Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {item.summary}
            </p>
            <div className="mt-2 flex justify-between items-center">
              <div className="flex flex-wrap gap-1">
                {item.categories.map((category) => (
                  <Badge 
                    key={category} 
                    variant="secondary" 
                    className="text-xs"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default NewsFeed;
