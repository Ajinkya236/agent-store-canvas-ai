
import React, { useState } from 'react';
import Header from '@/components/Header';
import BannerCarousel from '@/components/BannerCarousel';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import AgentGrid from '@/components/AgentGrid';
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
  },
  {
    id: 5,
    name: "UX Design Assistant",
    description: "Generate UI mockups and design recommendations based on best practices",
    logo: "/placeholder.svg",
    tags: ["API"],
    users: 9800,
    rating: 4.6
  },
  {
    id: 6,
    name: "Learning Coach",
    description: "Personalized learning paths and skill development recommendations for teams",
    logo: "/placeholder.svg",
    tags: ["Chat"],
    users: 7200,
    rating: 4.4
  }
];

// Category filters
const categories = ["All", "Product Design", "Human Resource", "Learning", "Travel", "Policy"];

const Index: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [agents, setAgents] = useState<AgentProps[]>(agentsData);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    if (category === "All") {
      setAgents(agentsData);
    } else {
      // Filter agents based on category (in a real app, each agent would have a category field)
      // This is just a simple simulation
      const categoryLower = category.toLowerCase();
      setAgents(agentsData.filter(agent => {
        return agent.name.toLowerCase().includes(categoryLower) || 
               agent.description.toLowerCase().includes(categoryLower);
      }));
    }
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      handleCategoryChange(activeCategory); // Reset to current category filter
      return;
    }
    
    const queryLower = query.toLowerCase();
    setAgents(agentsData.filter(agent => {
      return agent.name.toLowerCase().includes(queryLower) || 
             agent.description.toLowerCase().includes(queryLower);
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BannerCarousel />
      <SearchBar onSearch={handleSearch} />
      <CategoryFilter 
        categories={categories} 
        activeCategory={activeCategory} 
        onCategoryChange={handleCategoryChange} 
      />
      <AgentGrid agents={agents} />
    </div>
  );
};

export default Index;
