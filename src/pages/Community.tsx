
import React, { useState } from "react";
import Header from '@/components/Header';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Book, MessageSquare, GalleryHorizontal, Star, Search } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

const Community = () => {
  const [activeTab, setActiveTab] = useState("forums");

  // Mock data for forums
  const forumCategories = [
    { id: 1, name: "General Discussion", posts: 342, lastActivity: "2 minutes ago" },
    { id: 2, name: "Agent Development", posts: 189, lastActivity: "30 minutes ago" },
    { id: 3, name: "Technical Support", posts: 421, lastActivity: "15 minutes ago" },
    { id: 4, name: "Feature Requests", posts: 253, lastActivity: "1 hour ago" },
    { id: 5, name: "Case Studies", posts: 127, lastActivity: "3 hours ago" }
  ];

  const trendingTopics = [
    { id: 1, title: "How to optimize response time with custom agents", author: "tech_lead", replies: 24, views: 345 },
    { id: 2, title: "Best practices for enterprise deployment", author: "ai_advisor", replies: 18, views: 289 },
    { id: 3, title: "Achieving 99% accuracy in document analysis", author: "data_master", replies: 32, views: 412 }
  ];

  // Mock data for showcase
  const showcaseProjects = [
    { 
      id: 1, 
      title: "Customer Support Automation", 
      author: "EnterpriseAI", 
      votes: 156, 
      image: "/placeholder.svg", 
      tags: ["Customer Support", "NLP"],
      description: "Reduced response time by 80% and improved CSAT by 25%"
    },
    { 
      id: 2, 
      title: "Document Workflow Intelligence", 
      author: "AITeam", 
      votes: 98, 
      image: "/placeholder.svg", 
      tags: ["Document Processing", "Workflow"], 
      description: "Automated processing of 10,000+ monthly documents with 98% accuracy"
    },
    { 
      id: 3, 
      title: "Meeting Insights Generator", 
      author: "ProductivityPro", 
      votes: 87, 
      image: "/placeholder.svg", 
      tags: ["Meetings", "Summarization"], 
      description: "Saves 5+ hours weekly per team by providing actionable meeting insights"
    }
  ];

  // Mock data for learning center
  const tutorials = [
    { id: 1, title: "Getting Started with Enterprise AI", type: "Video", duration: "15:24", level: "Beginner" },
    { id: 2, title: "Advanced Agent Configuration", type: "Text", duration: "12 min read", level: "Advanced" },
    { id: 3, title: "Integrating with Your Existing Systems", type: "Video", duration: "22:10", level: "Intermediate" },
    { id: 4, title: "Security Best Practices", type: "Text", duration: "15 min read", level: "All Levels" }
  ];

  const faqs = [
    { 
      id: 1, 
      question: "How do I connect my enterprise database to an agent?",
      answer: "Our agents support secure database connections through encrypted API endpoints. Follow the integration guide in the documentation to set up proper authentication and access controls."
    },
    {
      id: 2,
      question: "What security measures are in place to protect our data?",
      answer: "We employ end-to-end encryption, role-based access controls, and regular security audits. All agents run in isolated environments and data is never shared between customers."
    },
    {
      id: 3,
      question: "Can I customize an agent's responses to match our brand voice?",
      answer: "Yes, all agents support tone and style customization through our Persona Configuration tool. You can define language preferences, formality level, and even upload sample communications."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-archivo-black">Community Hub</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search community" className="pl-10 w-[250px]" />
          </div>
        </div>

        <Tabs defaultValue="forums" value={activeTab} onValueChange={setActiveTab} className="mb-10">
          <TabsList className="mb-8">
            <TabsTrigger value="forums">
              <MessageSquare className="mr-2 h-4 w-4" />
              Forums
            </TabsTrigger>
            <TabsTrigger value="showcase">
              <GalleryHorizontal className="mr-2 h-4 w-4" />
              Showcase
            </TabsTrigger>
            <TabsTrigger value="learning">
              <Book className="mr-2 h-4 w-4" />
              Learning Center
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="forums" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Forum Categories */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Forum Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Category</TableHead>
                          <TableHead className="text-right">Posts</TableHead>
                          <TableHead className="text-right">Last Activity</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {forumCategories.map((category) => (
                          <TableRow key={category.id}>
                            <TableCell className="font-medium">{category.name}</TableCell>
                            <TableCell className="text-right">{category.posts}</TableCell>
                            <TableCell className="text-right">{category.lastActivity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">View All</Button>
                    <Button>New Post</Button>
                  </CardFooter>
                </Card>
              </div>
              
              {/* Trending Topics */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Trending Topics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {trendingTopics.map((topic) => (
                      <div key={topic.id} className="border-b pb-4 last:border-0 last:pb-0">
                        <h3 className="font-medium mb-1 hover:text-primary cursor-pointer">{topic.title}</h3>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>by @{topic.author}</span>
                          <span>{topic.replies} replies • {topic.views} views</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full">Show More</Button>
                  </CardFooter>
                </Card>
                
                {/* Recent Activity Feed */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>AP</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm"><span className="font-medium">Alex P.</span> replied to "Optimizing agent response times"</p>
                        <p className="text-xs text-muted-foreground">5 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm"><span className="font-medium">Jane D.</span> created a new topic "Enterprise deployment strategies"</p>
                        <p className="text-xs text-muted-foreground">32 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>MT</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm"><span className="font-medium">Mark T.</span> shared a case study "Financial AI implementation"</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="showcase" className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-archivo-black">Implementation Showcases</h2>
              <Button>Submit Your Project</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {showcaseProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <div className="h-48 bg-muted">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-current text-amber-400" />
                        <span>{project.votes}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    <div className="mt-4 text-sm">
                      <span className="text-muted-foreground">Submitted by </span>
                      <span className="font-medium">{project.author}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <Star className="h-4 w-4" /> Vote
                    </Button>
                    <Button variant="outline" size="sm">View Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center">
              <Button variant="outline">Load More</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="learning" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Tutorials */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Tutorials & Guides</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tutorials.map((tutorial) => (
                        <div key={tutorial.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h3 className="font-medium">{tutorial.title}</h3>
                            <div className="flex items-center gap-4 mt-1">
                              <Badge variant="outline">{tutorial.type}</Badge>
                              <span className="text-sm text-muted-foreground">{tutorial.duration}</span>
                              <Badge>{tutorial.level}</Badge>
                            </div>
                          </div>
                          <Button>View</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Showing 4 of 24 resources</span>
                    <Button variant="outline">View All Resources</Button>
                  </CardFooter>
                </Card>
                
                {/* Best Practices */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Best Practices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">Improving Agent Response Quality</h3>
                        <p className="text-sm text-muted-foreground mb-4">Learn techniques to enhance the accuracy and relevance of your agent responses.</p>
                        <Button variant="outline" size="sm">Read Guide</Button>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">Enterprise Security Configuration</h3>
                        <p className="text-sm text-muted-foreground mb-4">Secure your AI implementation with role-based access and encryption.</p>
                        <Button variant="outline" size="sm">Read Guide</Button>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">Scaling Agent Deployment</h3>
                        <p className="text-sm text-muted-foreground mb-4">Strategic approaches for rolling out AI across departments.</p>
                        <Button variant="outline" size="sm">Read Guide</Button>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">Measuring ROI</h3>
                        <p className="text-sm text-muted-foreground mb-4">Quantify the business impact of your AI implementation.</p>
                        <Button variant="outline" size="sm">Read Guide</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* FAQ Section */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {faqs.map((faq) => (
                      <div key={faq.id}>
                        <h3 className="font-medium mb-2">{faq.question}</h3>
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full">View All FAQs</Button>
                  </CardFooter>
                </Card>
                
                {/* Troubleshooting */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Troubleshooting</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-b pb-4">
                      <h3 className="font-medium mb-1 hover:text-primary cursor-pointer">Resolving API Connection Issues</h3>
                      <p className="text-sm text-muted-foreground">Common solutions for connectivity problems</p>
                    </div>
                    <div className="border-b pb-4">
                      <h3 className="font-medium mb-1 hover:text-primary cursor-pointer">Debugging Agent Responses</h3>
                      <p className="text-sm text-muted-foreground">How to interpret and fix unexpected outputs</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1 hover:text-primary cursor-pointer">Performance Optimization</h3>
                      <p className="text-sm text-muted-foreground">Techniques to improve response times</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Visit Support Center</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Community;
