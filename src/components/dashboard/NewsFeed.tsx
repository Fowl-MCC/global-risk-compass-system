
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
        <CardTitle className="tracking-wide">Latest News</CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-auto max-h-[calc(100%-3rem)]">
        {mockNews.map((item) => (
          <div 
            key={item.id}
            className="mb-6 p-5 border-b border-theme-dark-600 last:border-0 hover:bg-theme-dark-700 cursor-pointer transition-colors rounded-xl"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-medium tracking-wide text-base">{item.title}</h3>
              <Badge className="ml-4 shrink-0 px-3 py-1" variant="outline">
                {item.source}
              </Badge>
            </div>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground line-clamp-2">
              {item.summary}
            </p>
            <div className="mt-4 flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                {item.categories.map((category) => (
                  <Badge 
                    key={category} 
                    variant="secondary" 
                    className="text-sm px-3 py-1"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
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
