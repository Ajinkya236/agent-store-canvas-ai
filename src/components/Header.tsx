
import React from 'react';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  navigationMenuTriggerStyle 
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Search, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="pt-6 pb-4 px-6 sm:px-10 md:px-14 lg:px-20 border-b border-border/40 sticky top-0 z-50 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-archivo-black tracking-tight text-primary animate-fade-in">
              Enterprise Agent Store
            </h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base animate-fade-in opacity-0" 
               style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Discover AI solutions to transform how your business works
            </p>
          </div>
          <div className="flex md:hidden items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">Browse</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {categories.map((category) => (
                      <li key={category.title}>
                        <NavigationMenuLink asChild>
                          <a
                            href={category.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{category.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {category.description}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Pricing
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Documentation
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="accent" className="rounded-full px-4">Sign In</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Sample categories for the navigation menu
const categories = [
  {
    title: "Product Design",
    description: "AI agents to assist with product design, prototyping, and UX research",
    href: "#product-design",
  },
  {
    title: "Human Resource",
    description: "HR assistants for recruitment, onboarding, and employee management",
    href: "#human-resource",
  },
  {
    title: "Learning",
    description: "Educational agents to help with skill development and knowledge acquisition",
    href: "#learning",
  },
  {
    title: "Travel",
    description: "Travel planning and management assistants for business trips",
    href: "#travel",
  },
  {
    title: "Policy",
    description: "Policy navigators to help understand company guidelines and regulations",
    href: "#policy",
  },
  {
    title: "All Categories",
    description: "Browse all available AI agent categories",
    href: "#all-categories",
  },
];

export default Header;
