
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TacticalBadge } from '@/components/ui/tactical-badge';
import { mockRiskEvents } from '../../data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { ArrowRight, AlertCircle, CircleAlert, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { HolographicCard } from '@/components/ui/holographic-card';

interface EventListProps {
  className?: string;
}

const EventList: React.FC<EventListProps> = ({ className }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="tracking-wide flex items-center gap-2">
            <Calendar className="h-5 w-5 text-theme-blue-400" />
            Latest Events
          </CardTitle>
          <TacticalBadge variant="default" size="sm" glow="subtle">
            {mockRiskEvents.length} Events
          </TacticalBadge>
        </div>
      </CardHeader>
      <CardContent className="overflow-y-auto max-h-[calc(100%-3rem)] pr-2 pb-2">
        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {mockRiskEvents.slice(0, 8).map((event) => (
            <motion.div 
              key={event.id} 
              variants={itemVariants}
            >
              <HolographicCard
                interactive
                glowColor={
                  event.riskLevel === 'High' ? 'red' : 
                  event.riskLevel === 'Medium' ? 'orange' : 'green'
                }
                glowIntensity="low"
                className="hover:scale-[1.01]"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {event.riskLevel === 'High' && <CircleAlert className="h-4 w-4 text-danger" />}
                        <h3 className="font-medium tracking-wide text-base">{event.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground tracking-wide flex items-center gap-1.5">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-theme-blue-400"></span>
                        {event.location}
                      </p>
                    </div>
                    <TacticalBadge
                      className="ml-3"
                      variant={
                        event.riskLevel === 'High' ? 'high' : 
                        event.riskLevel === 'Medium' ? 'medium' : 'low'
                      }
                      glow={event.riskLevel === 'High' ? 'strong' : 'subtle'}
                      animation={event.riskLevel === 'High' ? 'pulse' : 'none'}
                    >
                      {event.riskLevel}
                    </TacticalBadge>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {event.categories.map((category) => (
                      <TacticalBadge 
                        key={category} 
                        variant="dark" 
                        pill
                        className="text-xs px-3 py-1.5 bg-theme-dark-700/80"
                      >
                        {category}
                      </TacticalBadge>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3 opacity-70" />
                      {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
                    </div>
                    <motion.button
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.97 }}
                      className="text-theme-blue-400 text-sm hover:text-theme-blue-300 transition-colors flex items-center gap-1"
                    >
                      Details <ArrowRight className="h-3 w-3" />
                    </motion.button>
                  </div>
                </div>
              </HolographicCard>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default EventList;
