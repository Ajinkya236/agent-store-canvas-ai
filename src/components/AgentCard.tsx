
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

export interface AgentProps {
  id: number;
  name: string;
  description: string;
  logo: string;
  tags: string[];
  users: number;
  rating: number;
}

interface AgentCardProps {
  agent: AgentProps;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  
  // Check if this agent is already in saved agents on component mount
  useEffect(() => {
    const savedAgents = JSON.parse(localStorage.getItem('savedAgents') || '[]');
    const isAlreadySaved = savedAgents.some((savedAgent: { id: number }) => savedAgent.id === agent.id);
    setIsFavorite(isAlreadySaved);
  }, [agent.id]);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Save/remove from localStorage when toggling favorite
    const savedAgents = JSON.parse(localStorage.getItem('savedAgents') || '[]');
    
    if (isFavorite) {
      // Remove from saved agents
      const updatedSavedAgents = savedAgents.filter((savedAgent: { id: number }) => savedAgent.id !== agent.id);
      localStorage.setItem('savedAgents', JSON.stringify(updatedSavedAgents));
    } else {
      // Add to saved agents with current timestamp
      const agentWithTimestamp = {
        ...agent,
        savedAt: new Date().toISOString()
      };
      savedAgents.push(agentWithTimestamp);
      localStorage.setItem('savedAgents', JSON.stringify(savedAgents));
    }
    
    setIsFavorite(!isFavorite);
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
  
  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 cursor-pointer border bg-card hover:shadow-md ${
        isHovered ? 'transform scale-[1.02]' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <Link to={`/agent/${agent.id}`} className="block p-4 sm:p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-secondary flex items-center justify-center flex-shrink-0">
                <img 
                  src={agent.logo || "/placeholder.svg"} 
                  alt={`${agent.name} logo`} 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-archivo-black text-base sm:text-lg truncate">{agent.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{agent.description}</p>
              </div>
            </div>
            <button 
              onClick={toggleFavorite} 
              className={`p-2 rounded-full hover:bg-secondary/80 transition-colors ${
                isFavorite ? 'text-red-500' : 'text-muted-foreground'
              }`}
              style={{ touchAction: 'manipulation' }}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </Link>
      </CardContent>
      <CardFooter className="p-4 sm:p-5 pt-0 border-t flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between">
        <div className="flex items-center space-x-2 flex-wrap gap-2 w-full sm:w-auto">
          {agent.tags.slice(0, 2).map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs font-archivo">
              {tag}
            </Badge>
          ))}
          <div className="flex items-center text-xs sm:text-sm ml-auto sm:ml-0">
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
        <Button size="sm" asChild className="w-full sm:w-auto">
          <Link to={`/chat/${agent.id}`}>Try Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AgentCard;
