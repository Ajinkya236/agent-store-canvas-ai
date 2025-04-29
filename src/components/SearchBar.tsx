
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSearch} className="relative">
          <div className="flex items-center relative rounded-full border bg-card border-border shadow-sm transition-all focus-within:ring-1 focus-within:ring-accent focus-within:border-accent">
            <div className="pl-4">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="search"
              placeholder="Search for enterprise AI agents..."
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 pl-2 py-6"
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
