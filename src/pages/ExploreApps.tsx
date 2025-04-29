
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, MessageSquare, FileText, Star, Zap, Search, Brain, PencilRuler, Bot, Sparkles, Code, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AppCardProps {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  creator: string;
  rating: number;
  downloads: number;
}

const AppCard: React.FC<AppCardProps> = ({ id, name, description, icon, category, creator, rating, downloads }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card 
        className={`overflow-hidden transition-all duration-200 h-full ${isHovered ? 'shadow-md transform scale-[1.02]' : 'shadow-sm'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(true)}
      >
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                {icon}
              </div>
              <div>
                <CardTitle className="text-lg">{name}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{category}</Badge>
                  <span className="text-xs text-muted-foreground">by {creator}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="h-4 w-4 text-amber-400 mr-1" />
              <span>{rating.toFixed(1)}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-xs text-muted-foreground flex items-center">
            <Download className="h-3 w-3 mr-1" />
            {downloads.toLocaleString()} downloads
          </div>
          <div className={`absolute inset-0 bg-black/50 flex items-center justify-center ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}>
            <Button variant="secondary" size="sm">View Details</Button>
          </div>
        </CardFooter>
      </Card>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                {icon}
              </div>
              <div>
                <DialogTitle>{name}</DialogTitle>
                <DialogDescription>By {creator}</DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <ScrollArea className="max-h-[50vh]">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Usage Instructions</h3>
                <p className="text-sm text-muted-foreground">
                  To use this app, simply start a conversation and mention the task you'd like help with. 
                  The app will automatically provide the appropriate assistance based on your request.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Features</h3>
                <ul className="text-sm text-muted-foreground space-y-1 ml-5 list-disc">
                  <li>Advanced AI-powered assistance</li>
                  <li>Seamless integration with your existing workflow</li>
                  <li>Data privacy and security</li>
                  <li>Regular updates and improvements</li>
                </ul>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <div className="flex items-center justify-between w-full gap-3">
              <div className="flex items-center text-sm">
                <Star className="h-4 w-4 text-amber-400 mr-1" />
                <span>{rating.toFixed(1)} • {downloads.toLocaleString()} downloads</span>
              </div>
              <Button>Try Now</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const ExploreApps: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleApps, setVisibleApps] = useState(8);
  const [isSearchSticky, setIsSearchSticky] = useState(false);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'trending', name: 'Trending' },
    { id: 'new', name: 'New' },
    { id: 'productivity', name: 'Productivity' },
    { id: 'creativity', name: 'Creativity' },
    { id: 'development', name: 'Development' },
    { id: 'analytics', name: 'Analytics' }
  ];

  const allApps: AppCardProps[] = [
    {
      id: '1',
      name: 'Document Analyzer',
      description: 'Extract key insights from documents and generate summaries automatically. Perfect for researchers, students, and professionals working with large volumes of text.',
      icon: <FileText className="h-5 w-5" />,
      category: 'Productivity',
      creator: 'AI Research Team',
      rating: 4.7,
      downloads: 15400
    },
    {
      id: '2',
      name: 'Meeting Assistant',
      description: 'Takes notes during meetings and generates actionable summaries. Integrates with popular video conferencing platforms for seamless workflow.',
      icon: <MessageSquare className="h-5 w-5" />,
      category: 'Business',
      creator: 'Productivity Labs',
      rating: 4.5,
      downloads: 12300
    },
    {
      id: '3',
      name: 'Code Helper',
      description: 'Assists with code reviews, bug detection, and providing code solutions. Supports multiple programming languages and frameworks for developers at all levels.',
      icon: <Code className="h-5 w-5" />,
      category: 'Development',
      creator: 'DevTech AI',
      rating: 4.9,
      downloads: 18700
    },
    {
      id: '4',
      name: 'Language Tutor',
      description: 'Practice conversations in different languages with an AI language tutor. Features native-sounding pronunciation and cultural context for immersive learning.',
      icon: <MessageSquare className="h-5 w-5" />,
      category: 'Education',
      creator: 'LinguaLearn',
      rating: 4.6,
      downloads: 9800
    },
    {
      id: '5',
      name: 'Data Visualizer',
      description: 'Creates beautiful charts and visualizations from your data with natural language. Transform complex datasets into insightful visuals without coding.',
      icon: <BarChart3 className="h-5 w-5" />,
      category: 'Analytics',
      creator: 'Dataviz Pro',
      rating: 4.3,
      downloads: 7500
    },
    {
      id: '6',
      name: 'Email Writer',
      description: 'Drafts professional emails based on your instructions and tone preferences. Ensures clear communication with appropriate formality for any business context.',
      icon: <MessageSquare className="h-5 w-5" />,
      category: 'Communication',
      creator: 'ClearComm AI',
      rating: 4.8,
      downloads: 14200
    },
    {
      id: '7',
      name: 'Creative Writer',
      description: 'Generates stories, poems, and creative content based on your prompts. Unleash your creativity with AI-powered assistance for various writing styles.',
      icon: <PencilRuler className="h-5 w-5" />,
      category: 'Creativity',
      creator: 'StoryForge AI',
      rating: 4.4,
      downloads: 8900
    },
    {
      id: '8',
      name: 'Research Assistant',
      description: 'Helps with literature reviews, finding references, and summarizing academic papers. An essential tool for students and researchers in all disciplines.',
      icon: <Brain className="h-5 w-5" />,
      category: 'Education',
      creator: 'Academic AI',
      rating: 4.7,
      downloads: 11300
    },
    {
      id: '9',
      name: 'Social Media Manager',
      description: 'Creates engaging social media content and suggests optimal posting schedules. Boost your online presence with AI-optimized content strategies.',
      icon: <Sparkles className="h-5 w-5" />,
      category: 'Marketing',
      creator: 'SocialBoost',
      rating: 4.2,
      downloads: 9400
    },
    {
      id: '10',
      name: 'AI Chatbot Builder',
      description: 'Create custom chatbots for your website or application without coding. Design conversational experiences for customer support or lead generation.',
      icon: <Bot className="h-5 w-5" />,
      category: 'Development',
      creator: 'BotWorks',
      rating: 4.8,
      downloads: 13600
    }
  ];

  // Filter apps based on search query and category
  const filteredApps = allApps.filter(app => {
    const matchesSearch = 
      searchQuery === '' || 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      activeCategory === 'All' || 
      app.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Load more apps
  const loadMoreApps = () => {
    setVisibleApps(prev => Math.min(prev + 4, filteredApps.length));
  };

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSearchSticky(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Highlight matching text in app name and description
  const highlightMatch = (text: string) => {
    if (!searchQuery) return text;
    
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    return text.replace(regex, '<mark style="background-color: rgba(255, 242, 155, 0.7); padding: 0 2px;">$1</mark>');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div 
        className={`bg-background transition-all duration-200 ${isSearchSticky ? 'fixed top-0 left-0 right-0 z-10 shadow-md pt-4 pb-4' : 'pt-0'}`}
      >
        <div className="container">
          {!isSearchSticky && (
            <div className="flex items-center mb-6 mt-8">
              <Button variant="ghost" className="mr-4" asChild>
                <Link to="/chat-assistant">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Chat
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-archivo-black mb-1">Explore Apps</h1>
                <p className="text-muted-foreground">
                  Extend your AI assistant with specialized capabilities
                </p>
              </div>
            </div>
          )}
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 h-12 border-2 focus:border-primary"
            />
          </div>

          <div className="flex items-center overflow-x-auto pb-2 gap-2 hide-scrollbar">
            {categories.map(category => (
              <Button 
                key={category.id}
                variant={activeCategory === category.name ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.name)}
                className="transition-all duration-200 whitespace-nowrap"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <div className={`container py-6 ${isSearchSticky ? 'mt-32' : ''}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.slice(0, visibleApps).map((app, index) => (
            <div 
              key={app.id}
              className="animate-fade-in" 
              style={{ 
                animationDelay: `${0.05 + index * 0.05}s`, 
                animationFillMode: 'both',
                opacity: 0
              }}
            >
              <AppCard {...app} />
            </div>
          ))}
        </div>
        
        {visibleApps < filteredApps.length && (
          <div className="mt-8 text-center">
            <Button onClick={loadMoreApps} variant="outline">
              Load More
            </Button>
          </div>
        )}
        
        {filteredApps.length === 0 && (
          <div className="text-center py-16">
            <Search className="h-10 w-10 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">No apps found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search query or filter selection
            </p>
          </div>
        )}
      </div>

      {/* Fix the style element by removing the jsx property */}
      <style>
        {`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        `}
      </style>
    </div>
  );
};

export default ExploreApps;
