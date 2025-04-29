
import React from 'react';

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
  return (
    <div className="w-full pt-8 pb-4 px-6 sm:px-10 md:px-14 lg:px-20 overflow-x-auto scrollbar-none">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-2 pb-1">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all duration-300 font-archivo animate-fade-in ${
                activeCategory === category
                  ? 'bg-accent text-white shadow-md'
                  : 'bg-secondary text-primary hover:bg-secondary/80'
              }`}
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards', opacity: 0 }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
