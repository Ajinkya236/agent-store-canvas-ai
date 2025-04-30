
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Send, Plus, Bot, Image, FileText } from 'lucide-react';
import { 
  Sidebar, 
  SidebarProvider, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarSeparator,
  SidebarInset
} from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Mock chat history data
const chatHistory = [
  { id: 1, title: "Marketing strategy ideas", date: new Date(2025, 3, 30) },
  { id: 2, title: "Product roadmap planning", date: new Date(2025, 3, 29) },
  { id: 3, title: "Customer feedback analysis", date: new Date(2025, 3, 28) },
  { id: 4, title: "Code review assistance", date: new Date(2025, 3, 27) },
  { id: 5, title: "Meeting summary", date: new Date(2025, 3, 26) },
  { id: 6, title: "Research on AI trends", date: new Date(2025, 3, 25) },
  { id: 7, title: "Email campaign ideas", date: new Date(2025, 3, 24) },
  { id: 8, title: "Bug troubleshooting", date: new Date(2025, 3, 23) },
  { id: 9, title: "Content strategy", date: new Date(2025, 3, 22) },
  { id: 10, title: "Design feedback", date: new Date(2025, 3, 21) },
];

const ChatAssistant: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle message submission logic here
    setInputValue('');
  };
  
  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col bg-background w-full">
        <Header />
        
        <div className="flex flex-1 w-full">
          <Sidebar>
            <SidebarHeader className="p-4">
              <div className="flex flex-col gap-3 w-full">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/explore-apps" className="flex items-center">
                    <Bot className="mr-2 h-4 w-4" />
                    Explore Apps
                  </Link>
                </Button>
                
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  New Chat
                </Button>
              </div>
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <ScrollArea className="h-[calc(100vh-13rem)]">
                    <SidebarMenu>
                      {chatHistory.map((chat) => (
                        <SidebarMenuItem key={chat.id}>
                          <SidebarMenuButton className="flex flex-col items-start">
                            <span className="text-sm truncate w-full text-left">{chat.title}</span>
                            <span className="text-xs text-muted-foreground">{formatDate(chat.date)}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </ScrollArea>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          
          <SidebarInset className="flex flex-col">
            <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto px-4">
              <div className="flex flex-col items-center justify-center py-10 space-y-6">
                <h1 className="text-3xl font-archivo-black">Chat Assistant</h1>
              </div>
              
              {/* Chat messages would go here */}
              <div className="flex-1">
                {/* Chat messages content */}
              </div>
              
              {/* Chat input with send button on right */}
              <div className="border-t py-4 sticky bottom-0 bg-background">
                <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute left-2 top-1/2 transform -translate-y-1/2"
                        >
                          <Plus className="h-4 w-4" />
                          <span className="sr-only">Add attachment</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent side="top" align="start" className="w-48">
                        <div className="flex flex-col space-y-1">
                          <Button variant="ghost" className="justify-start">
                            <Image className="mr-2 h-4 w-4" />
                            Upload Image
                          </Button>
                          <Button variant="ghost" className="justify-start">
                            <FileText className="mr-2 h-4 w-4" />
                            Upload Document
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                    
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type your message here..."
                      className="pl-10" 
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
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ChatAssistant;
