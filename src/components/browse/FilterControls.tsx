
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, ChevronRight } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import FilterPanel from '@/components/FilterPanel';
import ViewToggleAndSort from '@/components/ViewToggleAndSort';

interface FilterControlsProps {
  isMobile: boolean;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  sortOption: string;
  setSortOption: (option: string) => void;
  isFilterPanelOpen?: boolean;
  toggleFilterPanel?: () => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  isMobile,
  viewMode,
  setViewMode,
  sortOption,
  setSortOption,
  isFilterPanelOpen,
  toggleFilterPanel
}) => {
  return (
    <>
      {/* Mobile Filter Button */}
      {isMobile && (
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
      )}
      
      {/* Desktop Filter Toggle (shown when filter panel is closed) */}
      {!isMobile && !isFilterPanelOpen && (
        <div className="hidden md:block mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleFilterPanel}
            className="flex items-center"
          >
            <Filter className="mr-2 h-4 w-4" />
            Show Filters
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
      
      {/* View Toggle and Sort Controls */}
      <div className="mb-4">
        <ViewToggleAndSort 
          viewMode={viewMode} 
          setViewMode={setViewMode} 
          sortOption={sortOption} 
          setSortOption={setSortOption}
          isMobile={isMobile}
        />
      </div>
    </>
  );
};

export default FilterControls;
