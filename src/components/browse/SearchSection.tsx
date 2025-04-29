
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import BannerCarousel from '@/components/BannerCarousel';
import { BookmarkIcon } from 'lucide-react';

interface SearchSectionProps {
  categories: string[];
  activeCategory: string;
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  categories,
  activeCategory,
  onSearch,
  onCategoryChange
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-archivo-black mb-1 sm:mb-2">Enterprise Agent Store</h1>
          <p className="text-sm sm:text-lg text-muted-foreground">
            Discover and deploy AI agents that solve real business challenges
          </p>
        </div>
        <Button variant="outline" asChild className="hidden sm:flex items-center gap-2">
          <Link to="/saved-agents">
            <BookmarkIcon className="h-4 w-4" />
            Saved Agents
          </Link>
        </Button>
      </div>
      
      {/* Banner Carousel */}
      <div>
        <BannerCarousel />
      </div>
      
      {/* Search Bar - moved below banner */}
      <SearchBar onSearch={onSearch} />
      
      {/* Category Filter */}
      <CategoryFilter 
        categories={categories} 
        activeCategory={activeCategory} 
        onCategoryChange={onCategoryChange} 
      />
      
      {/* Mobile Saved Agents Button */}
      <div className="sm:hidden mt-4">
        <Button variant="outline" asChild className="w-full">
          <Link to="/saved-agents" className="flex items-center justify-center gap-2">
            <BookmarkIcon className="h-4 w-4" />
            Saved Agents
          </Link>
        </Button>
      </div>
    </>
  );
};

export default SearchSection;
