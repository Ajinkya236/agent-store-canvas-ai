
import React, { useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeCategoryRef = useRef<HTMLButtonElement>(null);
  const isMobile = useIsMobile();
  
  // Scroll active category into view
  useEffect(() => {
    if (activeCategoryRef.current && scrollContainerRef.current && isMobile) {
      const container = scrollContainerRef.current;
      const activeButton = activeCategoryRef.current;
      
      // Calculate scroll position to center the active button
      const scrollLeft = activeButton.offsetLeft - (container.clientWidth / 2) + (activeButton.clientWidth / 2);
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeCategory, isMobile]);

  return (
    <div className="w-full pt-4 pb-2 overflow-hidden">
      <div 
        ref={scrollContainerRef} 
        className="flex gap-2 pb-1 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {categories.map((category, index) => (
          <button
            key={category}
            ref={category === activeCategory ? activeCategoryRef : null}
            onClick={() => onCategoryChange(category)}
            className={`px-3 py-2 rounded-full whitespace-nowrap text-sm transition-all duration-300 font-archivo animate-fade-in flex-shrink-0 touch-action-manipulation ${
              activeCategory === category
                ? 'bg-accent text-white shadow-md'
                : 'bg-gray-200 text-black hover:bg-gray-300'
            }`}
            style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards', opacity: 0 }}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
