
import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Plus, 
  Send, 
  UploadCloud, 
  MessageSquare, 
  Trash2, 
  Edit2, 
  Check, 
  X, 
  Settings, 
  Image,
  MessageSquareText
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: {
    type: 'image' | 'document';
    url: string;
    name: string;
  }[];
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  updatedAt: Date;
  messages: ChatMessage[];
}

const ChatAssistant: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State management
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'Project Planning Assistant',
      lastMessage: 'Here are the project timeline estimates you requested',
      updatedAt: new Date(Date.now() - 1000 * 60 * 30),
      messages: [
        {
          id: '1-1',
          role: 'user',
          content: 'I need help planning a new software project. Where should I start?',
          timestamp: new Date(Date.now() - 1000 * 60 * 35)
        },
        {
          id: '1-2',
          role: 'assistant',
          content: 'I\'d be happy to help you plan your software project! Let\'s start by defining the scope, objectives, and key deliverables. Could you share more details about what the software needs to accomplish?',
          timestamp: new Date(Date.now() - 1000 * 60 * 34)
        },
        {
          id: '1-3',
          role: 'user',
          content: 'It's a customer portal that needs to show order history, allow returns, and provide support chat.',
          timestamp: new Date(Date.now() - 1000 * 60 * 32)
        },
        {
          id: '1-4',
          role: 'assistant',
          content: 'Here are the project timeline estimates you requested. For a customer portal with those features, I recommend breaking it down into these phases:\n\n1. Design & Planning (2-3 weeks)\n2. Core Functionality Development (4-6 weeks)\n3. Integration with Order Systems (2-3 weeks)\n4. Returns Processing (2 weeks)\n5. Chat Support Integration (1-2 weeks)\n6. Testing & QA (2-3 weeks)\n7. Deployment & Launch Prep (1 week)\n\nTotal estimated timeline: 12-18 weeks depending on team size and complexity.',
          timestamp: new Date(Date.now() - 1000 * 60 * 30)
        }
      ]
    },
    {
      id: '2',
      title: 'Market Research Analysis',
      lastMessage: 'Based on the data, these are the key customer segments',
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
      messages: [
        {
          id: '2-1',
          role: 'user',
          content: 'Can you help analyze this market research data?',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3.1),
          attachments: [
            {
              type: 'document',
              url: '#',
              name: 'market_data_2023.csv'
            }
          ]
        },
        {
          id: '2-2',
          role: 'assistant',
          content: 'Based on the data, these are the key customer segments we should focus on...',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3)
        }
      ]
    }
  ]);
  
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  
  // Find current chat or create a new one
  useEffect(() => {
    if (chatId) {
      const session = chatSessions.find(s => s.id === chatId);
      if (session) {
        setCurrentSession(session);
      } else {
        // Invalid chat ID, redirect to main chat page
        navigate('/chat-assistant');
      }
    } else if (chatSessions.length > 0) {
      setCurrentSession(chatSessions[0]);
    } else {
      setCurrentSession(null);
    }
  }, [chatId, chatSessions, navigate]);
  
  // Auto scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentSession?.messages]);
  
  // Filter chats based on search query
  const filteredChatSessions = chatSessions.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Create a new chat session
  const createNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat: ChatSession = {
      id: newChatId,
      title: `New Chat ${chatSessions.length + 1}`,
      lastMessage: 'Chat started',
      updatedAt: new Date(),
      messages: [
        {
          id: `${newChatId}-1`,
          role: 'assistant',
          content: 'Hello! How can I assist you today?',
          timestamp: new Date()
        }
      ]
    };
    
    setChatSessions(prev => [newChat, ...prev]);
    navigate(`/chat-assistant/${newChatId}`);
  };
  
  // Send a new message
  const sendMessage = () => {
    if (!messageInput.trim() && !fileInputRef.current?.files?.length) return;
    
    if (!currentSession) {
      createNewChat();
      return;
    }
    
    setIsLoading(true);
    
    const newMessage: ChatMessage = {
      id: `${currentSession.id}-${Date.now()}`,
      role: 'user',
      content: messageInput,
      timestamp: new Date()
    };
    
    // Handle file attachments if any
    if (fileInputRef.current?.files?.length) {
      const files = Array.from(fileInputRef.current.files);
      newMessage.attachments = files.map(file => ({
        type: file.type.includes('image') ? 'image' : 'document',
        url: URL.createObjectURL(file),
        name: file.name
      }));
    }
    
    // Add message to current session
    const updatedSession = {
      ...currentSession,
      lastMessage: messageInput || 'Sent an attachment',
      updatedAt: new Date(),
      messages: [...currentSession.messages, newMessage]
    };
    
    // Update sessions
    setChatSessions(prev => 
      prev.map(session => session.id === currentSession.id ? updatedSession : session)
    );
    
    setCurrentSession(updatedSession);
    setMessageInput('');
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Simulate assistant response
    setTimeout(() => {
      const assistantResponse: ChatMessage = {
        id: `${currentSession.id}-${Date.now() + 1}`,
        role: 'assistant',
        content: `I've processed your request regarding "${messageInput.substring(0, 20)}${messageInput.length > 20 ? '...' : ''}". How can I further assist you?`,
        timestamp: new Date()
      };
      
      const finalUpdatedSession = {
        ...updatedSession,
        lastMessage: assistantResponse.content,
        updatedAt: new Date(),
        messages: [...updatedSession.messages, assistantResponse]
      };
      
      setChatSessions(prev => 
        prev.map(session => session.id === currentSession.id ? finalUpdatedSession : session)
      );
      
      setCurrentSession(finalUpdatedSession);
      setIsLoading(false);
    }, 1500);
  };
  
  // Delete a chat session
  const deleteChat = (chatId: string) => {
    setChatSessions(prev => prev.filter(chat => chat.id !== chatId));
    
    if (currentSession?.id === chatId) {
      if (chatSessions.length > 1) {
        const nextChat = chatSessions.find(chat => chat.id !== chatId);
        if (nextChat) {
          navigate(`/chat-assistant/${nextChat.id}`);
        }
      } else {
        navigate('/chat-assistant');
      }
    }
    
    toast({
      title: "Chat deleted",
      description: "The chat has been removed from your history"
    });
  };
  
  // Start editing chat title
  const startEditingTitle = (chatId: string, currentTitle: string) => {
    setEditingChatId(chatId);
    setEditingTitle(currentTitle);
  };
  
  // Save edited chat title
  const saveEditedTitle = (chatId: string) => {
    if (editingTitle.trim()) {
      setChatSessions(prev => 
        prev.map(chat => 
          chat.id === chatId ? {...chat, title: editingTitle.trim()} : chat
        )
      );
      
      if (currentSession?.id === chatId) {
        setCurrentSession(prev => prev ? {...prev, title: editingTitle.trim()} : null);
      }
    }
    
    setEditingChatId(null);
    setEditingTitle('');
  };
  
  // Cancel editing chat title
  const cancelEditingTitle = () => {
    setEditingChatId(null);
    setEditingTitle('');
  };
  
  // Handle file upload button click
  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  // Format timestamp
  const formatTime = (date: Date) => {
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();
    
    if (isYesterday) {
      return `Yesterday, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Chat List */}
        <div className="w-full md:w-72 lg:w-80 border-r flex flex-col overflow-hidden">
          <div className="p-4 border-b">
            <Button 
              onClick={createNewChat}
              className="w-full flex items-center justify-center mb-4 bg-accent-primary hover:bg-accent-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Chat
            </Button>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search chats..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            {filteredChatSessions.length > 0 ? (
              <div className="p-2">
                {filteredChatSessions.map((chat) => (
                  <div 
                    key={chat.id}
                    className={`flex items-start p-3 mb-1 rounded-lg transition-colors cursor-pointer group ${
                      currentSession?.id === chat.id 
                        ? 'bg-accent text-accent-foreground' 
                        : 'hover:bg-muted/60'
                    }`}
                  >
                    <Link 
                      to={`/chat-assistant/${chat.id}`}
                      className="flex items-start flex-1 min-w-0"
                    >
                      <div className="mr-3 mt-0.5">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg" alt="AI" />
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        {editingChatId === chat.id ? (
                          <div className="flex items-center mb-1">
                            <Input
                              value={editingTitle}
                              onChange={(e) => setEditingTitle(e.target.value)}
                              autoFocus
                              className="h-7 text-sm"
                            />
                            <div className="flex ml-2">
                              <Button 
                                size="sm" 
                                variant="ghost"
                                className="h-7 w-7 p-0" 
                                onClick={() => saveEditedTitle(chat.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                className="h-7 w-7 p-0" 
                                onClick={cancelEditingTitle}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium text-sm line-clamp-1">{chat.title}</h3>
                            <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button 
                                size="sm" 
                                variant="ghost"
                                className="h-6 w-6 p-0" 
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  startEditingTitle(chat.id, chat.title);
                                }}
                              >
                                <Edit2 className="h-3 w-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                className="h-6 w-6 p-0 text-destructive" 
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  deleteChat(chat.id);
                                }}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <p className="text-xs line-clamp-1 text-muted-foreground">{chat.lastMessage}</p>
                          <span className="text-[10px] text-muted-foreground">
                            {formatTime(chat.updatedAt)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : searchQuery ? (
              <div className="p-6 text-center">
                <p className="text-sm text-muted-foreground">No chats matching "{searchQuery}"</p>
                <Button variant="ghost" className="mt-2" onClick={() => setSearchQuery('')}>
                  Clear search
                </Button>
              </div>
            ) : (
              <div className="p-6 text-center">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="font-medium mb-1">No chats yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start a new conversation with the AI assistant
                </p>
                <Button onClick={createNewChat}>Start chatting</Button>
              </div>
            )}
          </ScrollArea>
          
          <div className="p-4 border-t">
            <Button variant="outline" className="w-full" asChild>
              <Link to="/explore-apps" className="flex items-center justify-center">
                <Settings className="mr-2 h-4 w-4" />
                Explore Apps
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {currentSession ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="font-medium truncate">{currentSession.title}</h2>
              </div>
              
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="max-w-3xl mx-auto">
                  {currentSession.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-6 ${message.role === 'user' ? 'ml-auto mr-0' : 'ml-0 mr-auto'} max-w-[85%]`}
                    >
                      <div className="flex items-start">
                        {message.role === 'assistant' && (
                          <div className="mr-4">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg" alt="AI" />
                              <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                          </div>
                        )}
                        
                        <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                          <div
                            className={`inline-block p-4 rounded-lg ${
                              message.role === 'user'
                                ? 'bg-accent-primary/90 text-accent-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            {/* Attachments */}
                            {message.attachments?.map((attachment, index) => (
                              <div key={index} className="mb-3">
                                {attachment.type === 'image' ? (
                                  <div className="rounded-md overflow-hidden mb-2">
                                    <img
                                      src={attachment.url}
                                      alt={attachment.name}
                                      className="max-w-full h-auto max-h-72"
                                    />
                                  </div>
                                ) : (
                                  <div className="flex items-center p-2 bg-background rounded border mb-2">
                                    <div className="w-8 h-8 rounded bg-muted flex items-center justify-center mr-2">
                                      <UploadCloud className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <span className="text-sm truncate">{attachment.name}</span>
                                  </div>
                                )}
                              </div>
                            ))}
                            
                            {/* Message content */}
                            <div className={`text-left whitespace-pre-wrap ${message.role === 'user' ? 'text-white' : ''}`}>
                              {message.content}
                            </div>
                          </div>
                          
                          <div className="mt-1">
                            <span className="text-xs text-muted-foreground">
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                        </div>
                        
                        {message.role === 'user' && (
                          <div className="ml-4">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg" alt="User" />
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                  
                  {isLoading && (
                    <div className="flex items-center mb-6">
                      <Avatar className="h-8 w-8 mr-4">
                        <AvatarImage src="/placeholder.svg" alt="AI" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div className="bg-muted p-4 rounded-lg">
                        <div className="flex space-x-2">
                          <div className="h-2 w-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="h-2 w-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="h-2 w-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              {/* Input Area */}
              <div className="p-4 border-t bg-card">
                <div className="max-w-3xl mx-auto">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendMessage();
                    }}
                    className="flex flex-col space-y-2"
                  >
                    <Textarea
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Type your message..."
                      className="min-h-[80px] resize-none"
                    />
                    
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/*,.pdf,.doc,.docx,.txt,.csv,.xlsx"
                          onChange={() => {}} // Just to satisfy React controlled input requirements
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleFileButtonClick}
                        >
                          <UploadCloud className="h-4 w-4 mr-2" />
                          Attach
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Image className="h-4 w-4 mr-2" />
                          Image
                        </Button>
                      </div>
                      
                      <Button
                        type="submit"
                        disabled={isLoading || (!messageInput.trim() && !fileInputRef.current?.files?.length)}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md px-6">
                <MessageSquareText className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Welcome to Chat Assistant</h2>
                <p className="text-muted-foreground mb-6">
                  Start a conversation with our AI assistant to get help with your tasks, answer questions, or explore creative ideas.
                </p>
                <Button onClick={createNewChat} className="bg-accent-primary hover:bg-accent-primary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Start New Chat
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
