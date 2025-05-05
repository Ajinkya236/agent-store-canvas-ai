
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onRegisterClick }) => {
  if (!isOpen) return null;

  const handleRegisterClick = () => {
    onRegisterClick();
    onClose();
  };

  return (
    <div className="md:hidden px-4 py-4 border-t animate-slide-in-from-bottom">
      <nav className="flex flex-col space-y-4">
        <Link to="/browse" className="text-sm font-medium py-2 px-4 rounded-md hover:bg-muted" onClick={onClose}>
          Browse Agents
        </Link>
        <Link to="/my-agents" className="text-sm font-medium py-2 px-4 rounded-md hover:bg-muted" onClick={onClose}>
          My Agents
        </Link>
        <Link to="/chat-assistant" className="text-sm font-medium py-2 px-4 rounded-md hover:bg-muted" onClick={onClose}>
          Chat Assistant
        </Link>
        <Link to="/docs" className="text-sm font-medium py-2 px-4 rounded-md hover:bg-muted" onClick={onClose}>
          Docs
        </Link>
        <Button 
          onClick={handleRegisterClick} 
          className="text-sm font-medium py-2 px-4 rounded-md bg-accent-primary text-white"
        >
          Register Agent
        </Button>
      </nav>
    </div>
  );
};

export default MobileMenu;
