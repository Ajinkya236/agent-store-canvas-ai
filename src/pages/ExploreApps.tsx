
import React from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, MessageSquare, FileText, Star, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AppCardProps {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  rating: number;
  downloads: number;
}

const AppCard: React.FC<AppCardProps> = ({ name, description, icon, category, rating, downloads }) => (
  <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
    <CardHeader className="pb-2">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <Badge variant="outline" className="mt-1">{category}</Badge>
          </div>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Star className="h-4 w-4 text-amber-400 mr-1" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>
    </CardHeader>
    <CardContent className="pb-2">
      <p className="text-sm text-muted-foreground">{description}</p>
    </CardContent>
    <CardFooter className="flex justify-between">
      <div className="text-xs text-muted-foreground flex items-center">
        <Download className="h-3 w-3 mr-1" />
        {downloads.toLocaleString()} downloads
      </div>
      <Button size="sm">Install</Button>
    </CardFooter>
  </Card>
);

const ExploreApps: React.FC = () => {
  const apps: AppCardProps[] = [
    {
      id: '1',
      name: 'Document Analyzer',
      description: 'Extract key insights from documents and generate summaries automatically.',
      icon: <FileText className="h-5 w-5" />,
      category: 'Productivity',
      rating: 4.7,
      downloads: 15400
    },
    {
      id: '2',
      name: 'Meeting Assistant',
      description: 'Takes notes during meetings and generates actionable summaries.',
      icon: <MessageSquare className="h-5 w-5" />,
      category: 'Business',
      rating: 4.5,
      downloads: 12300
    },
    {
      id: '3',
      name: 'Code Helper',
      description: 'Assists with code reviews, bug detection, and providing code solutions.',
      icon: <Zap className="h-5 w-5" />,
      category: 'Development',
      rating: 4.9,
      downloads: 18700
    },
    {
      id: '4',
      name: 'Language Tutor',
      description: 'Practice conversations in different languages with an AI language tutor.',
      icon: <MessageSquare className="h-5 w-5" />,
      category: 'Education',
      rating: 4.6,
      downloads: 9800
    },
    {
      id: '5',
      name: 'Data Visualizer',
      description: 'Creates beautiful charts and visualizations from your data with natural language.',
      icon: <FileText className="h-5 w-5" />,
      category: 'Analytics',
      rating: 4.3,
      downloads: 7500
    },
    {
      id: '6',
      name: 'Email Writer',
      description: 'Drafts professional emails based on your instructions and tone preferences.',
      icon: <MessageSquare className="h-5 w-5" />,
      category: 'Communication',
      rating: 4.8,
      downloads: 14200
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <div className="flex items-center mb-8">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <AppCard key={app.id} {...app} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreApps;
