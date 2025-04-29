
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronDown } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const FilterPanel: React.FC = () => {
  const categories = [
    "All Categories", 
    "Product Design", 
    "Human Resources", 
    "Learning", 
    "Travel", 
    "Policy", 
    "Customer Service"
  ];
  
  const capabilities = [
    "API Integration", 
    "Chat Interface", 
    "Document Analysis", 
    "Data Processing", 
    "Image Generation", 
    "Voice Recognition"
  ];

  return (
    <div className="w-full md:w-64 lg:w-72 flex-shrink-0">
      <Card className="sticky top-24">
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Categories */}
          <div>
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex w-full items-center justify-between font-archivo-black">
                Categories <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-4 space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox id={`category-${category}`} />
                      <label htmlFor={`category-${category}`} className="text-sm">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Price Range */}
          <div>
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex w-full items-center justify-between font-archivo-black">
                Price <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="price-free" />
                      <label htmlFor="price-free" className="text-sm">Free</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="price-paid" />
                      <label htmlFor="price-paid" className="text-sm">Paid</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="price-subscription" />
                      <label htmlFor="price-subscription" className="text-sm">Subscription</label>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Rating Filter */}
          <div>
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex w-full items-center justify-between font-archivo-black">
                Rating <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rating-4plus" />
                    <label htmlFor="rating-4plus" className="text-sm flex items-center">
                      4+ Stars
                      <div className="flex ml-1">
                        {[...Array(4)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-3 h-3 text-amber-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rating-3plus" />
                    <label htmlFor="rating-3plus" className="text-sm flex items-center">
                      3+ Stars
                      <div className="flex ml-1">
                        {[...Array(3)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-3 h-3 text-amber-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </label>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Capabilities */}
          <div>
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex w-full items-center justify-between font-archivo-black">
                Capabilities <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-4 space-y-2">
                  {capabilities.map((capability) => (
                    <div key={capability} className="flex items-center space-x-2">
                      <Checkbox id={`capability-${capability}`} />
                      <label htmlFor={`capability-${capability}`} className="text-sm">
                        {capability}
                      </label>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Release Date */}
          <div>
            <Collapsible>
              <CollapsibleTrigger className="flex w-full items-center justify-between font-archivo-black">
                Release Date <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="date-thisweek" />
                    <label htmlFor="date-thisweek" className="text-sm">This Week</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="date-thismonth" />
                    <label htmlFor="date-thismonth" className="text-sm">This Month</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="date-thisyear" />
                    <label htmlFor="date-thisyear" className="text-sm">This Year</label>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    Custom Range
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button className="flex-1">Apply</Button>
            <Button variant="outline" className="flex-1">Reset</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterPanel;
