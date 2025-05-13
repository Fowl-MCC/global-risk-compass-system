
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockNews } from '../data/mockData';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

const NewsFeedPage: React.FC = () => {
  const categories = ['All', 'Political', 'Natural Disaster', 'Economic', 'Technology', 'Social'];

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Global News Feed</h1>

      <Tabs defaultValue="All" className="w-full">
        <TabsList className="mb-4">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="All" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mockNews.map((item) => (
              <Card key={item.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <Badge>{item.source}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{item.summary}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-1">
                      {item.categories.map((category) => (
                        <Badge key={category} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* We'd implement filtered views for each category */}
        {categories.slice(1).map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  Filtered news for {category} category would appear here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default NewsFeedPage;
