
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <div className="w-full py-24 px-6 sm:px-10 md:px-14 lg:px-20 bg-gradient-to-br from-accent to-accent/80 text-primary-foreground">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-archivo-black mb-6">
          Join thousands of users leveraging AI agents
        </h2>
        <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto">
          Get early access to the latest AI agents and exclusive tools to supercharge your productivity
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <Input 
            type="email" 
            placeholder="Enter your email" 
            className="h-12 px-6 bg-white/20 border-white/30 text-white placeholder:text-white/60"
          />
          <Button 
            size="lg" 
            className="bg-white text-accent hover:bg-white/90" 
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
