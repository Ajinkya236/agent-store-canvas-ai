
import React from 'react';
import AgentCard, { AgentProps } from './AgentCard';

interface AgentGridProps {
  agents: AgentProps[];
}

const AgentGrid: React.FC<AgentGridProps> = ({ agents }) => {
  return (
    <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 pb-20">
      <div className="max-w-7xl mx-auto">
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
      </div>
    </div>
  );
};

export default AgentGrid;
