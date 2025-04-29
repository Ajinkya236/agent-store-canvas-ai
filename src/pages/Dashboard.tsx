
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, BarChart, ChartLine, Clock, Heart, Settings, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import AgentCard, { AgentProps } from '@/components/AgentCard';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("recent");
  
  // Mock data
  const recentAgents = [
    {
      id: 1,
      name: "Document Analyzer",
      description: "Extract and analyze data from any document format with advanced ML capabilities",
      logo: "/placeholder.svg",
      tags: ["API", "Chat"],
      users: 15400,
      rating: 4.7
    },
    {
      id: 3,
      name: "Travel Planner",
      description: "Plan business trips and manage travel arrangements with intelligent recommendations",
      logo: "/placeholder.svg",
      tags: ["API", "Chat"],
      users: 12700,
      rating: 4.8
    }
  ];
  
  const favoriteAgents = [
    {
      id: 2,
      name: "HR Assistant",
      description: "Streamline HR processes and enhance employee experience with AI-driven insights",
      logo: "/placeholder.svg",
      tags: ["Chat"],
      users: 8300,
      rating: 4.5
    },
    {
      id: 5,
      name: "UX Design Assistant",
      description: "Generate UI mockups and design recommendations based on best practices",
      logo: "/placeholder.svg",
      tags: ["API"],
      users: 9800,
      rating: 4.6
    }
  ];
  
  const usageStats = [
    { name: "Document Analyzer", usage: 78 },
    { name: "HR Assistant", usage: 45 },
    { name: "Travel Planner", usage: 23 },
  ];
  
  const recommendations = [
    {
      id: 4,
      name: "Policy Navigator",
      description: "Navigate company policies and compliance requirements with instant AI guidance",
      logo: "/placeholder.svg",
      tags: ["Chat"],
      users: 6500,
      rating: 4.2
    },
    {
      id: 6,
      name: "Learning Coach",
      description: "Personalized learning paths and skill development recommendations for teams",
      logo: "/placeholder.svg",
      tags: ["Chat"],
      users: 7200,
      rating: 4.4
    }
  ];

  // Mock usage analytics data
  const usageData = [
    { name: 'Jan', usage: 65, cost: 120 },
    { name: 'Feb', usage: 59, cost: 110 },
    { name: 'Mar', usage: 80, cost: 145 },
    { name: 'Apr', usage: 81, cost: 147 },
    { name: 'May', usage: 56, cost: 105 },
    { name: 'Jun', usage: 55, cost: 103 },
    { name: 'Jul', usage: 40, cost: 87 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="px-6 sm:px-10 md:px-14 lg:px-20 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="mb-8 bg-card rounded-xl p-6 border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-archivo-black mb-2">Welcome back!</h1>
                <p className="text-muted-foreground">Your account is active. You've used 45% of your monthly quota.</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">View Billing</Button>
                <Button size="sm">Upgrade Plan</Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <Card>
                <CardContent className="p-4 flex flex-col items-center">
                  <Activity className="h-5 w-5 mb-1 text-accent" />
                  <span className="text-sm">14 Active Chats</span>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center">
                  <Star className="h-5 w-5 mb-1 text-amber-400" />
                  <span className="text-sm">3 Favorite Agents</span>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center">
                  <ChartLine className="h-5 w-5 mb-1 text-green-500" />
                  <span className="text-sm">89% Efficiency</span>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="recent" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="recent" onClick={() => setActiveTab("recent")}>
                    <Clock className="mr-2 h-4 w-4" />
                    Recently Used
                  </TabsTrigger>
                  <TabsTrigger value="favorites" onClick={() => setActiveTab("favorites")}>
                    <Heart className="mr-2 h-4 w-4" />
                    Favorites
                  </TabsTrigger>
                  <TabsTrigger value="analytics" onClick={() => setActiveTab("analytics")}>
                    <BarChart className="mr-2 h-4 w-4" />
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger value="settings" onClick={() => setActiveTab("settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="recent" className="space-y-6">
                  <h2 className="text-xl font-archivo-black">Recently Used Agents</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recentAgents.map((agent) => (
                      <AgentCard key={agent.id} agent={agent} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="favorites" className="space-y-6">
                  <h2 className="text-xl font-archivo-black">Your Favorite Agents</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {favoriteAgents.map((agent) => (
                      <AgentCard key={agent.id} agent={agent} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="analytics" className="space-y-6">
                  <h2 className="text-xl font-archivo-black">Usage Analytics</h2>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-medium mb-4">Monthly Usage</h3>
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={usageData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                              </linearGradient>
                              <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="usage" stroke="#8884d8" fillOpacity={1} fill="url(#colorUsage)" />
                            <Area type="monotone" dataKey="cost" stroke="#82ca9d" fillOpacity={1} fill="url(#colorCost)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <h3 className="text-lg font-medium mt-8 mb-4">Performance Metrics</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Response Time</span>
                              <span>780ms (avg)</span>
                            </div>
                            <Progress value={78} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Success Rate</span>
                              <span>94%</span>
                            </div>
                            <Progress value={94} className="h-2" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>User Satisfaction</span>
                              <span>4.7/5.0</span>
                            </div>
                            <Progress value={94} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Uptime</span>
                              <span>99.8%</span>
                            </div>
                            <Progress value={99.8} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="settings" className="space-y-6">
                  <h2 className="text-xl font-archivo-black">Account Settings</h2>
                  <Card>
                    <CardContent className="p-6">
                      <p>Account settings will be implemented in a future update.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Usage Statistics */}
              <div className="bg-card rounded-xl p-6 border shadow-sm space-y-5">
                <h3 className="font-archivo-black text-lg">Usage Statistics</h3>
                {usageStats.map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{stat.name}</span>
                      <span>{stat.usage} uses this month</span>
                    </div>
                    <Progress value={stat.usage} className="h-2" />
                  </div>
                ))}
              </div>
              
              {/* Recommended for you */}
              <div className="space-y-4">
                <h3 className="font-archivo-black text-lg">Recommended for You</h3>
                {recommendations.map((agent) => (
                  <Card key={agent.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-secondary flex items-center justify-center">
                          <img 
                            src={agent.logo}
                            alt={`${agent.name} logo`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{agent.name}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">{agent.description}</p>
                          <div className="flex items-center mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${i < Math.floor(agent.rating) ? 'text-amber-400 fill-current' : 'text-muted-foreground/30'}`}
                                />
                              ))}
                            </div>
                            <span className="text-xs ml-1">{agent.rating}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
