
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Settings: React.FC = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="apis">API Connections</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Use dark theme throughout the application</p>
                </div>
                <Switch id="dark-mode" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-refresh">Auto-refresh Data</Label>
                  <p className="text-sm text-muted-foreground">Automatically refresh data every 5 minutes</p>
                </div>
                <Switch id="auto-refresh" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="animations">UI Animations</Label>
                  <p className="text-sm text-muted-foreground">Enable animations in the interface</p>
                </div>
                <Switch id="animations" defaultChecked />
              </div>
              
              <div className="pt-4 border-t border-theme-dark-600">
                <Label htmlFor="refresh-interval">Data Refresh Interval (minutes)</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Input id="refresh-interval" type="number" defaultValue="5" className="w-24" />
                  <Button>Apply</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="high-risk">High Risk Events</Label>
                  <p className="text-sm text-muted-foreground">Notify me about high risk events</p>
                </div>
                <Switch id="high-risk" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="medium-risk">Medium Risk Events</Label>
                  <p className="text-sm text-muted-foreground">Notify me about medium risk events</p>
                </div>
                <Switch id="medium-risk" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="low-risk">Low Risk Events</Label>
                  <p className="text-sm text-muted-foreground">Notify me about low risk events</p>
                </div>
                <Switch id="low-risk" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="predictions">AI Predictions</Label>
                  <p className="text-sm text-muted-foreground">Notify me about new AI predictions</p>
                </div>
                <Switch id="predictions" defaultChecked />
              </div>
              
              <div className="pt-4 border-t border-theme-dark-600">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Input id="email-notifications" type="email" placeholder="your@email.com" />
                  <Button>Save</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="apis" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>API Connections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="news-api">NewsAPI</Label>
                  <p className="text-sm text-muted-foreground">Connect to NewsAPI for real-time news data</p>
                </div>
                <Switch id="news-api" />
              </div>
              
              <div className="pt-4 border-t border-theme-dark-600">
                <Label htmlFor="news-api-key">NewsAPI Key</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Input id="news-api-key" type="text" placeholder="Enter API key" />
                  <Button>Connect</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-theme-dark-600">
                <div>
                  <Label htmlFor="financial-api">Financial Data API</Label>
                  <p className="text-sm text-muted-foreground">Connect to financial data provider</p>
                </div>
                <Switch id="financial-api" />
              </div>
              
              <div className="pt-4 border-t border-theme-dark-600">
                <Label htmlFor="financial-api-key">Financial API Key</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Input id="financial-api-key" type="text" placeholder="Enter API key" />
                  <Button>Connect</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input id="username" className="mt-2" defaultValue="global_analyst" />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" className="mt-2" type="email" defaultValue="analyst@example.com" />
              </div>
              
              <div className="pt-4 border-t border-theme-dark-600">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" className="mt-2" type="password" />
              </div>
              
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" className="mt-2" type="password" />
              </div>
              
              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" className="mt-2" type="password" />
              </div>
              
              <div className="pt-4">
                <Button>Update Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
