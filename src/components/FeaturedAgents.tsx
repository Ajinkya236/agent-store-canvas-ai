
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AgentProps } from '@/components/AgentCard';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface FeaturedAgentsProps {
  agents: AgentProps[];
}

const FeaturedAgents: React.FC<FeaturedAgentsProps> = ({ agents }) => {
  return (
    <div className="w-full py-16 px-6 sm:px-10 md:px-14 lg:px-20 bg-accent/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-archivo-black">Featured Agents</h2>
          <Link to="/browse" className="text-accent hover:underline flex items-center">
            View all <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {agents.map((agent) => (
              <CarouselItem key={agent.id} className="md:basis-1/2 lg:basis-1/3">
                <Link to={`/agent/${agent.id}`}>
                  <div className="group relative h-[280px] rounded-xl border bg-card overflow-hidden transition-all hover:shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-accent/5 z-0">
                      <div className="w-16 h-16 rounded-full bg-card absolute top-6 right-6 flex items-center justify-center shadow-sm">
                        <img 
                          src={agent.logo || "/placeholder.svg"} 
                          alt={agent.name} 
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <h3 className="font-archivo-black text-xl mb-2">{agent.name}</h3>
                      <p className="text-muted-foreground line-clamp-2 mb-4">{agent.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < agent.rating ? 'text-amber-400' : 'text-muted-foreground/30'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-sm ml-2">{agent.rating}</span>
                        </div>
                        <Button size="sm" variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          Try Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default FeaturedAgents;
