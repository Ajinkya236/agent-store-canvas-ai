
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

const AgentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
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
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="px-6 sm:px-10 md:px-14 lg:px-20 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-secondary flex items-center justify-center">
                  <img 
                    src={agent.logo || "/placeholder.svg"} 
                    alt={`${agent.name} logo`} 
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <div className="flex-1">
                  <h1 className="text-3xl sm:text-4xl font-archivo-black mb-2">{agent.name}</h1>
                  <p className="text-muted-foreground mb-3">{agent.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    {agent.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{agent.users.toLocaleString()} users</span>
                      <span className="mx-2">•</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(agent.rating) ? 'text-amber-400 fill-current' : 'text-muted-foreground/30'}`}
                          />
                        ))}
                        <span className="ml-1">{agent.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
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
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Action buttons */}
              <div className="bg-card rounded-xl p-6 border shadow-sm">
                <div className="space-y-4">
                  <Button className="w-full" size="lg">Try it now</Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <Heart className="mr-2 h-4 w-4" /> Add to favorites
                  </Button>
                </div>
              </div>
              
              {/* Pricing */}
              <div className="bg-card rounded-xl p-6 border shadow-sm">
                <h3 className="font-archivo-black text-lg mb-4">Pricing</h3>
                <div className="space-y-3">
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
              
              {/* Developer info */}
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
        </div>
      </div>
    </div>
  );
};

export default AgentDetail;
