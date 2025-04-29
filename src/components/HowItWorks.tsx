
import React from 'react';
import { Search, Download, Settings } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'Discover the right agent',
      description: 'Browse our marketplace to find AI agents that match your specific needs',
      icon: Search
    },
    {
      id: 2,
      title: 'Deploy to your workflow',
      description: 'Easily integrate the agent into your existing tools and processes',
      icon: Download
    },
    {
      id: 3,
      title: 'Customize or build your own',
      description: 'Adapt existing agents or create new ones with our builder platform',
      icon: Settings
    }
  ];

  return (
    <div className="w-full py-20 px-6 sm:px-10 md:px-14 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-archivo-black text-center mb-16">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className="flex flex-col items-center text-center"
              style={{ 
                animationDelay: `${index * 0.2}s`, 
                animationFillMode: 'forwards',
                opacity: 0 
              }}
              className="animate-fade-in"
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <step.icon className="h-8 w-8 text-accent" />
              </div>
              <div className="relative mb-6">
                <div className="text-4xl font-archivo-black text-accent/20">{step.id}</div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-archivo-black">
                  {step.id}
                </div>
              </div>
              <h3 className="text-xl font-archivo-black mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
