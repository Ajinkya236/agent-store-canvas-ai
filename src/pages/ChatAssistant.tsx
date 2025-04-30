import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { Send, Plus, Bot, Image, FileText, Trash2, Edit2, Search, ArrowLeft } from 'lucide-react';
import { Sidebar, SidebarProvider, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupContent, SidebarSeparator, SidebarInset } from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
interface ChatItem {
  id: number;
  title: string;
  date: Date;
  messages: ChatMessage[];
}
interface ChatMessage {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
  attachments?: {
    type: 'image' | 'document' | 'code';
    name: string;
    content: string;
  }[];
}
interface GPTApp {
  id: number;
  name: string;
  description: string;
  creator: string;
  category: string;
  image: string;
  isFavorite: boolean;
}
const ChatAssistant: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [editingChatId, setEditingChatId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTab, setCurrentTab] = useState('chat');
  const [gptApps, setGptApps] = useState<GPTApp[]>([]);
  const [filteredGptApps, setFilteredGptApps] = useState<GPTApp[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  useEffect(() => {
    // Load chat history from localStorage
    const savedChats = localStorage.getItem('chat-history');
    if (savedChats) {
      try {
        const parsedChats = JSON.parse(savedChats).map((chat: any) => ({
          ...chat,
          date: new Date(chat.date),
          messages: chat.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
        setChatHistory(parsedChats);

        // Set the most recent chat as active if available
        if (parsedChats.length > 0) {
          setActiveChat(parsedChats[0].id);
        }
      } catch (error) {
        console.error('Error parsing chat history', error);
      }
    } else {
      // Initialize with sample chats if none exist
      const initialChats = [{
        id: 1,
        title: "Marketing strategy ideas",
        date: new Date(2025, 3, 30),
        messages: [{
          id: 1,
          content: "I need help with marketing strategy for a new SaaS product.",
          isUser: true,
          timestamp: new Date(2025, 3, 30, 10, 30)
        }, {
          id: 2,
          content: "I'd be happy to help with your SaaS marketing strategy! To provide the most relevant advice, could you share more details about your product, target audience, and current marketing efforts?",
          isUser: false,
          timestamp: new Date(2025, 3, 30, 10, 31)
        }]
      }, {
        id: 2,
        title: "Product roadmap planning",
        date: new Date(2025, 3, 29),
        messages: [{
          id: 1,
          content: "Can you help me plan a 6-month product roadmap?",
          isUser: true,
          timestamp: new Date(2025, 3, 29, 15, 20)
        }, {
          id: 2,
          content: "I'd be glad to help with your product roadmap planning! Creating an effective 6-month roadmap requires balancing strategic goals with practical execution. Let's start by identifying your key objectives and priorities.",
          isUser: false,
          timestamp: new Date(2025, 3, 29, 15, 21)
        }]
      }, {
        id: 3,
        title: "Code review assistance",
        date: new Date(2025, 3, 28),
        messages: [{
          id: 1,
          content: "Can you review this React component I wrote?",
          isUser: true,
          timestamp: new Date(2025, 3, 28, 9, 15),
          attachments: [{
            type: 'code',
            name: 'Button.tsx',
            content: 'import React from "react";\n\nconst Button = ({ children, onClick }) => {\n  return (\n    <button\n      onClick={onClick}\n      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"\n    >\n      {children}\n    </button>\n  );\n};\n\nexport default Button;'
          }]
        }, {
          id: 2,
          content: "I've reviewed your React Button component. Overall, it's a good start! Here are a few suggestions for improvement:\n\n1. Add TypeScript types for better type safety\n2. Consider handling disabled state\n3. Add aria attributes for accessibility\n\nHere's an improved version:",
          isUser: false,
          timestamp: new Date(2025, 3, 28, 9, 17),
          attachments: [{
            type: 'code',
            name: 'ImprovedButton.tsx',
            content: 'import React from "react";\n\ninterface ButtonProps {\n  children: React.ReactNode;\n  onClick?: () => void;\n  disabled?: boolean;\n  variant?: "primary" | "secondary" | "outline";\n}\n\nconst Button = ({ \n  children, \n  onClick, \n  disabled = false,\n  variant = "primary" \n}: ButtonProps) => {\n  const baseStyles = "px-4 py-2 rounded focus:outline-none focus:ring-2";\n  const variantStyles = {\n    primary: "bg-blue-500 text-white hover:bg-blue-600",\n    secondary: "bg-gray-500 text-white hover:bg-gray-600",\n    outline: "bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-50"\n  };\n  \n  return (\n    <button\n      onClick={onClick}\n      disabled={disabled}\n      className={`${baseStyles} ${variantStyles[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}\n      aria-disabled={disabled}\n    >\n      {children}\n    </button>\n  );\n};\n\nexport default Button;'
          }]
        }]
      }];
      setChatHistory(initialChats);
      setActiveChat(1);
      localStorage.setItem('chat-history', JSON.stringify(initialChats));
    }

    // Initialize GPT apps
    const initialGPTApps = [{
      id: 1,
      name: "Writing Assistant",
      description: "Helps with essay, email, and creative writing",
      creator: "Lovable AI",
      category: "Writing",
      image: "/placeholder.svg",
      isFavorite: true
    }, {
      id: 2,
      name: "Code Helper",
      description: "Assists with programming problems and code optimization",
      creator: "Dev Tools Inc",
      category: "Coding",
      image: "/placeholder.svg",
      isFavorite: false
    }, {
      id: 3,
      name: "Math Tutor",
      description: "Explains math concepts and solves problems",
      creator: "Education Plus",
      category: "Education",
      image: "/placeholder.svg",
      isFavorite: true
    }, {
      id: 4,
      name: "Travel Planner",
      description: "Helps plan trips and create itineraries",
      creator: "Voyage AI",
      category: "Lifestyle",
      image: "/placeholder.svg",
      isFavorite: false
    }, {
      id: 5,
      name: "Design Assistant",
      description: "Provides UI/UX design feedback and suggestions",
      creator: "Creative Labs",
      category: "Design",
      image: "/placeholder.svg",
      isFavorite: false
    }, {
      id: 6,
      name: "Health Coach",
      description: "Offers fitness and nutrition guidance",
      creator: "Wellness AI",
      category: "Health",
      image: "/placeholder.svg",
      isFavorite: false
    }];
    setGptApps(initialGPTApps);
    setFilteredGptApps(initialGPTApps);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [activeChat, chatHistory]);

  // Filter GPT apps when search or category changes
  useEffect(() => {
    let filtered = [...gptApps];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(app => app.name.toLowerCase().includes(query) || app.description.toLowerCase().includes(query) || app.category.toLowerCase().includes(query));
    }
    if (selectedCategory) {
      filtered = filtered.filter(app => app.category === selectedCategory);
    }
    setFilteredGptApps(filtered);
  }, [searchQuery, selectedCategory, gptApps]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() && !selectedFile) return;
    if (!activeChat) {
      createNewChat();
      return;
    }
    setIsProcessing(true);

    // Find the active chat
    const currentChat = chatHistory.find(chat => chat.id === activeChat);
    if (!currentChat) return;

    // Create user message
    const userMessageId = Date.now();
    const userMessage: ChatMessage = {
      id: userMessageId,
      content: inputValue.trim(),
      isUser: true,
      timestamp: new Date(),
      attachments: selectedFile ? [{
        type: selectedFile.type.startsWith('image/') ? 'image' : 'document',
        name: selectedFile.name,
        content: URL.createObjectURL(selectedFile)
      }] : undefined
    };

    // Update chat with user message
    const updatedChat = {
      ...currentChat,
      date: new Date(),
      // Update date to put it at the top
      messages: [...currentChat.messages, userMessage]
    };

    // Update chat history
    const updatedHistory = chatHistory.map(chat => chat.id === activeChat ? updatedChat : chat);
    setChatHistory(updatedHistory);
    setInputValue('');
    setSelectedFile(null);
    localStorage.setItem('chat-history', JSON.stringify(updatedHistory));

    // Simulate AI response after a delay
    setTimeout(() => {
      // Create AI response
      const aiResponse: ChatMessage = {
        id: Date.now(),
        content: generateAIResponse(inputValue, currentChat),
        isUser: false,
        timestamp: new Date()
      };

      // Update chat with AI response
      const chatWithResponse = {
        ...updatedChat,
        messages: [...updatedChat.messages, aiResponse]
      };

      // Update chat history with AI response
      const finalHistory = updatedHistory.map(chat => chat.id === activeChat ? chatWithResponse : chat);

      // Sort by date (newest first)
      const sortedHistory = [...finalHistory].sort((a, b) => b.date.getTime() - a.date.getTime());
      setChatHistory(sortedHistory);
      localStorage.setItem('chat-history', JSON.stringify(sortedHistory));
      setIsProcessing(false);
    }, 1000);
  };

  // Generate a simulated AI response based on user input
  const generateAIResponse = (input: string, chat: ChatItem): string => {
    if (!input) return "I see you've shared a file. Let me analyze it for you.";
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return "Hello! How can I assist you today?";
    } else if (lowerInput.includes('help')) {
      return "I'd be happy to help. Could you provide more details about what you need assistance with?";
    } else if (lowerInput.includes('code') || lowerInput.includes('programming')) {
      return "I can help with coding questions. What programming language or framework are you working with?";
    } else if (lowerInput.includes('write') || lowerInput.includes('essay')) {
      return "I can assist with writing. What type of content would you like help creating?";
    } else {
      return `Thank you for your message. I'll help you with your query about "${input.substring(0, 30)}${input.length > 30 ? '...' : ''}". What specific information are you looking for?`;
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
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const createNewChat = () => {
    const newId = chatHistory.length > 0 ? Math.max(...chatHistory.map(chat => chat.id)) + 1 : 1;
    const newChat = {
      id: newId,
      title: `New Chat ${newId}`,
      date: new Date(),
      messages: []
    };
    const updatedHistory = [newChat, ...chatHistory];
    setChatHistory(updatedHistory);
    setActiveChat(newId);
    localStorage.setItem('chat-history', JSON.stringify(updatedHistory));
    toast({
      title: "New chat created",
      description: "You can now start a new conversation."
    });
  };
  const deleteChat = (id: number) => {
    const filteredChats = chatHistory.filter(chat => chat.id !== id);
    setChatHistory(filteredChats);

    // If the active chat is deleted, set the first chat as active, or null if no chats
    if (activeChat === id) {
      setActiveChat(filteredChats.length > 0 ? filteredChats[0].id : null);
    }
    localStorage.setItem('chat-history', JSON.stringify(filteredChats));
    toast({
      title: "Chat deleted",
      description: "The chat has been removed."
    });
  };
  const startEditingChat = (id: number, title: string) => {
    setEditingChatId(id);
    setEditingTitle(title);
  };
  const saveEditedChat = () => {
    if (editingChatId) {
      const updatedHistory = chatHistory.map(chat => chat.id === editingChatId ? {
        ...chat,
        title: editingTitle || `Chat ${editingChatId}`,
        date: new Date()
      } : chat);

      // Sort by date (newest first)
      const sortedHistory = [...updatedHistory].sort((a, b) => b.date.getTime() - a.date.getTime());
      setChatHistory(sortedHistory);
      setEditingChatId(null);
      localStorage.setItem('chat-history', JSON.stringify(sortedHistory));
      toast({
        title: "Chat renamed",
        description: "The chat title has been updated."
      });
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      if (editingChatId) {
        e.preventDefault();
        saveEditedChat();
      } else if (currentTab === 'chat') {
        e.preventDefault();
        handleSubmit(e as unknown as React.FormEvent);
      }
    }
  };
  const handleFileUpload = (type: 'image' | 'document') => {
    const inputRef = type === 'image' ? imageInputRef : fileInputRef;
    inputRef.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast({
        title: `File selected`,
        description: `${file.name} has been selected.`
      });
      if (!activeChat) {
        createNewChat();
      }
    }
  };
  const toggleFavorite = (id: number) => {
    const updatedApps = gptApps.map(app => app.id === id ? {
      ...app,
      isFavorite: !app.isFavorite
    } : app);
    setGptApps(updatedApps);
    toast({
      title: updatedApps.find(app => app.id === id)?.isFavorite ? "Added to favorites" : "Removed from favorites",
      description: `${updatedApps.find(app => app.id === id)?.name} has been ${updatedApps.find(app => app.id === id)?.isFavorite ? 'added to' : 'removed from'} your favorites.`
    });
  };
  return <SidebarProvider>
      <div className="min-h-screen flex flex-col bg-background w-full">
        <Header />
        
        <div className="flex flex-1 w-full">
          <Sidebar className="border-r">
            <SidebarHeader className="p-4">
              <div className="flex flex-col gap-3 w-full">
                <Link to="/explore-apps">
                  <Button variant="outline" className="w-full">
                    <Bot className="mr-2 h-4 w-4" />
                    Explore Apps
                  </Button>
                </Link>
                
                <Button className="w-full" onClick={createNewChat}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Chat
                </Button>
              </div>
            </SidebarHeader>
            
            <SidebarContent>
              <Tabs defaultValue="chats" className="w-full">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="chats">Chats</TabsTrigger>
                  <TabsTrigger value="favorites">Favorites</TabsTrigger>
                </TabsList>
                
                <TabsContent value="chats" className="mt-0">
                  <SidebarGroup>
                    <SidebarGroupContent>
                      <ScrollArea className="h-[calc(100vh-13rem)]">
                        <SidebarMenu>
                          {chatHistory.length === 0 ? <div className="py-4 px-2 text-center text-muted-foreground text-sm">
                              No chats yet. Click "New Chat" to get started.
                            </div> : chatHistory.map(chat => <SidebarMenuItem key={chat.id}>
                                {editingChatId === chat.id ? <div className="flex w-full items-center px-2 py-1">
                                    <Input value={editingTitle} onChange={e => setEditingTitle(e.target.value)} onBlur={saveEditedChat} onKeyDown={handleKeyDown} className="h-8 text-sm" autoFocus />
                                  </div> : <div className="flex w-full">
                                    <SidebarMenuButton onClick={() => setActiveChat(chat.id)} isActive={activeChat === chat.id} className="flex flex-col items-start flex-grow text-base text-zinc-950">
                                      <span className="text-sm truncate w-full text-left font-medium text-foreground">
                                        {chat.title}
                                      </span>
                                      <span className="text-xs text-muted-foreground">
                                        {formatDate(chat.date)}
                                      </span>
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
                                        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => deleteChat(chat.id)}>
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>}
                              </SidebarMenuItem>)}
                        </SidebarMenu>
                      </ScrollArea>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </TabsContent>
                
                <TabsContent value="favorites" className="mt-0">
                  <ScrollArea className="h-[calc(100vh-13rem)]">
                    <div className="p-4 space-y-4">
                      {gptApps.filter(app => app.isFavorite).length === 0 ? <div className="text-center text-muted-foreground py-8">
                          <p>No favorite apps yet.</p>
                          <p className="text-sm mt-1">
                            Explore apps and mark them as favorites to see them here.
                          </p>
                        </div> : gptApps.filter(app => app.isFavorite).map(app => <Card key={app.id} className="cursor-pointer hover:bg-accent/50 transition-colors">
                              <CardContent className="p-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                                  <img src={app.image} alt={app.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-medium text-sm truncate">{app.name}</h3>
                                  <p className="text-xs text-muted-foreground truncate">{app.description}</p>
                                </div>
                              </CardContent>
                            </Card>)}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </SidebarContent>
          </Sidebar>
          
          <SidebarInset className="flex flex-col">
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="flex flex-col flex-1 w-full">
              <TabsList className="mx-auto mt-2 mb-0">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="gpt">Explore GPTs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat" className="flex-1 flex flex-col data-[state=active]:flex-1">
                <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto px-4">
                  {/* Chat messages */}
                  <div className="flex-1 overflow-y-auto py-4">
                    {!activeChat ? <div className="flex flex-col items-center justify-center h-full text-center">
                        <h1 className="text-2xl font-bold mb-2">Welcome to AI Assistant</h1>
                        <p className="text-muted-foreground max-w-md mb-6">
                          Your personal AI-powered assistant for writing, coding, learning, and problem-solving.
                        </p>
                        <Button onClick={createNewChat}>
                          <Plus className="mr-2 h-4 w-4" />
                          Start a new chat
                        </Button>
                      </div> : <>
                        {chatHistory.find(chat => chat.id === activeChat)?.messages.length === 0 ? <div className="flex flex-col items-center justify-center h-full text-center">
                            <h2 className="text-xl font-semibold mb-2">Start a conversation</h2>
                            <p className="text-muted-foreground mb-4 max-w-md">
                              Ask me anything and I'll do my best to help you.
                            </p>
                            <div className="grid grid-cols-2 gap-2 max-w-md">
                              <Button variant="outline" onClick={() => setInputValue("Help me write a professional email")} className="text-left justify-start h-auto py-3">
                                Help me write a professional email
                              </Button>
                              <Button variant="outline" onClick={() => setInputValue("Explain quantum computing")} className="text-left justify-start h-auto py-3">
                                Explain quantum computing
                              </Button>
                              <Button variant="outline" onClick={() => setInputValue("How do I improve my JavaScript skills?")} className="text-left justify-start h-auto py-3">
                                How do I improve my JavaScript skills?
                              </Button>
                              <Button variant="outline" onClick={() => setInputValue("Create a workout plan for me")} className="text-left justify-start h-auto py-3">
                                Create a workout plan for me
                              </Button>
                            </div>
                          </div> : <div className="space-y-4">
                            {chatHistory.find(chat => chat.id === activeChat)?.messages.map(msg => <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] flex ${msg.isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-2`}>
                                  <Avatar className="w-8 h-8">
                                    {msg.isUser ? <AvatarFallback>U</AvatarFallback> : <>
                                        <AvatarImage src="/placeholder.svg" />
                                        <AvatarFallback>AI</AvatarFallback>
                                      </>}
                                  </Avatar>
                                  
                                  <div>
                                    <div className={`rounded-lg p-3 ${msg.isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                                      {/* Display attachments if any */}
                                      {msg.attachments && msg.attachments.length > 0 && <div className="mb-2 space-y-2">
                                          {msg.attachments.map((attachment, index) => <div key={index}>
                                              {attachment.type === 'image' ? <div className="rounded overflow-hidden mb-2">
                                                  <img src={attachment.content} alt={attachment.name} className="max-w-full" />
                                                  <p className="text-xs opacity-70 mt-1">{attachment.name}</p>
                                                </div> : attachment.type === 'code' ? <div className="bg-background/80 text-foreground rounded p-2 overflow-x-auto mb-2">
                                                  <p className="text-xs font-medium mb-1">{attachment.name}</p>
                                                  <pre className="text-sm whitespace-pre-wrap">
                                                    {attachment.content}
                                                  </pre>
                                                </div> : <div className="bg-background/80 text-foreground rounded p-2 flex items-center gap-2">
                                                  <FileText className="h-5 w-5" />
                                                  <span className="text-sm font-medium">{attachment.name}</span>
                                                </div>}
                                            </div>)}
                                        </div>}
                                      
                                      {/* Message content */}
                                      {msg.content && <div className="whitespace-pre-wrap">{msg.content}</div>}
                                    </div>
                                    <div className={`text-xs text-muted-foreground mt-1 ${msg.isUser ? 'text-right' : 'text-left'}`}>
                                      {formatTime(msg.timestamp)}
                                    </div>
                                  </div>
                                </div>
                              </div>)}
                            <div ref={messagesEndRef} />
                          </div>}
                      </>}
                  </div>
                  
                  {/* Chat input with send button */}
                  <div className="border-t py-4 sticky bottom-0 bg-background">
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        {/* File preview if selected */}
                        {selectedFile && <div className="flex items-center gap-2 bg-secondary/50 py-1 px-2 rounded-md">
                            {selectedFile.type.startsWith('image/') ? <Image className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                            <span className="text-sm truncate max-w-[150px]">{selectedFile.name}</span>
                            <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full" onClick={() => setSelectedFile(null)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 relative">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 transform -translate-y-1/2">
                                <Plus className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent side="top" align="start" className="w-48">
                              <div className="flex flex-col space-y-1">
                                <Button variant="ghost" className="justify-start" onClick={() => handleFileUpload('image')}>
                                  <Image className="mr-2 h-4 w-4" />
                                  Upload Image
                                </Button>
                                <Button variant="ghost" className="justify-start" onClick={() => handleFileUpload('document')}>
                                  <FileText className="mr-2 h-4 w-4" />
                                  Upload Document
                                </Button>
                                
                                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt" className="hidden" />
                                <input type="file" ref={imageInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                              </div>
                            </PopoverContent>
                          </Popover>
                          
                          <Input value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder="Message AI Assistant..." className="pl-10" disabled={isProcessing} />
                        </div>
                        <Button type="submit" size="icon" disabled={!inputValue.trim() && !selectedFile || isProcessing} className="bg-primary hover:bg-primary/90">
                          {isProcessing ? <div className="h-4 w-4 border-2 border-t-transparent border-primary-foreground rounded-full animate-spin" /> : <Send className="h-4 w-4" />}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="gpt" className="flex-1 flex flex-col data-[state=active]:flex-1">
                <div className="max-w-4xl w-full mx-auto px-4 py-6 flex flex-col h-full">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold">Explore GPTs</h2>
                    <p className="text-muted-foreground">
                      Discover specialized AI applications built for specific tasks
                    </p>
                  </div>
                  
                  {/* Search and filter */}
                  <div className="mb-6 space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search GPTs..." className="pl-10" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                    </div>
                    
                    <ScrollArea className="whitespace-nowrap pb-3">
                      <div className="flex gap-2">
                        <Button variant={selectedCategory === null ? "secondary" : "outline"} size="sm" onClick={() => setSelectedCategory(null)} className="rounded-full">
                          All
                        </Button>
                        {Array.from(new Set(gptApps.map(app => app.category))).map(category => <Button key={category} variant={selectedCategory === category ? "secondary" : "outline"} size="sm" onClick={() => setSelectedCategory(category)} className="rounded-full">
                            {category}
                          </Button>)}
                      </div>
                    </ScrollArea>
                  </div>
                  
                  {/* GPT apps grid */}
                  {filteredGptApps.length === 0 ? <div className="text-center py-8">
                      <p className="text-lg font-medium">No GPTs found</p>
                      <p className="text-muted-foreground mt-1">
                        Try adjusting your search or filters
                      </p>
                    </div> : <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto pb-4">
                      {filteredGptApps.map(app => <Card key={app.id} className="overflow-hidden hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                                <img src={app.image} alt={app.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-medium">{app.name}</h3>
                                  <Button variant="ghost" size="icon" onClick={() => toggleFavorite(app.id)} className={app.isFavorite ? 'text-yellow-500' : ''}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill={app.isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                    </svg>
                                  </Button>
                                </div>
                                <p className="text-sm text-muted-foreground">{app.description}</p>
                                <div className="mt-2 flex items-center justify-between">
                                  <span className="text-xs text-muted-foreground">By {app.creator}</span>
                                  <Badge variant="outline">{app.category}</Badge>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>)}
                    </div>}
                </div>
              </TabsContent>
            </Tabs>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>;
};
export default ChatAssistant;