
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-background pt-10 pb-20 px-6 sm:px-10 md:px-14 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-archivo-black tracking-tight leading-tight mb-6">
              Discover, Build &amp; Deploy <span className="text-accent">AI Agents</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              The marketplace for AI agents that solve real problems
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" asChild>
                <Link to="/browse">
                  Explore Agents <ArrowRight className="ml-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/builder">
                  Build Your Agent <ArrowRight className="ml-1" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="flex-1 relative h-80 lg:h-[500px] w-full max-w-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-accent/30 rounded-3xl animate-pulse-soft">
              <div className="relative h-full w-full">
                {/* Animated elements representing AI agents */}
                <div className="absolute top-10 left-10 w-16 h-16 bg-white rounded-xl shadow-lg animate-bounce" style={{ animationDuration: '3s' }}></div>
                <div className="absolute bottom-20 right-20 w-20 h-20 bg-accent rounded-xl shadow-lg animate-pulse" style={{ animationDuration: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/5 backdrop-blur-md rounded-full flex items-center justify-center border border-accent/20">
                  <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-accent/40"></div>
                  </div>
                </div>
                <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-secondary rounded-full shadow-lg animate-slide-in" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-10 left-20 w-14 h-14 bg-primary/10 rounded-full shadow-lg animate-slide-in" style={{ animationDelay: '0.8s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
