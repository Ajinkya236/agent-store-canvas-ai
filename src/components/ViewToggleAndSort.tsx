
import React from 'react';
import { Button } from '@/components/ui/button';
import { Grid2X2, List } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ViewToggleAndSortProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  sortOption: string;
  setSortOption: (option: string) => void;
  isMobile?: boolean;
}

const ViewToggleAndSort: React.FC<ViewToggleAndSortProps> = ({
  viewMode,
  setViewMode,
  sortOption,
  setSortOption,
  isMobile = false
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-2">
        <Button
          variant={viewMode === 'grid' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('grid')}
          aria-label="Grid view"
          className="h-9 w-9 p-0"
        >
          <Grid2X2 className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === 'list' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('list')}
          aria-label="List view"
          className="h-9 w-9 p-0"
        >
          <List className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center">
        {!isMobile && <span className="mr-2 text-sm text-muted-foreground hidden md:inline">Sort by:</span>}
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className={isMobile ? "w-[130px]" : "w-[180px]"}>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ViewToggleAndSort;
