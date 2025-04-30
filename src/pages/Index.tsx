
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturedAgents from '@/components/FeaturedAgents';
import FeaturedApps from '@/components/FeaturedApps';
import HowItWorks from '@/components/HowItWorks';
import CategoriesShowcase from '@/components/CategoriesShowcase';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import CallToAction from '@/components/CallToAction';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MessageSquare, Plus } from 'lucide-react';
import { AgentProps } from '@/components/AgentCard';
import { Separator } from '@/components/ui/separator';

// Sample data for our AI agents
const agentsData: AgentProps[] = [{
  id: 1,
  name: "Document Analyzer",
  description: "Extract and analyze data from any document format with advanced ML capabilities",
  logo: "/placeholder.svg",
  tags: ["API", "Chat"],
  users: 15400,
  rating: 4.7
}, {
  id: 2,
  name: "HR Assistant",
  description: "Streamline HR processes and enhance employee experience with AI-driven insights",
  logo: "/placeholder.svg",
  tags: ["Chat"],
  users: 8300,
  rating: 4.5
}, {
  id: 3,
  name: "Travel Planner",
  description: "Plan business trips and manage travel arrangements with intelligent recommendations",
  logo: "/placeholder.svg",
  tags: ["API", "Chat"],
  users: 12700,
  rating: 4.8
}, {
  id: 4,
  name: "Policy Navigator",
  description: "Navigate company policies and compliance requirements with instant AI guidance",
  logo: "/placeholder.svg",
  tags: ["Chat"],
  users: 6500,
  rating: 4.2
}];
const Index: React.FC = () => {
  return <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      {/* Build Your Agent and Chat Assistant Buttons */}
      <div className="w-full py-8 px-6 sm:px-10 md:px-14 lg:px-20 bg-accent/5">
        <div className="max-w-7xl mx-auto flex justify-center flex-wrap gap-4">
          <Button asChild size="lg" className="bg-accent-primary hover:bg-accent-primary/90">
            <Link to="/builder" className="flex items-center">
              <Plus className="mr-2" />
              Build Your Agent
            </Link>
          </Button>
          
          <Button asChild size="lg" className="bg-accent-primary hover:bg-accent-primary/90">
            <Link to="/chat-assistant" className="flex items-center">
              <MessageSquare className="mr-2" />
              Chat Assistant
            </Link>
          </Button>
        </div>
      </div>
      
      <FeaturedAgents agents={agentsData} />
      <FeaturedApps />
      <HowItWorks />
      
      {/* Chat Assistant Section */}
      <section className="w-full py-20 px-6 sm:px-10 md:px-14 lg:px-20 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left side - Content */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                  Interact with our <span className="text-accent-primary">Chat Assistant</span>
                </h2>
                <Separator className="w-16 h-1 bg-accent-primary" />
              </div>
              
              <p className="text-lg text-muted-foreground">
                Get immediate answers to your questions, help with tasks, and intelligent guidance from our advanced AI chat assistant.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-3 mt-1 h-5 w-5 rounded-full bg-accent-primary/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-accent-primary"></div>
                  </div>
                  <p>Instant responses to your complex questions</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 h-5 w-5 rounded-full bg-accent-primary/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-accent-primary"></div>
                  </div>
                  <p>Upload files for analysis and get smart insights</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 h-5 w-5 rounded-full bg-accent-primary/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-accent-primary"></div>
                  </div>
                  <p>Access specialized AI apps for specific tasks</p>
                </li>
              </ul>
              
              <div className="pt-4">
                <Button asChild size="lg" className="bg-accent-primary hover:bg-accent-primary/90">
                  <Link to="/chat-assistant" className="flex items-center">
                    <MessageSquare className="mr-2" />
                    Try Chat Assistant Now
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Right side - Image */}
            <div className="w-full lg:w-1/2 h-[400px] relative overflow-hidden rounded-xl shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/80 to-accent-secondary/80 opacity-90"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
                <MessageSquare size={64} className="mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-center">Intelligent Conversations</h3>
                <p className="text-center max-w-md">
                  Our Chat Assistant uses advanced AI to understand context, remember your previous messages, 
                  and provide helpful, accurate responses to all your queries.
                </p>
                <div className="mt-8 flex flex-wrap gap-3 justify-center">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                    Document Analysis
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                    Creative Writing
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                    Code Help
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                    Travel Planning
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <CategoriesShowcase />
      <TestimonialsSlider />
      <CallToAction />
    </div>;
};
export default Index;
