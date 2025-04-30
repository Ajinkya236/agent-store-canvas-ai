import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import AgentGrid from '@/components/AgentGrid';
import { AgentProps } from '@/components/AgentCard';

// Sample agent data for different categories
const allAgents: Record<string, AgentProps[]> = {
  trending: [
    {
      id: 1,
      name: "Data Analyzer Pro",
      description: "Advanced data analysis with AI-driven insights and visualization tools",
      logo: "/placeholder.svg",
      tags: ["API", "Data", "Business"],
      users: 34800,
      rating: 4.9
    },
    {
      id: 2,
      name: "AI-Driven CRM",
      description: "Customer relationship management with intelligent automation and predictive analytics",
      logo: "/placeholder.svg",
      tags: ["Chat", "Business"],
      users: 29500,
      rating: 4.7
    },
    {
      id: 3,
      name: "Financial Forecaster",
      description: "Predict future financial trends with machine learning algorithms",
      logo: "/placeholder.svg",
      tags: ["API", "Finance", "Data"],
      users: 25100,
      rating: 4.6
    },
    {
      id: 4,
      name: "Healthcare Assistant",
      description: "AI assistant for healthcare professionals to improve patient care and diagnostics",
      logo: "/placeholder.svg",
      tags: ["Chat", "Healthcare"],
      users: 21800,
      rating: 4.5
    },
    {
      id: 5,
      name: "E-commerce Optimizer",
      description: "Optimize e-commerce sales with AI-driven product recommendations and pricing strategies",
      logo: "/placeholder.svg",
      tags: ["API", "Business"],
      users: 18400,
      rating: 4.4
    },
    {
      id: 6,
      name: "Social Media Manager",
      description: "Manage social media presence with AI-generated content and engagement strategies",
      logo: "/placeholder.svg",
      tags: ["Chat", "Marketing"],
      users: 15200,
      rating: 4.3
    },
    {
      id: 7,
      name: "Legal Advisor",
      description: "AI legal advisor that provides guidance on legal matters and compliance",
      logo: "/placeholder.svg",
      tags: ["API", "Legal"],
      users: 12900,
      rating: 4.2
    },
    {
      id: 8,
      name: "Educational Tutor",
      description: "Personalized educational tutor that adapts to individual learning styles",
      logo: "/placeholder.svg",
      tags: ["Chat", "Education"],
      users: 9600,
      rating: 4.1
    },
    {
      id: 9,
      name: "Travel Planner Pro",
      description: "Plan business trips and manage travel arrangements with intelligent recommendations",
      logo: "/placeholder.svg",
      tags: ["API", "Chat"],
      users: 7300,
      rating: 4.0
    },
    {
      id: 10,
      name: "Fitness Coach",
      description: "AI fitness coach that provides personalized workout and nutrition plans",
      logo: "/placeholder.svg",
      tags: ["Chat", "Healthcare"],
      users: 5100,
      rating: 3.9
    }
  ],
  "staff-picks": [
    {
      id: 11,
      name: "Email Assistant",
      description: "Smart email composer with templates and sentiment analysis",
      logo: "/placeholder.svg",
      tags: ["Productivity", "Chat"],
      users: 28400,
      rating: 4.8
    },
    {
      id: 12,
      name: "Meeting Scheduler",
      description: "Automated meeting scheduler that finds the best time for all attendees",
      logo: "/placeholder.svg",
      tags: ["Productivity", "API"],
      users: 24900,
      rating: 4.7
    },
    {
      id: 13,
      name: "Note Taker Pro",
      description: "AI note taker that summarizes key points and action items from meetings",
      logo: "/placeholder.svg",
      tags: ["Productivity", "Chat"],
      users: 21500,
      rating: 4.6
    },
    {
      id: 14,
      name: "Presentation Builder",
      description: "AI presentation builder that creates visually appealing slides from text",
      logo: "/placeholder.svg",
      tags: ["Productivity", "API"],
      users: 18200,
      rating: 4.5
    },
    {
      id: 15,
      name: "Content Summarizer",
      description: "AI content summarizer that extracts key information from articles and documents",
      logo: "/placeholder.svg",
      tags: ["Productivity", "Chat"],
      users: 14800,
      rating: 4.4
    },
    {
      id: 16,
      name: "Language Translator",
      description: "Real-time language translator that supports multiple languages",
      logo: "/placeholder.svg",
      tags: ["Productivity", "API"],
      users: 11600,
      rating: 4.3
    },
    {
      id: 17,
      name: "Writing Assistant",
      description: "AI writing assistant that helps improve grammar and style",
      logo: "/placeholder.svg",
      tags: ["Productivity", "Chat"],
      users: 8300,
      rating: 4.2
    },
    {
      id: 18,
      name: "Research Tool",
      description: "AI research tool that helps find relevant information from academic papers",
      logo: "/placeholder.svg",
      tags: ["Productivity", "API"],
      users: 6000,
      rating: 4.1
    },
    {
      id: 19,
      name: "Time Tracker",
      description: "Automated time tracker that records time spent on different tasks",
      logo: "/placeholder.svg",
      tags: ["Productivity", "Business"],
      users: 3700,
      rating: 4.0
    },
    {
      id: 20,
      name: "Password Manager",
      description: "Secure password manager that generates and stores strong passwords",
      logo: "/placeholder.svg",
      tags: ["Productivity", "Security"],
      users: 2500,
      rating: 3.9
    }
  ],
  new: [
    {
      id: 21,
      name: "Code Reviewer",
      description: "AI code review assistant that provides feedback on code quality and potential bugs",
      logo: "/placeholder.svg",
      tags: ["Development", "API"],
      users: 5600,
      rating: 4.4
    },
    {
      id: 22,
      name: "UI Designer",
      description: "AI UI designer that generates user interfaces from natural language descriptions",
      logo: "/placeholder.svg",
      tags: ["Development", "Chat"],
      users: 4900,
      rating: 4.3
    },
    {
      id: 23,
      name: "Test Generator",
      description: "AI test generator that creates unit tests and integration tests",
      logo: "/placeholder.svg",
      tags: ["Development", "API"],
      users: 4200,
      rating: 4.2
    },
    {
      id: 24,
      name: "Bug Finder",
      description: "AI bug finder that identifies potential bugs in code",
      logo: "/placeholder.svg",
      tags: ["Development", "Chat"],
      users: 3500,
      rating: 4.1
    },
    {
      id: 25,
      name: "Code Converter",
      description: "AI code converter that translates code from one language to another",
      logo: "/placeholder.svg",
      tags: ["Development", "API"],
      users: 2800,
      rating: 4.0
    },
    {
      id: 26,
      name: "Documentation Generator",
      description: "AI documentation generator that creates documentation from code",
      logo: "/placeholder.svg",
      tags: ["Development", "Chat"],
      users: 2100,
      rating: 3.9
    },
    {
      id: 27,
      name: "Code Optimizer",
      description: "AI code optimizer that improves code performance",
      logo: "/placeholder.svg",
      tags: ["Development", "API"],
      users: 1400,
      rating: 3.8
    },
    {
      id: 28,
      name: "Dependency Manager",
      description: "AI dependency manager that manages project dependencies",
      logo: "/placeholder.svg",
      tags: ["Development", "Chat"],
      users: 700,
      rating: 3.7
    },
  ],
  productivity: [
    {
      id: 31,
      name: "Task Manager Pro",
      description: "AI-powered task management with smart prioritization and reminders",
      logo: "/placeholder.svg",
      tags: ["Productivity", "Business"],
      users: 22300,
      rating: 4.7
    },
    {
      id: 32,
      name: "Calendar Assistant",
      description: "AI calendar assistant that schedules meetings and sends reminders",
      logo: "/placeholder.svg",
      tags: ["Productivity", "API"],
      users: 19800,
      rating: 4.6
    },
    {
      id: 33,
      name: "Email Sorter",
      description: "AI email sorter that categorizes and prioritizes emails",
      logo: "/placeholder.svg",
      tags: ["Productivity", "Chat"],
      users: 17400,
      rating: 4.5
    },
    {
      id: 34,
      name: "File Organizer",
      description: "AI file organizer that automatically sorts and tags files",
      logo: "/placeholder.svg",
      tags: ["Productivity", "API"],
      users: 15000,
      rating: 4.4
    },
    {
      id: 35,
      name: "Note Taker",
      description: "AI note taker that transcribes and summarizes notes",
      logo: "/placeholder.svg",
      tags: ["Productivity", "Chat"],
      users: 12600,
      rating: 4.3
    },
    {
      id: 36,
      name: "Document Editor",
      description: "AI document editor that suggests improvements to writing",
      logo: "/placeholder.svg",
      tags: ["Productivity", "API"],
      users: 10200,
      rating: 4.2
    },
    {
      id: 37,
      name: "Presentation Maker",
      description: "AI presentation maker that creates slides from text",
      logo: "/placeholder.svg",
      tags: ["Productivity", "Chat"],
      users: 7800,
      rating: 4.1
    },
    {
      id: 38,
      name: "Report Generator",
      description: "AI report generator that creates reports from data",
      logo: "/placeholder.svg",
      tags: ["Productivity", "API"],
      users: 5400,
      rating: 4.0
    },
  ],
  business: [
    {
      id: 41,
      name: "Market Analyzer",
      description: "Real-time market analysis with predictive insights for business decisions",
      logo: "/placeholder.svg",
      tags: ["Business", "Data"],
      users: 18900,
      rating: 4.6
    },
    {
      id: 42,
      name: "Sales Forecaster",
      description: "AI sales forecaster that predicts future sales trends",
      logo: "/placeholder.svg",
      tags: ["Business", "API"],
      users: 16500,
      rating: 4.5
    },
    {
      id: 43,
      name: "Customer Service Bot",
      description: "AI customer service bot that answers customer questions",
      logo: "/placeholder.svg",
      tags: ["Business", "Chat"],
      users: 14100,
      rating: 4.4
    },
    {
      id: 44,
      name: "Financial Advisor",
      description: "AI financial advisor that provides financial advice",
      logo: "/placeholder.svg",
      tags: ["Business", "API"],
      users: 11700,
      rating: 4.3
    },
    {
      id: 45,
      name: "HR Assistant",
      description: "AI HR assistant that helps with HR tasks",
      logo: "/placeholder.svg",
      tags: ["Business", "Chat"],
      users: 9300,
      rating: 4.2
    },
    {
      id: 46,
      name: "Legal Assistant",
      description: "AI legal assistant that helps with legal tasks",
      logo: "/placeholder.svg",
      tags: ["Business", "API"],
      users: 6900,
      rating: 4.1
    },
    {
      id: 47,
      name: "Marketing Assistant",
      description: "AI marketing assistant that helps with marketing tasks",
      logo: "/placeholder.svg",
      tags: ["Business", "Chat"],
      users: 4500,
      rating: 4.0
    },
    {
      id: 48,
      name: "Project Manager",
      description: "AI project manager that helps manage projects",
      logo: "/placeholder.svg",
      tags: ["Business", "API"],
      users: 2100,
      rating: 3.9
    },
  ],
  development: [
    {
      id: 51,
      name: "Code Generator",
      description: "AI-powered code generation for various programming languages and frameworks",
      logo: "/placeholder.svg",
      tags: ["Development", "API"],
      users: 15700,
      rating: 4.5
    },
    {
      id: 52,
      name: "Bug Detector",
      description: "AI bug detector that identifies potential bugs in code",
      logo: "/placeholder.svg",
      tags: ["Development", "Chat"],
      users: 13300,
      rating: 4.4
    },
    {
      id: 53,
      name: "Code Refactorer",
      description: "AI code refactorer that improves code quality",
      logo: "/placeholder.svg",
      tags: ["Development", "API"],
      users: 10900,
      rating: 4.3
    },
    {
      id: 54,
      name: "Test Case Generator",
      description: "AI test case generator that creates test cases",
      logo: "/placeholder.svg",
      tags: ["Development", "Chat"],
      users: 8500,
      rating: 4.2
    },
    {
      id: 55,
      name: "Code Translator",
      description: "AI code translator that translates code from one language to another",
      logo: "/placeholder.svg",
      tags: ["Development", "API"],
      users: 6100,
      rating: 4.1
    },
    {
      id: 56,
      name: "Documentation Writer",
      description: "AI documentation writer that creates documentation from code",
      logo: "/placeholder.svg",
      tags: ["Development", "Chat"],
      users: 3700,
      rating: 4.0
    },
    {
      id: 57,
      name: "Code Improver",
      description: "AI code improver that suggests improvements to code",
      logo: "/placeholder.svg",
      tags: ["Development", "API"],
      users: 1300,
      rating: 3.9
    },
  ],
};

// Available filters for each category
const categoryFilters: Record<string, string[]> = {
  trending: ["All", "API", "Chat", "Business", "Data", "Productivity"],
  "staff-picks": ["All", "API", "Chat", "Productivity", "Business"],
  new: ["All", "Development", "API", "Chat", "Data"],
  productivity: ["All", "Business", "Chat", "API", "Data"],
  business: ["All", "Data", "API", "Finance", "Analytics"],
  development: ["All", "API", "Web", "Mobile", "Backend", "Frontend"],
};

const CategoryView: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredAgents, setFilteredAgents] = useState<AgentProps[]>([]);
  
  // Format category name for display
  const formatCategoryName = (cat: string) => {
    if (cat === "staff-picks") return "Staff Picks";
    if (cat === "new") return "New Releases";
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };
  
  // Filter agents based on selected filter
  useEffect(() => {
    if (!category || !allAgents[category]) {
      setFilteredAgents([]);
      return;
    }
    
    if (activeFilter === "All") {
      setFilteredAgents(allAgents[category]);
    } else {
      setFilteredAgents(
        allAgents[category].filter(agent => 
          agent.tags.includes(activeFilter)
        )
      );
    }
  }, [category, activeFilter]);
  
  // If category not found
  if (!category || !allAgents[category]) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="px-6 sm:px-10 md:px-14 lg:px-20 py-10">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl font-archivo-black mb-4">Category Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The category you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link to="/browse">Browse Agents</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  const filters = categoryFilters[category] || ["All"];
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="px-6 sm:px-10 md:px-14 lg:px-20 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-4" 
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            <h1 className="text-3xl font-archivo-black">
              {formatCategoryName(category)}
            </h1>
            <p className="text-muted-foreground">
              {filteredAgents.length} agent{filteredAgents.length !== 1 ? 's' : ''} found
            </p>
          </div>
          
          {/* Category filters */}
          <div className="mb-8">
            <ScrollArea className="w-full whitespace-nowrap pb-4">
              <div className="flex gap-2">
                {filters.map(filter => (
                  <Badge 
                    key={filter} 
                    variant={filter === activeFilter ? "default" : "outline"}
                    className="cursor-pointer px-3 py-1 text-sm"
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </Badge>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {filteredAgents.length > 0 ? (
            <AgentGrid agents={filteredAgents} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No agents found matching the selected filter.</p>
              <Button variant="outline" onClick={() => setActiveFilter("All")}>
                Clear Filter
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryView;
