
import React, { useState } from 'react';
import { Star, StarHalf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface StarRatingProps {
  rating: number;
  setRating?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  setRating, 
  readonly = false,
  size = 'md' 
}) => {
  const [hoverRating, setHoverRating] = useState<number>(0);

  const starSizes = {
    sm: 'h-3 w-3',
    md: 'h-5 w-5',
    lg: 'h-7 w-7'
  };

  const starSize = starSizes[size];
  
  // Generate array of star values [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
  const stars = Array.from({ length: 10 }, (_, i) => (i + 1) * 0.5);
  
  const handleStarClick = (value: number) => {
    if (readonly || !setRating) return;
    setRating(value);
  };
  
  const handleMouseEnter = (value: number) => {
    if (readonly || !setRating) return;
    setHoverRating(value);
  };
  
  const handleMouseLeave = () => {
    if (readonly || !setRating) return;
    setHoverRating(0);
  };

  // Calculate the effective rating (either hovered or selected)
  const effectiveRating = hoverRating || rating;
  
  return (
    <div className="flex">
      {stars.map((star) => {
        // Determine if this star should be filled based on the current rating
        const isFilled = effectiveRating >= star;
        
        // Determine if this is a half star (e.g., 0.5, 1.5, 2.5)
        const isHalfStar = star % 1 !== 0;
        
        return (
          <span
            key={star}
            className={`cursor-${readonly ? 'default' : 'pointer'}`}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
          >
            {isHalfStar ? (
              <StarHalf 
                className={`${starSize} ${
                  isFilled ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'
                }`}
              />
            ) : (
              <Star 
                className={`${starSize} ${
                  isFilled ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'
                }`}
              />
            )}
          </span>
        );
      })}
    </div>
  );
};

interface ReviewFormProps {
  agentId: string | number;
  onReviewSubmitted?: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ agentId, onReviewSubmitted }) => {
  const [rating, setRating] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [pros, setPros] = useState<string>('');
  const [cons, setCons] = useState<string>('');
  const [review, setReview] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a star rating",
        variant: "destructive"
      });
      return;
    }
    
    if (!title.trim() || !review.trim()) {
      toast({
        title: "Required fields missing",
        description: "Please provide a title and review content",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Review submitted",
        description: "Thank you for sharing your feedback!"
      });
      
      // Reset form
      setRating(0);
      setTitle('');
      setPros('');
      setCons('');
      setReview('');
      setOpen(false);
      
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (error) {
      toast({
        title: "Error submitting review",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <div className="flex items-center">
              <StarRating rating={rating} setRating={setRating} size="lg" />
              <span className="ml-2 text-sm">{rating ? `${rating}/5` : 'Select rating'}</span>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Label htmlFor="title">Review Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience"
              maxLength={100}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="pros">Pros</Label>
              <Textarea
                id="pros"
                value={pros}
                onChange={(e) => setPros(e.target.value)}
                placeholder="What did you like?"
                rows={3}
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <Label htmlFor="cons">Cons</Label>
              <Textarea
                id="cons"
                value={cons}
                onChange={(e) => setCons(e.target.value)}
                placeholder="What could be improved?"
                rows={3}
              />
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Label htmlFor="review">Review Details</Label>
            <Textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share details of your experience with this agent..."
              rows={5}
              required
            />
          </div>
          
          <div>
            <Label className="text-sm text-muted-foreground block mb-2">
              Add media (optional)
            </Label>
            <Input
              type="file"
              accept="image/*"
              className="max-w-sm"
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Review'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

interface AverageRatingDisplayProps {
  averageRating: number;
  totalReviews: number;
  ratingCounts?: Record<number, number>;
}

export const AverageRatingDisplay: React.FC<AverageRatingDisplayProps> = ({ 
  averageRating, 
  totalReviews,
  ratingCounts = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0
  }
}) => {
  // Calculate percentages for the rating bars
  const getPercentage = (count: number) => {
    if (totalReviews === 0) return 0;
    return (count / totalReviews) * 100;
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="text-center md:w-1/3">
            <span className="text-4xl font-bold">{averageRating.toFixed(1)}</span>
            <div className="my-2">
              <StarRating rating={averageRating} readonly />
            </div>
            <p className="text-sm text-muted-foreground">{totalReviews} reviews</p>
          </div>
          
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map(star => (
              <div key={star} className="flex items-center gap-2">
                <div className="flex items-center w-10">
                  <span className="text-sm">{star}</span>
                  <Star className="h-3 w-3 ml-1 text-amber-400 fill-amber-400" />
                </div>
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-400 rounded-full"
                    style={{ width: `${getPercentage(ratingCounts[star])}%` }}
                  ></div>
                </div>
                <span className="text-xs w-10 text-right">
                  {ratingCounts[star]} ({getPercentage(ratingCounts[star]).toFixed(0)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default {
  StarRating,
  ReviewForm,
  AverageRatingDisplay
};
