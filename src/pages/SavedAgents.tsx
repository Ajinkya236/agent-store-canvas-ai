
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Search, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AgentProps } from '@/components/AgentCard';

interface SavedAgentProps extends AgentProps {
  savedAt: string;
}

const SavedAgents: React.FC = () => {
  const [savedAgents, setSavedAgents] = useState<SavedAgentProps[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAgents, setFilteredAgents] = useState<SavedAgentProps[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load saved agents from localStorage
    const loadSavedAgents = () => {
      const storedAgents = localStorage.getItem('savedAgents');
      
      if (storedAgents) {
        // Sort by saved date (latest first)
        const parsedAgents = JSON.parse(storedAgents) as SavedAgentProps[];
        parsedAgents.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
        setSavedAgents(parsedAgents);
        setFilteredAgents(parsedAgents);
      }
    };
    
    loadSavedAgents();
  }, []);
  
  // Handle search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredAgents(savedAgents);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = savedAgents.filter(agent => 
      agent.name.toLowerCase().includes(query) || 
      agent.description.toLowerCase().includes(query)
    );
    
    setFilteredAgents(filtered);
  }, [searchQuery, savedAgents]);
  
  // Remove agent from saved list
  const removeSavedAgent = (agentId: number) => {
    const updatedAgents = savedAgents.filter(agent => agent.id !== agentId);
    
    // Update state
    setSavedAgents(updatedAgents);
    setFilteredAgents(updatedAgents.filter(agent => 
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      agent.description.toLowerCase().includes(searchQuery.toLowerCase())
    ));
    
    // Update localStorage
    localStorage.setItem('savedAgents', JSON.stringify(updatedAgents));
  };
  
  // Format user count
  const formatUserCount = (count: number) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };
  
  // Format saved date
  const formatSavedDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    
    // If today, show "Today"
    if (date.toDateString() === now.toDateString()) {
      return "Today";
    }
    
    // If yesterday, show "Yesterday"
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    
    // If within 7 days, show day name
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    if (date > oneWeekAgo) {
      return date.toLocaleDateString(undefined, { weekday: 'long' });
    }
    
    // Otherwise, show date
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="px-6 sm:px-10 md:px-14 lg:px-20 py-8">
        <div className="max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-6" 
            onClick={() => navigate('/browse')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Browse
          </Button>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-archivo-black mb-2">Saved Agents</h1>
              <p className="text-muted-foreground">
                {savedAgents.length} agent{savedAgents.length !== 1 ? 's' : ''} saved in your collection
              </p>
            </div>
            
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search saved agents..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {filteredAgents.length === 0 ? (
            <div className="text-center py-16">
              {savedAgents.length === 0 ? (
                <>
                  <Heart className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">No saved agents</h2>
                  <p className="text-muted-foreground mb-6">
                    You haven't saved any agents yet. Browse the store to find agents to save.
                  </p>
                  <Button asChild>
                    <Link to="/browse">Browse Agents</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Search className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">No matching agents</h2>
                  <p className="text-muted-foreground mb-6">
                    No saved agents match your search. Try a different search term.
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
                  className="overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  <CardContent className="p-0">
                    <div className="p-5 flex items-start justify-between">
                      <Link to={`/agent/${agent.id}`} className="flex items-center space-x-3 flex-1">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-secondary flex items-center justify-center">
                          <img 
                            src={agent.logo || "/placeholder.svg"} 
                            alt={`${agent.name} logo`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-archivo-black text-lg truncate">{agent.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{agent.description}</p>
                        </div>
                      </Link>
                      <button 
                        onClick={() => removeSavedAgent(agent.id)} 
                        className="p-2 rounded-full hover:bg-secondary/80 transition-colors text-red-500"
                        aria-label="Remove from favorites"
                      >
                        <Heart className="w-5 h-5 fill-current" />
                      </button>
                    </div>
                    
                    <div className="px-5 pb-5 flex items-center justify-between">
                      <div className="flex flex-wrap items-center gap-2">
                        {agent.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs font-archivo">
                            {tag}
                          </Badge>
                        ))}
                        <div className="flex items-center text-sm">
                          <span className="text-muted-foreground">{formatUserCount(agent.users)}</span>
                          <span className="text-muted-foreground mx-1">•</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-3 h-3 ${i < agent.rating ? 'text-amber-400' : 'text-muted-foreground/30'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Saved {formatSavedDate(agent.savedAt)}
                      </span>
                    </div>
                    
                    <div className="border-t py-3 px-5 flex justify-between items-center">
                      <Button size="sm" asChild>
                        <Link to={`/chat/${agent.id}`}>Try Now</Link>
                      </Button>
                      <Link to={`/agent/${agent.id}`} className="text-sm text-muted-foreground hover:text-foreground">
                        View Details
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedAgents;
