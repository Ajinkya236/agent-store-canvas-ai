
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturedAgents from '@/components/FeaturedAgents';
import HowItWorks from '@/components/HowItWorks';
import CategoriesShowcase from '@/components/CategoriesShowcase';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import CallToAction from '@/components/CallToAction';
import { AgentProps } from '@/components/AgentCard';

// Sample data for our AI agents
const agentsData: AgentProps[] = [
  {
    id: 1,
    name: "Document Analyzer",
    description: "Extract and analyze data from any document format with advanced ML capabilities",
    logo: "/placeholder.svg",
    tags: ["API", "Chat"],
    users: 15400,
    rating: 4.7
  },
  {
    id: 2,
    name: "HR Assistant",
    description: "Streamline HR processes and enhance employee experience with AI-driven insights",
    logo: "/placeholder.svg",
    tags: ["Chat"],
    users: 8300,
    rating: 4.5
  },
  {
    id: 3,
    name: "Travel Planner",
    description: "Plan business trips and manage travel arrangements with intelligent recommendations",
    logo: "/placeholder.svg",
    tags: ["API", "Chat"],
    users: 12700,
    rating: 4.8
  },
  {
    id: 4,
    name: "Policy Navigator",
    description: "Navigate company policies and compliance requirements with instant AI guidance",
    logo: "/placeholder.svg",
    tags: ["Chat"],
    users: 6500,
    rating: 4.2
  }
];

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturedAgents agents={agentsData} />
      <HowItWorks />
      <CategoriesShowcase />
      <TestimonialsSlider />
      <CallToAction />
    </div>
  );
};

export default Index;
