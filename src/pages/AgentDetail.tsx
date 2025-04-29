
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Star } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const AgentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // This would normally come from an API call using the id
  const agent = {
    id: Number(id) || 1,
    name: "Document Analyzer",
    description: "Extract and analyze data from any document format with advanced ML capabilities",
    longDescription: "The Document Analyzer AI agent is designed to streamline document processing workflows by automatically extracting key information from various document formats including PDFs, images, and scanned documents. Using advanced machine learning algorithms, it can identify patterns, tables, and text with high accuracy.",
    logo: "/placeholder.svg",
    tags: ["API", "Chat"],
    users: 15400,
    rating: 4.7,
    pricing: {
      free: true,
      pro: "$19/month",
      enterprise: "Contact for pricing"
    },
    capabilities: [
      "Text extraction from images and PDFs",
      "Table recognition and data structuring",
      "Named entity recognition",
      "Document classification",
      "Sentiment analysis"
    ],
    limitations: [
      "Limited support for handwritten text",
      "May struggle with heavily formatted documents",
      "Language support limited to English and Spanish"
    ],
    useCases: [
      "Invoice processing",
      "Resume screening",
      "Contract analysis",
      "Form data extraction",
      "Research paper summarization"
    ],
    developer: {
      name: "AI Document Solutions",
      image: "/placeholder.svg",
      description: "Specializing in document processing and analysis tools since 2020"
    },
    reviews: [
      {
        id: 1,
        user: "Jane Smith",
        avatar: "/placeholder.svg",
        rating: 5,
        date: "2023-09-15",
        title: "Game changer for our document processing",
        content: "We've been using Document Analyzer for our invoice processing needs for the past 3 months and it has cut our processing time by 70%. The accuracy is impressive!"
      },
      {
        id: 2,
        user: "Michael Johnson",
        avatar: "/placeholder.svg",
        rating: 4,
        date: "2023-08-22",
        title: "Solid performance with a few hiccups",
        content: "Great for most of our needs, but struggles a bit with low-quality scanned documents. Still a massive improvement over our previous solution."
      },
      {
        id: 3,
        user: "Alex Chen",
        avatar: "/placeholder.svg",
        rating: 5,
        date: "2023-10-01",
        title: "Exceptional API integration",
        content: "The API is well-documented and easy to integrate. We had our system up and running with the Document Analyzer in just a few days."
      }
    ],
    relatedAgents: [
      {
        id: 5,
        name: "Form Builder",
        description: "Create intelligent forms that adapt to user input",
        logo: "/placeholder.svg",
        tags: ["API"],
        users: 8700,
        rating: 4.5
      },
      {
        id: 8,
        name: "Contract Analyzer",
        description: "Legal contract analysis and risk assessment",
        logo: "/placeholder.svg",
        tags: ["Chat"],
        users: 12300,
        rating: 4.8
      }
    ]
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    
    // Save/remove from localStorage when toggling favorite
    const savedAgents = JSON.parse(localStorage.getItem('savedAgents') || '[]');
    
    if (isFavorite) {
      // Remove from saved agents
      const updatedSavedAgents = savedAgents.filter((savedAgent: { id: number }) => savedAgent.id !== agent.id);
      localStorage.setItem('savedAgents', JSON.stringify(updatedSavedAgents));
    } else {
      // Add to saved agents with current timestamp
      const agentWithTimestamp = {
        ...agent,
        savedAt: new Date().toISOString()
      };
      savedAgents.push(agentWithTimestamp);
      localStorage.setItem('savedAgents', JSON.stringify(savedAgents));
    }
  };

  // Reviews summary calculations
  const reviewsCount = agent.reviews.length;
  const reviewsDistribution = {
    5: agent.reviews.filter(r => r.rating === 5).length,
    4: agent.reviews.filter(r => r.rating === 4).length,
    3: agent.reviews.filter(r => r.rating === 3).length,
    2: agent.reviews.filter(r => r.rating === 2).length,
    1: agent.reviews.filter(r => r.rating === 1).length,
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Check if this agent is already in saved agents on component mount
  React.useEffect(() => {
    const savedAgents = JSON.parse(localStorage.getItem('savedAgents') || '[]');
    const isAlreadySaved = savedAgents.some((savedAgent: { id: number }) => savedAgent.id === agent.id);
    setIsFavorite(isAlreadySaved);
  }, [agent.id]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="px-6 sm:px-10 md:px-14 lg:px-20 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Agent Header */}
          <div className="flex flex-col md:flex-row items-start gap-8 mb-10">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-secondary flex-shrink-0 flex items-center justify-center">
              <img 
                src={agent.logo || "/placeholder.svg"} 
                alt={`${agent.name} logo`} 
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-archivo-black mb-2">{agent.name}</h1>
                  <p className="text-muted-foreground mb-3">{agent.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(agent.rating) ? 'text-amber-400 fill-current' : 'text-muted-foreground/30'}`}
                        />
                      ))}
                      <span className="ml-2 font-medium">{agent.rating}</span>
                      <span className="mx-2 text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{reviewsCount} reviews</span>
                    </div>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{agent.users.toLocaleString()} users</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {agent.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs px-3 py-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-6">
                    <Button size="lg" asChild>
                      <Link to={`/chat/${agent.id}`}>Try it now</Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      onClick={toggleFavorite}
                      className={isFavorite ? "text-red-500" : ""}
                    >
                      <Heart className={`mr-2 h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} /> 
                      {isFavorite ? 'Saved' : 'Save'}
                    </Button>
                  </div>
                </div>
                
                <div className="bg-card rounded-xl p-4 border shadow-sm">
                  <h3 className="font-archivo-black text-lg mb-3">Pricing</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Free</span>
                      <span>{agent.pricing.free ? "Available" : "Not available"}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span>Pro</span>
                      <span>{agent.pricing.pro}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span>Enterprise</span>
                      <span>{agent.pricing.enterprise}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tab Navigation - Removed Demo tab */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full flex mb-8 overflow-x-auto bg-transparent p-0 h-auto space-x-2">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-accent data-[state=active]:text-white py-2 px-4"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="data-[state=active]:bg-accent data-[state=active]:text-white py-2 px-4"
              >
                Reviews
              </TabsTrigger>
              <TabsTrigger 
                value="related" 
                className="data-[state=active]:bg-accent data-[state=active]:text-white py-2 px-4"
              >
                Related Agents
              </TabsTrigger>
            </TabsList>
            
            {/* Overview Tab Content */}
            <TabsContent value="overview" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  {/* Description */}
                  <div>
                    <h2 className="text-xl font-archivo-black mb-3">Overview</h2>
                    <p className="text-muted-foreground">{agent.longDescription}</p>
                  </div>
                  
                  {/* Capabilities */}
                  <div>
                    <h2 className="text-xl font-archivo-black mb-3">Capabilities</h2>
                    <ul className="space-y-2">
                      {agent.capabilities.map((capability, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                          <span>{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Use Cases */}
                  <div>
                    <h2 className="text-xl font-archivo-black mb-3">Use Cases</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {agent.useCases.map((useCase, index) => (
                        <div key={index} className="bg-secondary/50 p-4 rounded-lg">
                          {useCase}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Limitations */}
                  <div>
                    <h2 className="text-xl font-archivo-black mb-3">Limitations</h2>
                    <ul className="space-y-2">
                      {agent.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></div>
                          <span className="text-muted-foreground">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Sidebar - Developer info */}
                <div>
                  <div className="bg-card rounded-xl p-6 border shadow-sm">
                    <h3 className="font-archivo-black text-lg mb-4">Developer</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-secondary overflow-hidden">
                        <img 
                          src={agent.developer.image}
                          alt={agent.developer.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{agent.developer.name}</h4>
                        <p className="text-sm text-muted-foreground">{agent.developer.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Demo Tab Content */}
            <TabsContent value="demo" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <h3 className="text-xl font-archivo-black mb-6">Interactive Demo</h3>
                    <p className="text-muted-foreground mb-8">
                      Try out the Document Analyzer by uploading a document or using one of our sample documents.
                    </p>
                    <div className="flex flex-col items-center gap-4">
                      <Button>Upload a document</Button>
                      <span className="text-muted-foreground">or</span>
                      <div className="flex flex-wrap gap-3 justify-center">
                        <Button variant="outline">Sample Invoice</Button>
                        <Button variant="outline">Sample Contract</Button>
                        <Button variant="outline">Sample Form</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Reviews Tab Content */}
            <TabsContent value="reviews" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {/* Reviews List */}
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-archivo-black">{reviewsCount} Reviews</h3>
                    <Button>Write a review</Button>
                  </div>
                  
                  {/* Reviews items */}
                  <div className="space-y-6">
                    {agent.reviews.map(review => (
                      <div key={review.id} className="border-b pb-6 last:border-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={review.avatar} />
                              <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold">{review.user}</h4>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3 h-3 ${i < review.rating ? 'text-amber-400 fill-current' : 'text-muted-foreground/30'}`}
                                    />
                                  ))}
                                </div>
                                <span className="mx-2">•</span>
                                <span>{formatDate(review.date)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <h5 className="font-semibold mb-2">{review.title}</h5>
                        <p className="text-muted-foreground">{review.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  {/* Rating Summary */}
                  <div className="bg-card rounded-xl p-6 border shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-4xl font-archivo-black">{agent.rating}</div>
                      <div className="flex flex-col">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(agent.rating) ? 'text-amber-400 fill-current' : 'text-muted-foreground/30'}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">{reviewsCount} reviews</span>
                      </div>
                    </div>
                    
                    {/* Rating Breakdown */}
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map(stars => {
                        const count = reviewsDistribution[stars as keyof typeof reviewsDistribution] || 0;
                        const percentage = reviewsCount > 0 ? (count / reviewsCount) * 100 : 0;
                        
                        return (
                          <div key={stars} className="flex items-center gap-2">
                            <div className="w-8 text-sm text-muted-foreground">{stars}</div>
                            <Star className="w-3 h-3 text-amber-400 fill-current" />
                            <Progress value={percentage} className="h-2 flex-1" />
                            <div className="w-8 text-right text-sm text-muted-foreground">{count}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Related Agents Tab Content */}
            <TabsContent value="related" className="mt-0">
              <div>
                <h3 className="text-xl font-archivo-black mb-6">Similar Agents</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {agent.relatedAgents.map(relAgent => (
                    <Card key={relAgent.id} className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md">
                      <CardContent className="p-0">
                        <div className="p-5">
                          <div className="flex items-start space-x-4 mb-3">
                            <div className="w-10 h-10 rounded-xl overflow-hidden bg-secondary flex items-center justify-center">
                              <img 
                                src={relAgent.logo || "/placeholder.svg"} 
                                alt={`${relAgent.name} logo`} 
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div>
                              <h3 className="font-archivo-black text-lg">{relAgent.name}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">{relAgent.description}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {relAgent.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="text-xs font-archivo">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-amber-400 fill-current" />
                              <span>{relAgent.rating}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-12 text-center">
                  <Button>View more similar agents</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AgentDetail;
