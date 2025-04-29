
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

export type FilterOption = {
  id: string;
  name: string;
  count?: number;
  checked: boolean;
};

export type FilterCategory = {
  id: string;
  name: string;
  options: FilterOption[];
};

interface FilterSystemProps {
  categories: FilterCategory[];
  onFiltersChange: (categories: FilterCategory[]) => void;
}

const FilterSystem: React.FC<FilterSystemProps> = ({ categories: initialCategories, onFiltersChange }) => {
  const [categories, setCategories] = useState<FilterCategory[]>(initialCategories);
  const [open, setOpen] = useState(false);

  // Load saved filters from localStorage
  useEffect(() => {
    const savedFilters = localStorage.getItem('savedFilters');
    if (savedFilters) {
      try {
        const parsedFilters = JSON.parse(savedFilters);
        
        // Merge saved filter selections with current categories
        const mergedCategories = initialCategories.map(category => {
          const savedCategory = parsedFilters.find((c: FilterCategory) => c.id === category.id);
          
          if (savedCategory) {
            return {
              ...category,
              options: category.options.map(option => {
                const savedOption = savedCategory.options.find((o: FilterOption) => o.id === option.id);
                return savedOption ? { ...option, checked: savedOption.checked } : option;
              })
            };
          }
          return category;
        });
        
        setCategories(mergedCategories);
        // Trigger the initial filter
        onFiltersChange(mergedCategories);
      } catch (error) {
        console.error('Error loading saved filters:', error);
      }
    }
  }, [initialCategories, onFiltersChange]);

  // Get total active filters
  const activeFilterCount = categories.flatMap(
    category => category.options.filter(option => option.checked)
  ).length;

  // Handle checkbox change
  const handleCheckboxChange = (categoryId: string, optionId: string, checked: boolean) => {
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          options: category.options.map(option => {
            if (option.id === optionId) {
              return { ...option, checked };
            }
            return option;
          })
        };
      }
      return category;
    });
    
    setCategories(updatedCategories);
  };

  // Apply filters
  const applyFilters = () => {
    onFiltersChange(categories);
    setOpen(false);
  };

  // Save filter preferences
  const saveFilterPreferences = () => {
    localStorage.setItem('savedFilters', JSON.stringify(categories));
    toast({
      title: "Filters saved",
      description: "Your filter preferences have been saved"
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    const clearedCategories = categories.map(category => ({
      ...category,
      options: category.options.map(option => ({ ...option, checked: false }))
    }));
    
    setCategories(clearedCategories);
    onFiltersChange(clearedCategories);
    localStorage.removeItem('savedFilters');
    
    toast({
      title: "Filters cleared",
      description: "All filters have been reset"
    });
  };

  // Remove a specific filter
  const removeFilter = (categoryId: string, optionId: string) => {
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          options: category.options.map(option => {
            if (option.id === optionId) {
              return { ...option, checked: false };
            }
            return option;
          })
        };
      }
      return category;
    });
    
    setCategories(updatedCategories);
    onFiltersChange(updatedCategories);
  };

  // Get all active filters for display
  const activeFilters = categories.flatMap(category =>
    category.options
      .filter(option => option.checked)
      .map(option => ({
        categoryId: category.id,
        optionId: option.id,
        name: option.name,
        categoryName: category.name
      }))
  );

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-1 px-1 py-0 h-5">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filter Options</SheetTitle>
                <SheetDescription>
                  Refine results by selecting filters below
                </SheetDescription>
              </SheetHeader>
              
              <div className="my-6 h-[calc(100vh-200px)] overflow-y-auto pr-4">
                {categories.map((category) => (
                  <div key={category.id} className="mb-6">
                    <h4 className="font-medium mb-3">{category.name}</h4>
                    <div className="space-y-3">
                      {category.options.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`${category.id}-${option.id}`} 
                            checked={option.checked}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange(category.id, option.id, checked === true)
                            }
                          />
                          <Label htmlFor={`${category.id}-${option.id}`} className="flex-1 cursor-pointer">
                            {option.name}
                          </Label>
                          {option.count !== undefined && (
                            <span className="text-xs text-muted-foreground">{option.count}</span>
                          )}
                        </div>
                      ))}
                    </div>
                    <Separator className="mt-4" />
                  </div>
                ))}
              </div>
              
              <SheetFooter className="flex-col sm:flex-row gap-3">
                <Button variant="outline" onClick={clearAllFilters}>
                  Clear All
                </Button>
                <Button variant="secondary" onClick={saveFilterPreferences}>
                  Save Preferences
                </Button>
                <Button onClick={applyFilters}>
                  Apply Filters
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          
          {activeFilterCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-2 h-8 text-xs text-muted-foreground"
              onClick={clearAllFilters}
            >
              Clear all
            </Button>
          )}
        </div>
      </div>
      
      {/* Active filter badges */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeFilters.map((filter) => (
            <Badge 
              key={`${filter.categoryId}-${filter.optionId}`} 
              variant="outline"
              className="flex items-center gap-1 px-3 py-1"
            >
              <span className="text-xs text-muted-foreground mr-1">
                {filter.categoryName}:
              </span>
              {filter.name}
              <X 
                className="h-3 w-3 cursor-pointer ml-1" 
                onClick={() => removeFilter(filter.categoryId, filter.optionId)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSystem;
