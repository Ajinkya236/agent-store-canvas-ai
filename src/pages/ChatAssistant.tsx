import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Send, Plus, Bot } from 'lucide-react';

const ChatAssistant: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle message submission logic here
    setInputValue('');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-4">
        <div className="flex flex-col items-center justify-center py-10 space-y-6">
          <h1 className="text-3xl font-archivo-black">Chat Assistant</h1>
          
          {/* Buttons with reordered explore apps above new chat */}
          <div className="flex flex-col gap-3">
            <Button asChild variant="outline" className="w-full md:w-auto">
              <Link to="/explore-apps" className="flex items-center">
                <Bot className="mr-2 h-4 w-4" />
                Explore Apps
              </Link>
            </Button>
            
            <Button className="w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              New Chat
            </Button>
          </div>
        </div>
        
        {/* Chat messages would go here */}
        <div className="flex-1">
          {/* Chat messages content */}
        </div>
        
        {/* Chat input with send button on right */}
        <div className="border-t py-4 sticky bottom-0 bg-background">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message here..."
                className="pr-10" 
              />
            </div>
            <Button 
              type="submit" 
              size="icon" 
              disabled={!inputValue.trim()} 
              className="bg-accent-primary hover:bg-accent-primary/90"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
