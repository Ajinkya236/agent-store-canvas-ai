import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  MessageCircle, 
  Send, 
  Paperclip, 
  Image, 
  Save,
  MessageSquare,
  List
} from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose
} from '@/components/ui/sheet';
import { toast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
  attachments?: { type: string; url: string; name: string }[];
}

interface Chat {
  id: string;
  title: string;
  lastMessage: string;
  lastUpdated: string;
  messages: Message[];
}

const ChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [agent, setAgent] = useState<any>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [message, setMessage] = useState('');
  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Load agent data
  useEffect(() => {
    // This would normally be an API call
    const mockAgent = {
      id: Number(id),
      name: "Document Analyzer",
      description: "Extract and analyze data from any document format",
      logo: "/placeholder.svg",
    };
    
    setAgent(mockAgent);
    
    // Load chats from localStorage
    loadChatsFromStorage();
  }, [id]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  // Load chats from localStorage
  const loadChatsFromStorage = () => {
    const storedChats = localStorage.getItem(`agent-${id}-chats`);
    const parsedChats = storedChats ? JSON.parse(storedChats) : [];
    
    setChats(parsedChats);
    
    // Set active chat to the most recent one if it exists
    if (parsedChats.length > 0) {
      setActiveChat(parsedChats[0]);
    }
  };

  // Save chats to localStorage
  const saveChatsToStorage = (updatedChats: Chat[]) => {
    localStorage.setItem(`agent-${id}-chats`, JSON.stringify(updatedChats));
  };

  // Create a new chat
  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: `New Chat ${chats.length + 1}`,
      lastMessage: "No messages yet",
      lastUpdated: new Date().toISOString(),
      messages: []
    };
    
    const updatedChats = [newChat, ...chats];
    setChats(updatedChats);
    setActiveChat(newChat);
    saveChatsToStorage(updatedChats);
  };

  // Open a chat
  const openChat = (chat: Chat) => {
    setActiveChat(chat);
  };

  // Delete a chat
  const deleteChat = (chatId: string) => {
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);
    
    // If the active chat is deleted, set the first chat as active or null if no chats
    if (activeChat && activeChat.id === chatId) {
      setActiveChat(updatedChats.length > 0 ? updatedChats[0] : null);
    }
    
    saveChatsToStorage(updatedChats);
    toast({
      title: "Chat deleted",
      description: "Chat has been removed from your history",
    });
  };

  // Edit chat title
  const startEditingTitle = (chatId: string, title: string) => {
    setEditingTitle(chatId);
    setNewTitle(title);
  };

  // Save edited title
  const saveTitle = (chatId: string) => {
    const updatedChats = chats.map(chat => {
      if (chat.id === chatId) {
        return { ...chat, title: newTitle || chat.title };
      }
      return chat;
    });
    
    setChats(updatedChats);
    
    // Update active chat if it's the one being edited
    if (activeChat && activeChat.id === chatId) {
      setActiveChat({ ...activeChat, title: newTitle || activeChat.title });
    }
    
    setEditingTitle(null);
    saveChatsToStorage(updatedChats);
  };

  // Cancel editing title
  const cancelEditingTitle = () => {
    setEditingTitle(null);
    setNewTitle('');
  };

  // Submit message
  const submitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() && !fileInputRef.current?.files?.length && !imageInputRef.current?.files?.length) return;
    
    if (!activeChat) {
      // Create a new chat if none is active
      createNewChat();
      return;
    }
    
    setIsLoading(true);
    
    // Process attachments if any
    const attachments: { type: string; url: string; name: string }[] = [];
    
    // Process files
    if (fileInputRef.current?.files?.length) {
      const file = fileInputRef.current.files[0];
      // In a real app, we would upload the file to a server and get a URL
      // For this example, we'll create a fake URL
      attachments.push({
        type: 'file',
        url: URL.createObjectURL(file),
        name: file.name
      });
    }
    
    // Process images
    if (imageInputRef.current?.files?.length) {
      const image = imageInputRef.current.files[0];
      // In a real app, we would upload the image to a server and get a URL
      // For this example, we'll create a fake URL
      attachments.push({
        type: 'image',
        url: URL.createObjectURL(image),
        name: image.name
      });
    }
    
    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
      timestamp: new Date().toISOString(),
      attachments: attachments.length > 0 ? attachments : undefined
    };
    
    // Update chat with user message
    const updatedMessages = [...activeChat.messages, userMessage];
    const updatedChat = {
      ...activeChat,
      messages: updatedMessages,
      lastMessage: message || "Attachment",
      lastUpdated: new Date().toISOString()
    };
    
    // Update chats array
    const updatedChats = chats.map(chat => {
      if (chat.id === activeChat.id) {
        return updatedChat;
      }
      return chat;
    });
    
    setChats(updatedChats);
    setActiveChat(updatedChat);
    setMessage('');
    
    // Clear file inputs
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (imageInputRef.current) imageInputRef.current.value = '';
    
    // Save to localStorage
    saveChatsToStorage(updatedChats);
    
    // Simulate agent response after a short delay
    setTimeout(() => {
      // Generate agent response
      const agentMessage: Message = {
        id: Date.now().toString(),
        content: `This is a simulated response from ${agent?.name} for your query: "${message}"`,
        isUser: false,
        timestamp: new Date().toISOString()
      };
      
      // Update chat with agent response
      const updatedMessagesWithResponse = [...updatedChat.messages, agentMessage];
      const updatedChatWithResponse = {
        ...updatedChat,
        messages: updatedMessagesWithResponse,
        lastUpdated: new Date().toISOString()
      };
      
      // Update chats array
      const finalUpdatedChats = updatedChats.map(chat => {
        if (chat.id === activeChat.id) {
          return updatedChatWithResponse;
        }
        return chat;
      });
      
      setChats(finalUpdatedChats);
      setActiveChat(updatedChatWithResponse);
      
      // Save to localStorage
      saveChatsToStorage(finalUpdatedChats);
      setIsLoading(false);
    }, 1000);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    
    // If today, show time only
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // If this year, show month and day
    if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
    
    // Otherwise, show full date
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Trigger file upload
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  // Trigger image upload
  const triggerImageUpload = () => {
    imageInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Chat list sidebar - visible on larger screens */}
        <aside className="hidden md:flex flex-col w-64 border-r bg-background">
          <div className="p-4">
            <Button onClick={createNewChat} className="w-full">
              <MessageCircle className="mr-2 h-4 w-4" />
              New Chat
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <div className="px-3">
              {chats.length === 0 ? (
                <div className="text-center p-4 text-muted-foreground">
                  No chats yet. Start a new chat to begin.
                </div>
              ) : (
                <ul className="space-y-1">
                  {chats.map(chat => (
                    <li key={chat.id}>
                      <div 
                        className={`flex items-center justify-between px-2 py-2.5 rounded-md cursor-pointer ${
                          activeChat && activeChat.id === chat.id ? 'bg-secondary' : 'hover:bg-secondary/50'
                        }`}
                        onClick={() => openChat(chat)}
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <MessageSquare className="h-4 w-4 flex-shrink-0" />
                          
                          {editingTitle === chat.id ? (
                            <div className="flex-1 flex">
                              <Input
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                autoFocus
                                className="h-6 text-sm py-0.5"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    saveTitle(chat.id);
                                  } else if (e.key === 'Escape') {
                                    cancelEditingTitle();
                                  }
                                }}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <div className="flex ml-1">
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  className="h-6 w-6" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    saveTitle(chat.id);
                                  }}
                                >
                                  <Save className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex-1 min-w-0">
                              <h3 className="truncate text-sm font-medium">
                                {chat.title}
                              </h3>
                              <p className="truncate text-xs text-muted-foreground mt-0.5">
                                {chat.lastMessage}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                          {formatDate(chat.lastUpdated)}
                        </span>
                      </div>
                      <div className="ml-8 flex space-x-1">
                        {/* Chat actions */}
                        {editingTitle !== chat.id && activeChat && activeChat.id === chat.id && (
                          <>
                            <button
                              className="text-xs text-muted-foreground hover:text-foreground"
                              onClick={(e) => {
                                e.stopPropagation();
                                startEditingTitle(chat.id, chat.title);
                              }}
                            >
                              Edit
                            </button>
                            <span className="text-xs text-muted-foreground">•</span>
                            <button
                              className="text-xs text-muted-foreground hover:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteChat(chat.id);
                              }}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </aside>
        
        {/* Chat content */}
        <div className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-hidden">
          {/* Chat header */}
          <div className="border-b bg-card shadow-sm">
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-2">
                {/* Mobile sidebar trigger */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                      <List className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full max-w-xs p-0">
                    <div className="flex flex-col h-full">
                      <div className="p-4 border-b">
                        <SheetClose asChild>
                          <Button onClick={createNewChat} className="w-full">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            New Chat
                          </Button>
                        </SheetClose>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto">
                        <div className="px-3">
                          {chats.length === 0 ? (
                            <div className="text-center p-4 text-muted-foreground">
                              No chats yet. Start a new chat to begin.
                            </div>
                          ) : (
                            <ul className="space-y-1">
                              {chats.map(chat => (
                                <li key={chat.id}>
                                  <SheetClose asChild>
                                    <div 
                                      className={`flex items-center justify-between px-2 py-2.5 rounded-md cursor-pointer ${
                                        activeChat && activeChat.id === chat.id ? 'bg-secondary' : 'hover:bg-secondary/50'
                                      }`}
                                      onClick={() => openChat(chat)}
                                    >
                                      <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <MessageSquare className="h-4 w-4 flex-shrink-0" />
                                        
                                        <div className="flex-1 min-w-0">
                                          <h3 className="truncate text-sm font-medium">
                                            {chat.title}
                                          </h3>
                                          <p className="truncate text-xs text-muted-foreground mt-0.5">
                                            {chat.lastMessage}
                                          </p>
                                        </div>
                                      </div>
                                      
                                      <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                                        {formatDate(chat.lastUpdated)}
                                      </span>
                                    </div>
                                  </SheetClose>
                                  
                                  <div className="ml-8 flex space-x-1">
                                    <button
                                      className="text-xs text-muted-foreground hover:text-foreground"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        startEditingTitle(chat.id, chat.title);
                                      }}
                                    >
                                      Edit
                                    </button>
                                    <span className="text-xs text-muted-foreground">•</span>
                                    <button
                                      className="text-xs text-muted-foreground hover:text-destructive"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteChat(chat.id);
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
                
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                    <img 
                      src={agent?.logo || "/placeholder.svg"}
                      alt={agent?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold leading-none">{agent?.name || 'Agent'}</h2>
                    <p className="text-xs text-muted-foreground">{activeChat ? activeChat.title : 'New conversation'}</p>
                  </div>
                </div>
              </div>
              
              <div>
                {/* New chat button for larger screens */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="hidden md:flex"
                  onClick={createNewChat}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  New Chat
                </Button>
              </div>
            </div>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {!activeChat ? (
              <div className="h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <img 
                    src={agent?.logo || "/placeholder.svg"}
                    alt={agent?.name}
                    className="w-12 h-12 object-cover"
                  />
                </div>
                <h2 className="text-xl font-semibold mb-1">{agent?.name || 'AI Agent'}</h2>
                <p className="text-muted-foreground mb-6">{agent?.description || 'Ask me anything'}</p>
                <Button onClick={createNewChat}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Start a new chat
                </Button>
              </div>
            ) : (
              <>
                {activeChat.messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                      <img 
                        src={agent?.logo || "/placeholder.svg"}
                        alt={agent?.name}
                        className="w-12 h-12 object-cover"
                      />
                    </div>
                    <h2 className="text-xl font-semibold mb-1">{agent?.name || 'AI Agent'}</h2>
                    <p className="text-muted-foreground text-center max-w-md mb-6">
                      {agent?.description || 'Ask me anything about documents, data extraction, or analysis. I can help process various file formats and extract meaningful insights.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activeChat.messages.map(msg => (
                      <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] flex ${msg.isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-2`}>
                          <Avatar className="w-8 h-8 flex-shrink-0">
                            {msg.isUser ? (
                              <>
                                <AvatarFallback>U</AvatarFallback>
                              </>
                            ) : (
                              <>
                                <AvatarImage src={agent?.logo || "/placeholder.svg"} />
                                <AvatarFallback>AI</AvatarFallback>
                              </>
                            )}
                          </Avatar>
                          
                          <div>
                            <div className={`rounded-lg p-3 ${
                              msg.isUser 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-secondary text-secondary-foreground'
                            }`}>
                              {/* Display attachments if any */}
                              {msg.attachments && msg.attachments.length > 0 && (
                                <div className="mb-2 space-y-2">
                                  {msg.attachments.map((attachment, index) => (
                                    <div key={index} className="rounded bg-background/50 p-2 flex items-center gap-2">
                                      {attachment.type === 'image' ? (
                                        <>
                                          <div className="w-12 h-12 rounded overflow-hidden">
                                            <img 
                                              src={attachment.url} 
                                              alt={attachment.name}
                                              className="w-full h-full object-cover"
                                            />
                                          </div>
                                          <div className="overflow-hidden text-xs">
                                            <p className="truncate font-medium">{attachment.name}</p>
                                            <p className="text-muted-foreground">Image</p>
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          <div className="w-10 h-10 rounded bg-background/80 flex items-center justify-center">
                                            <Paperclip className="w-5 h-5" />
                                          </div>
                                          <div className="overflow-hidden text-xs">
                                            <p className="truncate font-medium">{attachment.name}</p>
                                            <p className="text-muted-foreground">File</p>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              {/* Message content */}
                              {msg.content && (
                                <div>{msg.content}</div>
                              )}
                            </div>
                            <div className={`text-xs text-muted-foreground mt-1 ${msg.isUser ? 'text-right' : 'text-left'}`}>
                              {formatDate(msg.timestamp)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messageEndRef} />
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Chat input */}
          <div className="border-t p-4">
            <form onSubmit={submitMessage} className="flex flex-col gap-2">
              <div className="relative">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="min-h-[80px] resize-none pr-12"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      submitMessage(e);
                    }
                  }}
                  disabled={!activeChat && chats.length > 0 || isLoading}
                />
                <div className="absolute bottom-2 right-2 flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={triggerFileUpload}
                    disabled={!activeChat && chats.length > 0 || isLoading}
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={triggerImageUpload}
                    disabled={!activeChat && chats.length > 0 || isLoading}
                  >
                    <Image className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  disabled={
                    (!message.trim() && 
                    !fileInputRef.current?.files?.length && 
                    !imageInputRef.current?.files?.length) || 
                    isLoading
                  }
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <>
                      Send
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
              
              {/* Hidden file inputs */}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={() => {
                  // Trigger submit if file is selected and there's an active chat
                  if (fileInputRef.current?.files?.length && activeChat) {
                    submitMessage({ preventDefault: () => {} } as React.FormEvent);
                  }
                }}
              />
              <input
                type="file"
                ref={imageInputRef}
                accept="image/*"
                className="hidden"
                onChange={() => {
                  // Trigger submit if image is selected and there's an active chat
                  if (imageInputRef.current?.files?.length && activeChat) {
                    submitMessage({ preventDefault: () => {} } as React.FormEvent);
                  }
                }}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
