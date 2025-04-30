
import React, { useState } from 'react';
import { Heart, Share2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface AgentHeaderProps {
  id: number;
  name: string;
  description: string;
  logo: string;
  tags: string[];
  users: number;
  rating: number;
}

const AgentHeader: React.FC<AgentHeaderProps> = ({
  id,
  name,
  description,
  logo,
  tags,
  users,
  rating
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: `${name} ${isFavorite ? "removed from" : "added to"} your favorites list`,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Agent link copied to clipboard",
    });
  };

  return (
    <div className="bg-muted/20 py-10">
      <div className="container">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-card flex-shrink-0 shadow-sm">
            <img
              src={logo || "/placeholder.svg"}
              alt={`${name} logo`}
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="flex-grow">
            <h1 className="font-archivo-black text-3xl mb-2">{name}</h1>
            <p className="text-lg text-muted-foreground mb-4">{description}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-accent-primary hover:bg-accent-primary/90">
                <Link to={`/chat/${id}`}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat with Agent
                </Link>
              </Button>
              
              <Button variant="outline" onClick={toggleFavorite}>
                <Heart 
                  className={`mr-2 h-4 w-4 ${isFavorite ? "text-red-500 fill-red-500" : ""}`}
                  fill={isFavorite ? "currentColor" : "none"}
                />
                {isFavorite ? "Saved" : "Save"}
              </Button>
              
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
          
          <div className="md:text-right mt-4 md:mt-0">
            <div className="flex items-center mb-2 md:justify-end">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-amber-400' : 'text-muted-foreground/30'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-lg font-medium ml-2">{rating.toFixed(1)}</span>
              </div>
            </div>
            <p className="text-muted-foreground">
              {users} active user{users !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentHeader;
