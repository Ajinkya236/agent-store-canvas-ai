
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Clock, Settings, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import AgentCard, { AgentProps } from '@/components/AgentCard';

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="px-6 sm:px-10 md:px-14 lg:px-20 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-archivo-black mb-8">Your Dashboard</h1>
          
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
                  <TabsTrigger value="settings" onClick={() => setActiveTab("settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="recent" className="space-y-6">
                  <h2 className="text-xl font-archivo-black">Recently Used Agents</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recentAgents.map((agent, index) => (
                      <AgentCard key={agent.id} agent={agent} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="favorites" className="space-y-6">
                  <h2 className="text-xl font-archivo-black">Your Favorite Agents</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {favoriteAgents.map((agent, index) => (
                      <AgentCard key={agent.id} agent={agent} />
                    ))}
                  </div>
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
                {recommendations.map((agent, index) => (
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
