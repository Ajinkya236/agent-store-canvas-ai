
import React, { useState } from 'react';
import Header from '@/components/Header';
import FilterPanel from '@/components/FilterPanel';
import ViewToggleAndSort from '@/components/ViewToggleAndSort';
import AgentGrid from '@/components/AgentGrid';
import FeaturedCollections from '@/components/FeaturedCollections';
import SearchBar from '@/components/SearchBar';
import BannerCarousel from '@/components/BannerCarousel';
import CategoryFilter from '@/components/CategoryFilter';
import { AgentProps } from '@/components/AgentCard';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Filter } from 'lucide-react';

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
  },
  {
    id: 7,
    name: "Marketing Copywriter",
    description: "Create compelling marketing copy for various channels and campaigns",
    logo: "/placeholder.svg",
    tags: ["API", "Chat"],
    users: 11200,
    rating: 4.7
  },
  {
    id: 8,
    name: "Financial Advisor",
    description: "Get personalized financial advice and investment recommendations",
    logo: "/placeholder.svg",
    tags: ["Chat"],
    users: 9100,
    rating: 4.3
  },
  {
    id: 9,
    name: "Code Assistant",
    description: "Review code, suggest improvements, and help debug issues across languages",
    logo: "/placeholder.svg",
    tags: ["API", "Chat"],
    users: 18700,
    rating: 4.9
  }
];

const Browse: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAgents, setFilteredAgents] = useState<AgentProps[]>(agentsData);
  const [activeCategory, setActiveCategory] = useState('All Categories');

  // Categories for filter
  const categories = [
    'All Categories',
    'Product Design',
    'Human Resources',
    'Learning',
    'Travel',
    'Policy',
    'Customer Service'
  ];

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredAgents(agentsData);
      return;
    }
    
    const queryLower = query.toLowerCase();
    setFilteredAgents(agentsData.filter(agent => {
      return agent.name.toLowerCase().includes(queryLower) || 
             agent.description.toLowerCase().includes(queryLower);
    }));
  };
  
  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    if (category === 'All Categories') {
      setFilteredAgents(agentsData);
      return;
    }
    
    const categoryLower = category.toLowerCase();
    setFilteredAgents(agentsData.filter(agent => {
      // In a real app, we would filter by category field
      // For now, let's just simulate filtering by including description or name
      return agent.description.toLowerCase().includes(categoryLower) || 
             agent.name.toLowerCase().includes(categoryLower);
    }));
  };
  
  // Create collections by filtering the agents data
  const trendingAgents = agentsData.filter((_, i) => i % 3 === 0);
  const staffPicksAgents = agentsData.filter((_, i) => i % 3 === 1);
  const newReleasesAgents = agentsData.filter((_, i) => i % 3 === 2);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 pt-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-archivo-black mb-2">Enterprise Agent Store</h1>
          <p className="text-lg text-muted-foreground mb-6">Discover and deploy AI agents that solve real business challenges</p>
          
          {/* Banner Carousel */}
          <BannerCarousel />
          
          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} />
          
          {/* Category Filter */}
          <CategoryFilter 
            categories={categories} 
            activeCategory={activeCategory} 
            onCategoryChange={handleCategoryChange} 
          />
          
          <div className="mt-8 flex gap-8">
            {/* Filter Panel - Hidden on mobile, visible on md and up */}
            <div className="hidden md:block">
              <FilterPanel />
            </div>
            
            {/* Mobile Filter Button */}
            <div className="md:hidden mb-4 w-full">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <FilterPanel />
                </SheetContent>
              </Sheet>
            </div>
            
            <div className="flex-1">
              <ViewToggleAndSort 
                viewMode={viewMode} 
                setViewMode={setViewMode} 
                sortOption={sortOption} 
                setSortOption={setSortOption}
              />
              
              {searchQuery || activeCategory !== 'All Categories' ? (
                <AgentGrid agents={filteredAgents} />
              ) : (
                <FeaturedCollections 
                  trendingAgents={trendingAgents}
                  staffPicksAgents={staffPicksAgents}
                  newReleasesAgents={newReleasesAgents}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
