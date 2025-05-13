
import React from 'react';
import WorldMap from '../components/dashboard/WorldMap';
import EventList from '../components/dashboard/EventList';
import StockWatchlist from '../components/dashboard/StockWatchlist';
import NewsFeed from '../components/dashboard/NewsFeed';
import ThreatPredictor from '../components/dashboard/ThreatPredictor';

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full">
      <div className="md:col-span-2 lg:col-span-2 flex flex-col gap-4">
        <WorldMap className="h-[300px]" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          <StockWatchlist />
          <ThreatPredictor />
        </div>
      </div>
      <div className="lg:col-span-1 flex flex-col">
        <EventList className="flex-1" />
      </div>
      <div className="lg:col-span-1 flex flex-col">
        <NewsFeed className="flex-1" />
      </div>
    </div>
  );
};

export default Dashboard;
