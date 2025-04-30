
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Send, Plus, Bot, Image, FileText, Trash2, Edit2 } from 'lucide-react';
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
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface ChatItem {
  id: number;
  title: string;
  date: Date;
}

const ChatAssistant: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatItem[]>([
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
  ]);
  const [activeChat, setActiveChat] = useState<number | null>(1); // Start with first chat active
  const [editingChatId, setEditingChatId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle message submission logic here
    if (inputValue.trim()) {
      // In a real app, we would send the message to the backend
      console.log("Message submitted:", inputValue);
      setInputValue('');
    }
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
  
  const createNewChat = () => {
    const newId = chatHistory.length > 0 ? Math.max(...chatHistory.map(chat => chat.id)) + 1 : 1;
    const newChat = {
      id: newId,
      title: `New Chat ${newId}`,
      date: new Date()
    };
    
    setChatHistory([newChat, ...chatHistory]);
    setActiveChat(newChat.id);
    
    toast({
      title: "New chat created",
      description: "You can now start a new conversation.",
    });
  };
  
  const deleteChat = (id: number) => {
    setChatHistory(chatHistory.filter(chat => chat.id !== id));
    if (activeChat === id) {
      setActiveChat(chatHistory.length > 1 ? chatHistory[0].id : null);
    }
    
    toast({
      title: "Chat deleted",
      description: "The chat has been removed.",
    });
  };
  
  const startEditingChat = (id: number, title: string) => {
    setEditingChatId(id);
    setEditingTitle(title);
  };
  
  const saveEditedChat = () => {
    if (editingChatId) {
      setChatHistory(
        chatHistory.map(chat => 
          chat.id === editingChatId 
            ? { ...chat, title: editingTitle || `Chat ${editingChatId}` } 
            : chat
        )
      );
      setEditingChatId(null);
      
      toast({
        title: "Chat renamed",
        description: "The chat title has been updated.",
      });
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveEditedChat();
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
                
                <Button className="w-full" onClick={createNewChat}>
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
                          {editingChatId === chat.id ? (
                            <div className="flex w-full items-center px-2 py-1">
                              <Input
                                value={editingTitle}
                                onChange={(e) => setEditingTitle(e.target.value)}
                                onBlur={saveEditedChat}
                                onKeyDown={handleKeyDown}
                                className="h-8 text-sm"
                                autoFocus
                              />
                            </div>
                          ) : (
                            <div className="flex w-full">
                              <SidebarMenuButton 
                                className="flex flex-col items-start flex-grow"
                                onClick={() => setActiveChat(chat.id)}
                                isActive={activeChat === chat.id}
                              >
                                <span className="text-sm truncate w-full text-left">{chat.title}</span>
                                <span className="text-xs text-muted-foreground">{formatDate(chat.date)}</span>
                              </SidebarMenuButton>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-1">
                                    <Edit2 className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => startEditingChat(chat.id, chat.title)}>
                                    <Edit2 className="mr-2 h-4 w-4" />
                                    Rename
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    className="text-destructive focus:text-destructive"
                                    onClick={() => deleteChat(chat.id)}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          )}
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
                {activeChat ? (
                  <div className="text-center text-muted-foreground py-10">
                    {chatHistory.find(chat => chat.id === activeChat)?.title}
                    <p className="mt-2">This is where chat messages would appear.</p>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-10">
                    <p className="mt-2">Select a chat from the sidebar or create a new one.</p>
                  </div>
                )}
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
