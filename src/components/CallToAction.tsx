
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <div className="w-full py-24 px-6 sm:px-10 md:px-14 lg:px-20 bg-gradient-to-br from-accent to-accent/80 text-primary-foreground">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-archivo-black mb-6">
          Join thousands of users leveraging AI agents
        </h2>
        
        <div className="text-xl mb-10 opacity-90 max-w-3xl mx-auto space-y-6">
          <p>
            Enterprise AI is a powerful platform that brings cutting-edge artificial intelligence to your business workflows.
            Our AI agents help you automate tasks, gain insights from data, and enhance productivity across your organization.
          </p>
          
          <p>
            With easy-to-use tools for building custom agents, accessing pre-built solutions, and seamlessly integrating
            AI into your existing systems, Enterprise AI empowers teams of all sizes to achieve more.
          </p>
        </div>
        
        <Button 
          size="lg" 
          className="bg-white text-accent hover:bg-white/90" 
        >
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default CallToAction;
