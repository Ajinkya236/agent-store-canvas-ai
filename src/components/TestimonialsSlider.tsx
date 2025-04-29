
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  image: string;
  company: string;
}

const TestimonialsSlider: React.FC = () => {
  const testimonials: TestimonialProps[] = [
    {
      quote: "The AI agents from this marketplace have revolutionized our customer support workflow, reducing response time by 70% while improving satisfaction scores.",
      name: "Sarah Johnson",
      title: "Head of Customer Experience",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
      company: "GlobalTech Inc."
    },
    {
      quote: "We integrated their HR assistant agent into our onboarding process and it has saved our team countless hours while providing a better experience for new hires.",
      name: "Michael Chen",
      title: "HR Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
      company: "Inovex Solutions"
    },
    {
      quote: "As a small business owner, I couldn't afford a full-time marketing team. These AI agents have completely transformed how we approach marketing.",
      name: "Jessica Perez",
      title: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop",
      company: "Artisan Crafts Co."
    }
  ];

  return (
    <div className="w-full py-20 px-6 sm:px-10 md:px-14 lg:px-20 bg-accent/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-archivo-black text-center mb-16">What Our Users Say</h2>
        
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-3/4 lg:basis-2/3">
                <div className="bg-card rounded-xl p-8 md:p-12 shadow-sm border flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 mb-6 border-4 border-accent/20">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name[0]}{testimonial.name.split(' ')[1][0]}</AvatarFallback>
                  </Avatar>
                  
                  <blockquote className="text-lg md:text-xl mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div>
                    <div className="font-archivo-black">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.title}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default TestimonialsSlider;
