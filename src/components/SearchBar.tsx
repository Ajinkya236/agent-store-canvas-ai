
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const isMobile = useIsMobile();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="w-full mb-4">
      <div className="max-w-full mx-auto">
        <form onSubmit={handleSearch} className="relative">
          <div className="flex items-center relative rounded-full border bg-card border-border shadow-sm transition-all focus-within:ring-1 focus-within:ring-accent focus-within:border-accent">
            <div className="pl-4">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="search"
              placeholder={isMobile ? "Search agents..." : "Search for enterprise AI agents..."}
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 pl-2 py-4 sm:py-6"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
