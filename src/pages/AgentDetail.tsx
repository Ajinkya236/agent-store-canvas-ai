
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Star, MessageCircle, ThumbsUp } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast'; 
import { StarRating, ReviewForm } from '@/components/RatingSystem';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Comment {
  id: number;
  user: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
  userHasLiked: boolean;
  replies: CommentReply[];
}

interface CommentReply {
  id: number;
  user: string;
  avatar: string;
  content: string;
  date: string;
}

const AgentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: "Alex Morgan",
      avatar: "/placeholder.svg",
      content: "How does this agent handle multiple language inputs?",
      date: "2023-10-05",
      likes: 3,
      userHasLiked: false,
      replies: [
        {
          id: 101,
          user: "Support Team",
          avatar: "/placeholder.svg",
          content: "Currently it supports English and Spanish with full functionality, and can process but not analyze French, German and Italian.",
          date: "2023-10-06"
        }
      ]
    },
    {
      id: 2,
      user: "Jamie Roberts",
      avatar: "/placeholder.svg",
      content: "Is there a limit to the size of documents this can process?",
      date: "2023-09-28",
      likes: 5,
      userHasLiked: true,
      replies: []
    }
  ]);
  const [replyTexts, setReplyTexts] = useState<{[key: number]: string}>({});
  const [showReplyFor, setShowReplyFor] = useState<number | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [isRatingSubmitted, setIsRatingSubmitted] = useState<boolean>(false);
  const [openRatingDialog, setOpenRatingDialog] = useState<boolean>(false);
  const [openReviewDialog, setOpenReviewDialog] = useState<boolean>(false);
  const [review, setReview] = useState<string>('');
  const [reviewTitle, setReviewTitle] = useState<string>('');
  
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

  // Submit a new comment
  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    
    const newCommentObj: Comment = {
      id: comments.length + 1,
      user: "Current User",
      avatar: "/placeholder.svg",
      content: newComment,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      userHasLiked: false,
      replies: []
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment('');
    toast({
      title: "Comment posted",
      description: "Your question has been submitted successfully"
    });
  };

  // Submit a reply to a comment
  const handleReplySubmit = (commentId: number) => {
    const replyText = replyTexts[commentId];
    if (!replyText?.trim()) return;
    
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: Date.now(),
              user: "Current User",
              avatar: "/placeholder.svg",
              content: replyText,
              date: new Date().toISOString().split('T')[0]
            }
          ]
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
    setReplyTexts({...replyTexts, [commentId]: ''});
    setShowReplyFor(null);
    toast({
      title: "Reply posted",
      description: "Your reply has been added successfully"
    });
  };

  // Toggle like on a comment
  const toggleLike = (commentId: number) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.userHasLiked ? comment.likes - 1 : comment.likes + 1,
          userHasLiked: !comment.userHasLiked
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
  };

  // Submit a rating
  const handleRatingSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a star rating",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would typically send this to your backend
    toast({
      title: "Rating submitted",
      description: `You rated this agent ${rating} out of 5 stars`
    });
    
    setIsRatingSubmitted(true);
    setOpenRatingDialog(false);
  };

  // Submit a review
  const handleReviewSubmit = () => {
    if (!reviewTitle.trim() || !review.trim()) {
      toast({
        title: "Required fields missing",
        description: "Please provide a title and review content",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would typically send this to your backend
    toast({
      title: "Review submitted",
      description: "Thank you for sharing your feedback!"
    });
    
    setReviewTitle('');
    setReview('');
    setOpenReviewDialog(false);
  };

  // Check if this agent is already in saved agents on component mount
  useEffect(() => {
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
              </div>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
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
                value="help" 
                className="data-[state=active]:bg-accent data-[state=active]:text-white py-2 px-4"
              >
                Help & Support
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
            
            {/* Reviews Tab Content */}
            <TabsContent value="reviews" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {/* Reviews List */}
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <h3 className="text-xl font-archivo-black">{reviewsCount} Reviews</h3>
                    <div className="flex items-center gap-4">
                      {/* Rating Dialog */}
                      <Dialog open={openRatingDialog} onOpenChange={setOpenRatingDialog}>
                        <DialogTrigger asChild>
                          <Button variant="outline">Rate Agent</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Rate this Agent</DialogTitle>
                            <DialogDescription>
                              How would you rate your experience with this agent?
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <div className="flex flex-col items-center space-y-4">
                              <StarRating rating={rating} setRating={setRating} size="lg" />
                              <p className="text-sm text-muted-foreground">
                                {rating === 0 ? "Select a rating" : `${rating} out of 5 stars`}
                              </p>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setOpenRatingDialog(false)}>Cancel</Button>
                            <Button onClick={handleRatingSubmit}>Submit</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      {/* Review Dialog */}
                      <Dialog open={openReviewDialog} onOpenChange={setOpenReviewDialog}>
                        <DialogTrigger asChild>
                          <Button>Write a Review</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Write a Review</DialogTitle>
                            <DialogDescription>
                              Share your experience with this agent. Your feedback helps others make informed decisions.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <label htmlFor="title" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2">
                                Review Title
                              </label>
                              <Input
                                id="title"
                                value={reviewTitle}
                                onChange={(e) => setReviewTitle(e.target.value)}
                                placeholder="Summarize your experience"
                                maxLength={100}
                              />
                            </div>
                            <div>
                              <label htmlFor="review" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2">
                                Review
                              </label>
                              <Textarea
                                id="review"
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                placeholder="Share details of your experience with this agent..."
                                rows={6}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setOpenReviewDialog(false)}>Cancel</Button>
                            <Button onClick={handleReviewSubmit}>Submit Review</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
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
            
            {/* Help & Support Tab Content */}
            <TabsContent value="help" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="mb-8">
                    <h2 className="text-xl font-archivo-black mb-4">Help & Support</h2>
                    <p className="text-muted-foreground mb-6">
                      Have questions or need help with this agent? Post your question below or browse existing discussions.
                    </p>
                    
                    {/* New comment form */}
                    <div className="bg-card rounded-xl p-6 border shadow-sm mb-8">
                      <h3 className="text-lg font-semibold mb-4">Ask a Question</h3>
                      <Textarea
                        placeholder="What would you like to know about this agent?"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="mb-4"
                        rows={4}
                      />
                      <div className="flex justify-end">
                        <Button onClick={handleCommentSubmit}>Submit Question</Button>
                      </div>
                    </div>
                    
                    {/* Comments list */}
                    <div className="space-y-6">
                      {comments.map(comment => (
                        <div key={comment.id} className="border-b pb-6 last:border-0">
                          {/* Comment */}
                          <div className="flex items-start gap-3 mb-3">
                            <Avatar className="mt-1">
                              <AvatarImage src={comment.avatar} />
                              <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-semibold">{comment.user}</h4>
                                  <p className="text-xs text-muted-foreground">{formatDate(comment.date)}</p>
                                </div>
                              </div>
                              <p className="mt-2">{comment.content}</p>
                              <div className="flex items-center gap-4 mt-3">
                                <button 
                                  className={`text-xs flex items-center gap-1 ${comment.userHasLiked ? 'text-accent' : 'text-muted-foreground'}`}
                                  onClick={() => toggleLike(comment.id)}
                                >
                                  <ThumbsUp className="h-3 w-3" />
                                  <span>{comment.likes} {comment.likes === 1 ? 'like' : 'likes'}</span>
                                </button>
                                <button 
                                  className="text-xs flex items-center gap-1 text-muted-foreground"
                                  onClick={() => setShowReplyFor(showReplyFor === comment.id ? null : comment.id)}
                                >
                                  <MessageCircle className="h-3 w-3" />
                                  <span>Reply</span>
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          {/* Reply form */}
                          {showReplyFor === comment.id && (
                            <div className="pl-10 mt-3 mb-4">
                              <div className="flex gap-2">
                                <Textarea
                                  placeholder="Type your reply..."
                                  value={replyTexts[comment.id] || ''}
                                  onChange={(e) => setReplyTexts({...replyTexts, [comment.id]: e.target.value})}
                                  className="text-sm"
                                  rows={2}
                                />
                                <Button 
                                  size="sm" 
                                  onClick={() => handleReplySubmit(comment.id)}
                                  className="h-auto self-end"
                                >
                                  Reply
                                </Button>
                              </div>
                            </div>
                          )}
                          
                          {/* Replies */}
                          {comment.replies.length > 0 && (
                            <div className="pl-10 mt-4 space-y-4">
                              {comment.replies.map(reply => (
                                <div key={reply.id} className="flex items-start gap-3">
                                  <Avatar className="w-6 h-6">
                                    <AvatarImage src={reply.avatar} />
                                    <AvatarFallback>{reply.user.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h5 className="font-medium text-sm">{reply.user}</h5>
                                      <span className="text-xs text-muted-foreground">{formatDate(reply.date)}</span>
                                    </div>
                                    <p className="text-sm mt-1">{reply.content}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-card rounded-xl p-6 border shadow-sm sticky top-24">
                    <h3 className="text-lg font-semibold mb-4">Support Resources</h3>
                    <ul className="space-y-3">
                      <li>
                        <a href="#" className="text-sm text-accent hover:underline">Documentation</a>
                      </li>
                      <li>
                        <a href="#" className="text-sm text-accent hover:underline">API Reference</a>
                      </li>
                      <li>
                        <a href="#" className="text-sm text-accent hover:underline">Video Tutorials</a>
                      </li>
                      <li>
                        <a href="#" className="text-sm text-accent hover:underline">Contact Support Team</a>
                      </li>
                    </ul>
                    <Separator className="my-4" />
                    <h4 className="font-medium mb-2">Common Questions</h4>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground">How to integrate with existing systems?</a>
                      </li>
                      <li>
                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Supported document formats</a>
                      </li>
                      <li>
                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Data security and privacy</a>
                      </li>
                    </ul>
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
