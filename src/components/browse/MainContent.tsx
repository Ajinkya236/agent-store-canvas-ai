import React from 'react';
import AgentGrid from '@/components/AgentGrid';
import FeaturedCollections from '@/components/FeaturedCollections';
import { AgentProps } from '@/components/AgentCard';

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
  // Show filtered agents when there is a search query or category filter
  if (searchQuery || activeCategory !== 'All Categories') {
    return <AgentGrid agents={filteredAgents} />;
  }
  
  // Otherwise, show featured collections
  return (
    <FeaturedCollections 
      trendingAgents={trendingAgents}
      staffPicksAgents={staffPicksAgents}
      newReleasesAgents={newReleasesAgents}
    />
  );
};

export default MainContent;
