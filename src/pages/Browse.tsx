import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import FilterPanel from '@/components/FilterPanel';
import { AgentProps } from '@/components/AgentCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import refactored components
import SearchSection from '@/components/browse/SearchSection';
import FilterControls from '@/components/browse/FilterControls';
import MainContent from '@/components/browse/MainContent';
import ScrollToTopButton from '@/components/browse/ScrollToTopButton';

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
}, {
  id: 5,
  name: "UX Design Assistant",
  description: "Generate UI mockups and design recommendations based on best practices",
  logo: "/placeholder.svg",
  tags: ["API"],
  users: 9800,
  rating: 4.6
}, {
  id: 6,
  name: "Learning Coach",
  description: "Personalized learning paths and skill development recommendations for teams",
  logo: "/placeholder.svg",
  tags: ["Chat"],
  users: 7200,
  rating: 4.4
}, {
  id: 7,
  name: "Marketing Copywriter",
  description: "Create compelling marketing copy for various channels and campaigns",
  logo: "/placeholder.svg",
  tags: ["API", "Chat"],
  users: 11200,
  rating: 4.7
}, {
  id: 8,
  name: "Financial Advisor",
  description: "Get personalized financial advice and investment recommendations",
  logo: "/placeholder.svg",
  tags: ["Chat"],
  users: 9100,
  rating: 4.3
}, {
  id: 9,
  name: "Code Assistant",
  description: "Review code, suggest improvements, and help debug issues across languages",
  logo: "/placeholder.svg",
  tags: ["API", "Chat"],
  users: 18700,
  rating: 4.9
}];
const Browse: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAgents, setFilteredAgents] = useState<AgentProps[]>(agentsData);
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const isMobile = useIsMobile();

  // Categories for filter
  const categories = ['All Categories', 'Product Design', 'Human Resources', 'Learning', 'Travel', 'Policy', 'Customer Service'];

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredAgents(agentsData);
      return;
    }
    const queryLower = query.toLowerCase();
    setFilteredAgents(agentsData.filter(agent => {
      return agent.name.toLowerCase().includes(queryLower) || agent.description.toLowerCase().includes(queryLower);
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
      return agent.description.toLowerCase().includes(categoryLower) || agent.name.toLowerCase().includes(categoryLower);
    }));
  };

  // Toggle filter panel
  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };

  // Create collections by filtering the agents data
  const trendingAgents = agentsData.filter((_, i) => i % 3 === 0);
  const staffPicksAgents = agentsData.filter((_, i) => i % 3 === 1);
  const newReleasesAgents = agentsData.filter((_, i) => i % 3 === 2);

  // Add scroll event listener to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <div className="min-h-screen bg-background">
      <Header />
      
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-4 md:pt-8">
        <div className="max-w-7xl mx-auto">
          {/* Search and Category Filter Section */}
          <SearchSection categories={categories} activeCategory={activeCategory} onSearch={handleSearch} onCategoryChange={handleCategoryChange} />
          
          <div className="mt-6 flex flex-col md:flex-row md:gap-8 relative">
            {/* Custom Filter Panel Toggle for Desktop */}
            {!isMobile}
            
            {/* Filter Panel - Hidden by default, visible when toggled */}
            {!isMobile && isFilterPanelOpen && <div className="md:w-64 lg:w-72 flex-shrink-0 transition-all duration-300 ease-in-out">
                <div className="sticky top-24 bg-card rounded-lg border p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Filters</h3>
                    <Button variant="ghost" size="sm" onClick={toggleFilterPanel} className="h-8 w-8 p-0">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </div>
                  <FilterPanel />
                </div>
              </div>}
            
            <div className={`flex-1 w-full ${!isMobile && isFilterPanelOpen ? 'md:ml-[300px]' : ''} transition-all duration-300`}>
              {/* Filter Controls and View Toggle */}
              <FilterControls isMobile={isMobile} viewMode={viewMode} setViewMode={setViewMode} sortOption={sortOption} setSortOption={setSortOption} isFilterPanelOpen={isFilterPanelOpen} toggleFilterPanel={toggleFilterPanel} />
              
              {/* Main Content - Grid or Collections */}
              <MainContent searchQuery={searchQuery} activeCategory={activeCategory} filteredAgents={filteredAgents} trendingAgents={trendingAgents} staffPicksAgents={staffPicksAgents} newReleasesAgents={newReleasesAgents} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <ScrollToTopButton isVisible={showScrollToTop} />
    </div>;
};
export default Browse;