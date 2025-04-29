
import React from 'react';
import AgentCard, { AgentProps } from './AgentCard';
import { Skeleton } from '@/components/ui/skeleton';

interface AgentGridProps {
  agents: AgentProps[];
  isLoading?: boolean;
}

const AgentGrid: React.FC<AgentGridProps> = ({ agents, isLoading = false }) => {
  return (
    <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 pb-20">
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          // Loading skeleton
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[220px] rounded-xl overflow-hidden">
                <Skeleton className="h-full w-full" />
              </div>
            ))}
          </div>
        ) : agents.length === 0 ? (
          // Empty state
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">No agents found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        ) : (
          // Grid of agent cards
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, index) => (
              <div 
                key={agent.id} 
                className="animate-fade-in" 
                style={{ 
                  animationDelay: `${0.1 + index * 0.05}s`, 
                  animationFillMode: 'forwards',
                  opacity: 0 
                }}
              >
                <AgentCard agent={agent} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentGrid;
