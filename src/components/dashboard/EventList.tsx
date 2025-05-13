
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockRiskEvents } from '../../data/mockData';
import { formatDistanceToNow } from 'date-fns';

interface EventListProps {
  className?: string;
}

const EventList: React.FC<EventListProps> = ({ className }) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="tracking-wide">Latest Events</CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-auto max-h-[calc(100%-3rem)]">
        <div className="space-y-6">
          {mockRiskEvents.slice(0, 8).map((event) => (
            <div 
              key={event.id} 
              className="p-5 rounded-xl bg-theme-dark-700 hover:bg-theme-dark-600 cursor-pointer transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium tracking-wide text-base">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 tracking-wide">{event.location}</p>
                </div>
                <Badge
                  className={`
                    ml-4 px-3 py-1.5 text-sm
                    ${event.riskLevel === 'High' ? 'bg-danger hover:bg-danger/80' : 
                      event.riskLevel === 'Medium' ? 'bg-warning hover:bg-warning/80' : 
                      'bg-success hover:bg-success/80'}
                  `}
                >
                  {event.riskLevel}
                </Badge>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {event.categories.map((category) => (
                  <Badge key={category} variant="outline" className="text-sm px-3 py-1">
                    {category}
                  </Badge>
                ))}
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventList;
