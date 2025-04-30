import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AgentGrid from '@/components/AgentGrid';
import { AgentProps } from '@/components/AgentCard';
import { ArrowRight } from 'lucide-react';

interface MainContentProps {
  searchQuery: string;
  activeCategory: string;
  filteredAgents: AgentProps[];
  trendingAgents: AgentProps[];
  staffPicksAgents: AgentProps[];
  newReleasesAgents: AgentProps[];
}

const MainContent: React.FC<MainContentProps> = ({
  searchQuery,
  activeCategory,
  filteredAgents,
  trendingAgents,
  staffPicksAgents,
  newReleasesAgents
}) => {
  // If there's a search query or active category, show filtered results
  if (searchQuery || activeCategory !== 'All Categories') {
    return (
      <div className="mt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-archivo-black">Search Results</h2>
          <p className="text-sm text-muted-foreground">{filteredAgents.length} agents found</p>
        </div>
        
        {filteredAgents.length > 0 ? (
          <AgentGrid agents={filteredAgents} />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No agents found matching your search.</p>
          </div>
        )}
      </div>
    );
  }
  
  // Otherwise show collections
  return (
    <div className="space-y-12 mt-6">
      {/* Trending Agents */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-archivo-black">Trending Agents</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/category/trending" className="flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <AgentGrid agents={trendingAgents} />
      </div>
      
      {/* Staff Picks */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-archivo-black">Staff Picks</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/category/staff-picks" className="flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <AgentGrid agents={staffPicksAgents} />
      </div>
      
      {/* New Releases */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-archivo-black">New Releases</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/category/new" className="flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <AgentGrid agents={newReleasesAgents} />
      </div>
    </div>
  );
};

export default MainContent;
