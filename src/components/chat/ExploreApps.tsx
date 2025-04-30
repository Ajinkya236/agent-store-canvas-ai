
import React from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { GPTApp } from '@/types/chat';

interface ExploreAppsProps {
  gptApps: GPTApp[];
  filteredGptApps: GPTApp[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  toggleAppFavorite: (id: number) => void;
  openAppDetails: (id: number) => void;
}

const ExploreApps: React.FC<ExploreAppsProps> = ({
  filteredGptApps,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  toggleAppFavorite,
  openAppDetails
}) => {
  const categories = ["Writing", "Coding", "Education", "Lifestyle", "Design", "Health"];
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Explore Apps</h1>
        <p className="text-muted-foreground">
          Discover specialized AI apps tailored for specific tasks and topics.
        </p>
      </div>
      
      <div className="mb-6">
        <Input
          placeholder="Search apps..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
        />
        
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map(category => (
            <Badge 
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredGptApps.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No apps match your search criteria.</p>
          </div>
        ) : filteredGptApps.map(app => (
          <AppCard 
            key={app.id} 
            app={app} 
            toggleAppFavorite={toggleAppFavorite} 
            openAppDetails={openAppDetails} 
          />
        ))}
      </div>
    </div>
  );
};

interface AppCardProps {
  app: GPTApp;
  toggleAppFavorite: (id: number) => void;
  openAppDetails: (id: number) => void;
}

const AppCard: React.FC<AppCardProps> = ({ app, toggleAppFavorite, openAppDetails }) => {
  return (
    <Card 
      className="cursor-pointer hover:bg-accent/50 transition-colors h-full"
      onClick={() => openAppDetails(app.id)}
    >
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
            <img src={app.image} alt={app.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate">{app.name}</h3>
            <p className="text-xs text-muted-foreground">By {app.creator}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              toggleAppFavorite(app.id);
            }}
            className={app.isFavorite ? 'text-yellow-500' : ''}
          >
            <Star className="h-4 w-4" fill={app.isFavorite ? "currentColor" : "none"} />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-auto">
          {app.description}
        </p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t">
          <div className="flex items-center">
            <div className="flex items-center mr-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-3 h-3"
                  fill={star <= (app.rating || 0) ? "#FFD700" : "none"}
                  stroke={star <= (app.rating || 0) ? "#FFD700" : "currentColor"}
                />
              ))}
            </div>
            <span className="text-xs">{app.rating?.toFixed(1)}</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {app.category}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExploreApps;
