
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';

interface ScrollToTopButtonProps {
  isVisible: boolean;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ isVisible }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 rounded-full w-12 h-12 p-0 shadow-lg z-50"
      variant="default"
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-6 w-6" />
    </Button>
  );
};

export default ScrollToTopButton;
