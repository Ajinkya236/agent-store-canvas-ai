import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Plus, Settings, Trash2, MessageSquare, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AgentProps } from '@/components/AgentCard';
import { toast } from '@/hooks/use-toast';

const MyAgents: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample user-created agents (would come from a database in a real app)
  const [myAgents, setMyAgents] = useState<AgentProps[]>([
    {
      id: 101,
      name: "Customer Support Bot",
      description: "My custom agent that handles customer inquiries and resolves common issues",
      logo: "/placeholder.svg",
      tags: ["Private", "Chat"],
      users: 3,
      rating: 4.0
    },
    {
      id: 102,
      name: "Sales Data Analyzer",
      description: "Analyzes sales data from our CRM and provides insights and projections",
      logo: "/placeholder.svg",
      tags: ["Private", "API"],
      users: 5,
      rating: 4.2
    },
    {
      id: 103,
      name: "Meeting Summarizer",
      description: "Takes meeting recordings and generates concise summaries with action items",
      logo: "/placeholder.svg",
      tags: ["Private", "Chat"],
      users: 8,
      rating: 4.7
    }
  ]);

  // Keep track of favorite agents
  const [favorites, setFavorites] = useState<number[]>([]);

  // Filter agents by search query
  const filteredAgents = myAgents.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    agent.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Delete agent
  const handleDeleteAgent = (agentId: number) => {
    setMyAgents(prevAgents => prevAgents.filter(agent => agent.id !== agentId));
  };

  // Toggle favorite status
  const toggleFavorite = (agentId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    if (favorites.includes(agentId)) {
      setFavorites(favorites.filter(id => id !== agentId));
      toast({
        title: "Removed from favorites",
        description: "Agent removed from your favorites list",
      });
    } else {
      setFavorites([...favorites, agentId]);
      toast({
        title: "Added to favorites",
        description: "Agent added to your favorites list",
      });
    }
  };

  // Handle agent card click
  const handleAgentClick = (agentId: number) => {
    navigate(`/agent/${agentId}`);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-archivo-black mb-2">My Agents</h1>
            <p className="text-muted-foreground">
              {myAgents.length} custom agent{myAgents.length !== 1 ? 's' : ''} created by you
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search your agents..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Link to="/builder">
              <Button className="bg-accent-primary hover:bg-accent-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Create Agent
              </Button>
            </Link>
          </div>
        </div>
        
        {filteredAgents.length === 0 ? (
          <div className="text-center py-16 bg-muted/30 rounded-lg">
            {myAgents.length === 0 ? (
              <>
                <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold mb-2">No agents created yet</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  You haven't created any agents yet. Use our agent builder to create your first custom AI agent.
                </p>
                <Button asChild>
                  <Link to="/builder">Create Your First Agent</Link>
                </Button>
              </>
            ) : (
              <>
                <Search className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                <h2 className="text-xl font-semibold mb-2">No matching agents</h2>
                <p className="text-muted-foreground mb-6">
                  No agents match your search query. Try a different search term.
                </p>
                <Button variant="outline" onClick={() => setSearchQuery('')}>
                  Clear Search
                </Button>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map(agent => (
              <Card 
                key={agent.id} 
                className="overflow-hidden transition-all hover:shadow-md cursor-pointer"
                onClick={() => handleAgentClick(agent.id)}
              >
                <CardContent className="p-5 relative">
                  <button
                    onClick={(e) => toggleFavorite(agent.id, e)}
                    className={`absolute top-4 right-4 p-2 rounded-full hover:bg-muted z-20 ${
                      favorites.includes(agent.id) ? 'text-red-500' : 'text-muted-foreground'
                    }`}
                    aria-label={favorites.includes(agent.id) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart className="h-5 w-5" fill={favorites.includes(agent.id) ? "currentColor" : "none"} />
                  </button>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                      <img 
                        src={agent.logo || "/placeholder.svg"}
                        alt={`${agent.name} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h3 className="font-archivo-black text-lg line-clamp-1">{agent.name}</h3>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              className="h-8 w-8 p-0 ml-4"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Settings className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                            <DropdownMenuItem asChild>
                              <Link to={`/builder/${agent.id}`} className="flex items-center">
                                Edit Agent
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/chat/${agent.id}`} className="flex items-center">
                                Chat with Agent
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteAgent(agent.id);
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Agent
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{agent.description}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {agent.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/20 px-5 py-3 flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    {agent.users} active user{agent.users !== 1 ? 's' : ''}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <span className="text-sm font-medium mr-1">{agent.rating.toFixed(1)}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(agent.rating) 
                                ? 'text-amber-400' 
                                : i < agent.rating 
                                  ? 'text-amber-400/70' 
                                  : 'text-muted-foreground/30'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="ml-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/chat/${agent.id}`);
                      }}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Try Now
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAgents;
