
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Search, Heart, Calendar, List, Filter, Star } from 'lucide-react';

interface CategoryProps {
  name: string;
  icon: React.ElementType;
  count: number;
  href: string;
}

const CategoriesShowcase: React.FC = () => {
  const categories: CategoryProps[] = [
    {
      name: "Product Design",
      icon: Search,
      count: 28,
      href: "#product-design"
    },
    {
      name: "Human Resources",
      icon: Heart,
      count: 34,
      href: "#human-resource"
    },
    {
      name: "Learning",
      icon: List,
      count: 19,
      href: "#learning"
    },
    {
      name: "Travel",
      icon: Calendar,
      count: 23,
      href: "#travel"
    },
    {
      name: "Policy",
      icon: Filter,
      count: 15,
      href: "#policy"
    },
    {
      name: "Customer Service",
      icon: Star,
      count: 42,
      href: "#customer-service"
    }
  ];

  return (
    <div className="w-full py-20 px-6 sm:px-10 md:px-14 lg:px-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-archivo-black text-center mb-4">Browse by Category</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Discover AI agents organized by industry and function to find the perfect fit for your needs
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link 
                key={category.name} 
                to={category.href}
                className="animate-fade-in"
                style={{ 
                  animationDelay: `${index * 0.1}s`, 
                  animationFillMode: 'forwards',
                  opacity: 0 
                }}
              >
                <Card className="h-full transition-all hover:shadow-md hover:scale-[1.01] p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-archivo-black text-lg mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} agents</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoriesShowcase;
