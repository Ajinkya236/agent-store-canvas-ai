import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/components/ui/command";
import { useNavigate } from 'react-router-dom';

// Define search result types
type SearchResultItem = {
  id: string | number;
  name: string;
  category: string;
  url: string;
  description?: string;
};

interface GlobalSearchProps {
  onSearchComplete?: () => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ onSearchComplete }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const navigate = useNavigate();

  // Mock search results
  const searchResults: SearchResultItem[] = [
    {
      id: 1,
      name: "Document Analyzer",
      category: "Agents",
      url: "/agent/1",
      description: "Extract and analyze data from documents"
    },
    {
      id: 2,
      name: "HR Assistant",
      category: "Agents",
      url: "/agent/2",
      description: "HR process automation and employee support"
    },
    {
      id: 3,
      name: "Agent Development Guide",
      category: "Documentation",
      url: "/docs/agent-development",
      description: "Learn how to build custom agents"
    },
    {
      id: 4,
      name: "API Integration",
      category: "Documentation",
      url: "/docs/api",
      description: "Connect agents to external systems"
    },
    {
      id: 5,
      name: "Enterprise Security",
      category: "Forums",
      url: "/community?topic=security",
      description: "Discussion about enterprise security configurations"
    }
  ];

  // Popular searches
  const popularSearches = [
    "document processing", 
    "chatbot integration", 
    "api documentation", 
    "enterprise deployment", 
    "security"
  ];

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Filter results based on query
  const filteredResults = query === "" ? [] : searchResults.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) || 
    item.description?.toLowerCase().includes(query.toLowerCase())
  );

  // Group results by category
  const groupedResults = filteredResults.reduce<Record<string, SearchResultItem[]>>((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {});

  const saveSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    // Add to recent searches and keep only unique values and last 5
    const updatedSearches = [
      searchTerm,
      ...recentSearches.filter(s => s !== searchTerm)
    ].slice(0, 5);
    
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const handleSelect = (item: SearchResultItem) => {
    saveSearch(item.name);
    navigate(item.url);
    setOpen(false);
    if (onSearchComplete) onSearchComplete();
  };

  const handleSearchSubmit = () => {
    if (query.trim()) {
      saveSearch(query);
      navigate(`/browse?q=${encodeURIComponent(query)}`);
      setOpen(false);
      if (onSearchComplete) onSearchComplete();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // Keyboard shortcut to open search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <Button 
        variant="outline" 
        className="relative h-9 w-full justify-start text-sm text-muted-foreground sm:w-64 md:w-80 lg:w-96"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 mr-2" />
        <span className="hidden lg:inline">Search agents, docs, forums...</span>
        <span className="inline lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-2 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search agents, documentation, forums..." 
          value={query} 
          onValueChange={setQuery}
          onKeyDown={handleKeyDown}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          {!query && recentSearches.length > 0 && (
            <CommandGroup heading="Recent Searches">
              {recentSearches.map((item) => (
                <CommandItem 
                  key={item} 
                  onSelect={() => {
                    setQuery(item);
                    navigate(`/browse?q=${encodeURIComponent(item)}`);
                    setOpen(false);
                  }}
                >
                  <Search className="mr-2 h-4 w-4" />
                  <span>{item}</span>
                </CommandItem>
              ))}
              <CommandItem onSelect={clearRecentSearches} className="text-muted-foreground justify-end">
                <X className="mr-1 h-3 w-3" />
                Clear recents
              </CommandItem>
            </CommandGroup>
          )}

          {!query && popularSearches.length > 0 && (
            <CommandGroup heading="Popular Searches">
              {popularSearches.map((item) => (
                <CommandItem 
                  key={item} 
                  onSelect={() => {
                    setQuery(item);
                    navigate(`/browse?q=${encodeURIComponent(item)}`);
                    setOpen(false);
                  }}
                >
                  <Search className="mr-2 h-4 w-4" />
                  <span>{item}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {Object.keys(groupedResults).length > 0 && (
            <>
              <CommandSeparator />
              {Object.entries(groupedResults).map(([category, items]) => (
                <CommandGroup key={category} heading={category}>
                  {items.map((item) => (
                    <CommandItem key={item.id} onSelect={() => handleSelect(item)}>
                      <Search className="mr-2 h-4 w-4" />
                      <div className="flex flex-col">
                        <span>{item.name}</span>
                        {item.description && (
                          <span className="text-xs text-muted-foreground">{item.description}</span>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default GlobalSearch;
