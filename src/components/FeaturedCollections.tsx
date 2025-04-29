
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AgentProps } from '@/components/AgentCard';
import AgentCard from '@/components/AgentCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from 'react-router-dom';

interface FeaturedCollectionProps {
  title: string;
  agents: AgentProps[];
  viewAllLink: string;
}

const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({
  title,
  agents,
  viewAllLink
}) => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-archivo-black">{title}</h3>
        <Link to={viewAllLink} className="text-accent hover:underline flex items-center text-sm">
          View all <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {agents.map((agent) => (
            <CarouselItem key={agent.id} className="md:basis-1/2 lg:basis-1/3">
              <AgentCard agent={agent} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};

interface FeaturedCollectionsProps {
  trendingAgents: AgentProps[];
  staffPicksAgents: AgentProps[];
  newReleasesAgents: AgentProps[];
}

const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({
  trendingAgents,
  staffPicksAgents,
  newReleasesAgents
}) => {
  return (
    <div className="w-full">
      <FeaturedCollection 
        title="Trending This Week" 
        agents={trendingAgents} 
        viewAllLink="/browse?collection=trending"
      />
      <FeaturedCollection 
        title="Staff Picks" 
        agents={staffPicksAgents} 
        viewAllLink="/browse?collection=staff-picks"
      />
      <FeaturedCollection 
        title="New Releases" 
        agents={newReleasesAgents} 
        viewAllLink="/browse?collection=new-releases"
      />
    </div>
  );
};

export default FeaturedCollections;
