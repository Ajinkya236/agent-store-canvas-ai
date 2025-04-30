
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Bot, Edit2, Plus, Star, Trash2 } from 'lucide-react';
import { ChatItem, GPTApp } from '@/types/chat';

interface ChatSidebarProps {
  chatHistory: ChatItem[];
  activeChat: number | null;
  gptApps: GPTApp[];
  editingChatId: number | null;
  editingTitle: string;
  createNewChat: () => void;
  setActiveChat: (id: number) => void;
  toggleChatFavorite: (id: number) => void;
  startEditingChat: (id: number, title: string) => void;
  setEditingTitle: (title: string) => void;
  saveEditedChat: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  deleteChat: (id: number) => void;
  openAppDetails: (id: number) => void;
  formatDate: (date: Date) => string;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chatHistory,
  activeChat,
  gptApps,
  editingChatId,
  editingTitle,
  createNewChat,
  setActiveChat,
  toggleChatFavorite,
  startEditingChat,
  setEditingTitle,
  saveEditedChat,
  handleKeyDown,
  deleteChat,
  openAppDetails,
  formatDate
}) => {
  return (
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
                    {chatHistory.length === 0 ? (
                      <div className="py-4 px-2 text-center text-muted-foreground text-sm">
                        No chats yet. Click "New Chat" to get started.
                      </div>
                    ) : chatHistory.map(chat => (
                      <SidebarMenuItem key={chat.id}>
                        {editingChatId === chat.id ? (
                          <div className="flex w-full items-center px-2 py-1">
                            <Input 
                              value={editingTitle} 
                              onChange={e => setEditingTitle(e.target.value)} 
                              onBlur={saveEditedChat} 
                              onKeyDown={handleKeyDown} 
                              className="h-8 text-sm" 
                              autoFocus 
                            />
                          </div>
                        ) : (
                          <div className="flex w-full">
                            <SidebarMenuButton 
                              onClick={() => setActiveChat(chat.id)} 
                              isActive={activeChat === chat.id} 
                              className="flex flex-col items-start flex-grow"
                            >
                              <div className="flex items-center w-full">
                                {chat.isFavorite && (
                                  <Star className="h-3.5 w-3.5 text-yellow-500 mr-1 flex-shrink-0" />
                                )}
                                <span className="text-sm truncate w-full text-left font-medium text-foreground">
                                  {chat.title}
                                </span>
                              </div>
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
                                <DropdownMenuItem onClick={() => toggleChatFavorite(chat.id)}>
                                  <Star className="mr-2 h-4 w-4" />
                                  {chat.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                                </DropdownMenuItem>
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
          </TabsContent>
          
          <TabsContent value="favorites" className="mt-0">
            <ScrollArea className="h-[calc(100vh-13rem)]">
              <div className="p-4 space-y-4">
                {gptApps.filter(app => app.isFavorite).length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <p>No favorite apps yet.</p>
                    <p className="text-sm mt-1">
                      Explore apps and mark them as favorites to see them here.
                    </p>
                  </div>
                ) : gptApps.filter(app => app.isFavorite).map(app => (
                  <Card 
                    key={app.id} 
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => openAppDetails(app.id)}
                  >
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                        <img src={app.image} alt={app.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{app.name}</h3>
                        <p className="text-xs text-muted-foreground truncate">{app.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </SidebarContent>
    </Sidebar>
  );
};

export default ChatSidebar;
