
import React from 'react';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import BannerCarousel from '@/components/BannerCarousel';

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
      <h1 className="text-2xl sm:text-3xl font-archivo-black mb-1 sm:mb-2">Enterprise Agent Store</h1>
      <p className="text-sm sm:text-lg text-muted-foreground mb-4 sm:mb-6">
        Discover and deploy AI agents that solve real business challenges
      </p>
      
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
    </>
  );
};

export default SearchSection;
