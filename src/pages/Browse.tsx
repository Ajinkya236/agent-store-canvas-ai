
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
import { Filter, ChevronUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const isMobile = useIsMobile();
  
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
      return agent.description.toLowerCase().includes(categoryLower) || 
             agent.name.toLowerCase().includes(categoryLower);
    }));
  };

  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Create collections by filtering the agents data
  const trendingAgents = agentsData.filter((_, i) => i % 3 === 0);
  const staffPicksAgents = agentsData.filter((_, i) => i % 3 === 1);
  const newReleasesAgents = agentsData.filter((_, i) => i % 3 === 2);

  // Add scroll event listener to show/hide scroll-to-top button
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-4 md:pt-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-archivo-black mb-1 sm:mb-2">Enterprise Agent Store</h1>
          <p className="text-sm sm:text-lg text-muted-foreground mb-4 sm:mb-6">Discover and deploy AI agents that solve real business challenges</p>
          
          {/* Search Bar - Full Width for Mobile */}
          <SearchBar onSearch={handleSearch} />
          
          {/* Banner Carousel - Adjusted for Mobile */}
          <div className="mt-4">
            <BannerCarousel />
          </div>
          
          {/* Category Filter - Horizontally Scrollable for Mobile */}
          <CategoryFilter 
            categories={categories} 
            activeCategory={activeCategory} 
            onCategoryChange={handleCategoryChange} 
          />
          
          <div className="mt-6 flex flex-col md:flex-row md:gap-8">
            {/* Mobile Filter Button - Only shown on mobile */}
            <div className="md:hidden mb-4 w-full">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full flex items-center justify-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh] rounded-t-xl">
                  <div className="py-4 px-1">
                    <h3 className="text-lg font-semibold mb-4">Filter Agents</h3>
                    <FilterPanel />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            
            {/* Filter Panel - Hidden on mobile, visible on md and up */}
            <div className="hidden md:block md:w-64 lg:w-72 flex-shrink-0">
              <div className="sticky top-24">
                <FilterPanel />
              </div>
            </div>
            
            <div className="flex-1 w-full">
              {/* View Toggle and Sort - Simplified for mobile */}
              <div className="mb-4">
                <ViewToggleAndSort 
                  viewMode={viewMode} 
                  setViewMode={setViewMode} 
                  sortOption={sortOption} 
                  setSortOption={setSortOption}
                  isMobile={isMobile}
                />
              </div>
              
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

      {/* Scroll to top button - appears after scrolling */}
      {showScrollToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 rounded-full w-12 h-12 p-0 shadow-lg z-50"
          variant="default"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default Browse;
