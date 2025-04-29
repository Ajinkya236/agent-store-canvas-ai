
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface BannerSlide {
  id: number;
  title: string;
  description: string;
  ctaText: string;
  bgColor: string;
}

const banners: BannerSlide[] = [
  {
    id: 1,
    title: "New Document Processing Agent",
    description: "Extract, analyze and summarize data from any document format",
    ctaText: "Learn More",
    bgColor: "bg-gradient-to-r from-blue-500/90 to-blue-600"
  },
  {
    id: 2, 
    title: "Productivity Assistant",
    description: "Complete daily administrative tasks with AI-powered automation",
    ctaText: "Discover",
    bgColor: "bg-gradient-to-r from-purple-500/90 to-purple-600"
  },
  {
    id: 3,
    title: "Enterprise Training Agent",
    description: "Create personalized learning experiences for your team",
    ctaText: "Get Started",
    bgColor: "bg-gradient-to-r from-emerald-500/90 to-emerald-600"
  }
];

const BannerCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current === banners.length - 1 ? 0 : current + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full my-6 px-6 sm:px-10 md:px-14 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <Card className="overflow-hidden border-0 shadow-lg rounded-2xl">
          <CardContent className="p-0 relative h-64 md:h-72">
            {banners.map((banner, index) => (
              <div 
                key={banner.id} 
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${banner.bgColor} text-white p-8 md:p-10 flex flex-col justify-center ${
                  index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-archivo-black mb-3">
                  {banner.title}
                </h2>
                <p className="mb-6 max-w-md font-archivo">
                  {banner.description}
                </p>
                <div>
                  <Button 
                    className="bg-white/90 text-black hover:bg-white/100 transition-all"
                  >
                    {banner.ctaText}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex ? "bg-white scale-125" : "bg-white/50"
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BannerCarousel;
