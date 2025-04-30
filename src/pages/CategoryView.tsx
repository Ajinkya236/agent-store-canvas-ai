
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { AgentProps } from '@/components/AgentCard';
import AgentGrid from '@/components/AgentGrid';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

// Sample data for our AI agents
const allAgentsData: AgentProps[] = [
  {
    id: 1,
    name: "Document Analyzer",
    description: "Extract and analyze data from any document format with advanced ML capabilities",
    logo: "/placeholder.svg",
    tags: ["API", "Chat", "Documents", "Analytics"],
    users: 15400,
    rating: 4.7
  },
  {
    id: 2,
    name: "HR Assistant",
    description: "Streamline HR processes and enhance employee experience with AI-driven insights",
    logo: "/placeholder.svg",
    tags: ["Chat", "Human Resources", "Recruitment"],
    users: 8300,
    rating: 4.5
  },
  {
    id: 3,
    name: "Travel Planner",
    description: "Plan business trips and manage travel arrangements with intelligent recommendations",
    logo: "/placeholder.svg",
    tags: ["API", "Chat", "Travel", "Planning"],
    users: 12700,
    rating: 4.8
  },
  {
    id: 4,
    name: "Policy Navigator",
    description: "Navigate company policies and compliance requirements with instant AI guidance",
    logo: "/placeholder.svg",
    tags: ["Chat", "Compliance", "Legal"],
    users: 6500,
    rating: 4.2
  },
  {
    id: 5,
    name: "UX Design Assistant",
    description: "Generate UI mockups and design recommendations based on best practices",
    logo: "/placeholder.svg",
    tags: ["API", "Design", "UI/UX", "Creative"],
    users: 9800,
    rating: 4.6
  },
  {
    id: 6,
    name: "Learning Coach",
    description: "Personalized learning paths and skill development recommendations for teams",
    logo: "/placeholder.svg",
    tags: ["Chat", "Education", "Learning", "Training"],
    users: 7200,
    rating: 4.4
  },
  {
    id: 7,
    name: "Marketing Copywriter",
    description: "Create compelling marketing copy for various channels and campaigns",
    logo: "/placeholder.svg",
    tags: ["API", "Chat", "Marketing", "Content"],
    users: 11200,
    rating: 4.7
  },
  {
    id: 8,
    name: "Financial Advisor",
    description: "Get personalized financial advice and investment recommendations",
    logo: "/placeholder.svg",
    tags: ["Chat", "Finance", "Investment", "Planning"],
    users: 9100,
    rating: 4.3
  },
  {
    id: 9,
    name: "Code Assistant",
    description: "Review code, suggest improvements, and help debug issues across languages",
    logo: "/placeholder.svg",
    tags: ["API", "Chat", "Development", "Coding"],
    users: 18700,
    rating: 4.9
  }
];

const CategoryView = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [agents, setAgents] = useState<AgentProps[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // Generate unique tags from all agents for filters
  const allTags = Array.from(
    new Set(
      allAgentsData.flatMap(agent => agent.tags)
    )
  ).sort();
  
  useEffect(() => {
    // Filter agents based on category and active filter
    let filteredAgents;
    
    if (category === 'trending' || category === 'new' || category === 'staff-picks') {
      // For demo purposes, just use different subsets of the data for different categories
      if (category === 'trending') {
        filteredAgents = allAgentsData.filter((_, i) => i % 3 === 0);
      } else if (category === 'new') {
        filteredAgents = allAgentsData.filter((_, i) => i % 3 === 1);
      } else { // staff-picks
        filteredAgents = allAgentsData.filter((_, i) => i % 3 === 2);
      }
    } else {
      // For other categories, filter based on category name
      const categoryLower = category?.toLowerCase() || '';
      filteredAgents = allAgentsData.filter(agent => 
        agent.name.toLowerCase().includes(categoryLower) || 
        agent.description.toLowerCase().includes(categoryLower) ||
        agent.tags.some(tag => tag.toLowerCase().includes(categoryLower))
      );
    }
    
    // Apply tag filter if active
    if (activeFilter) {
      filteredAgents = filteredAgents.filter(agent => 
        agent.tags.some(tag => tag.toLowerCase() === activeFilter.toLowerCase())
      );
    }
    
    setAgents(filteredAgents);
  }, [category, activeFilter]);
  
  const getCategoryTitle = () => {
    if (!category) return "Agents";
    
    switch(category) {
      case 'trending':
        return "Trending Agents";
      case 'new':
        return "New Releases";
      case 'staff-picks':
        return "Staff Picks";
      default:
        return category.charAt(0).toUpperCase() + category.slice(1) + " Agents";
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-2"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-3xl font-archivo-black">{getCategoryTitle()}</h1>
        </div>
        
        {/* Category filters */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Filter by Category</h2>
          <ScrollArea className="whitespace-nowrap pb-4" orientation="horizontal">
            <div className="flex gap-2 pb-2">
              {activeFilter && (
                <Badge 
                  variant="outline"
                  className="px-3 py-1 cursor-pointer bg-accent-primary text-white hover:bg-accent-primary/90"
                  onClick={() => setActiveFilter(null)}
                >
                  Clear Filter
                </Badge>
              )}
              
              {allTags.map((tag) => (
                <Badge 
                  key={tag}
                  variant="outline"
                  className={`px-3 py-1 cursor-pointer ${
                    activeFilter === tag 
                      ? 'bg-accent-primary text-white' 
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setActiveFilter(activeFilter === tag ? null : tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </ScrollArea>
        </div>
        
        <div className="mb-8">
          {agents.length > 0 ? (
            <AgentGrid agents={agents} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No agents found matching the selected criteria.</p>
              {activeFilter && (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setActiveFilter(null)}
                >
                  Clear Filter
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryView;
