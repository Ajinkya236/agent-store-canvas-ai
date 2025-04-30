
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { Plus } from 'lucide-react';
import { ChatItem, ChatMessage } from '@/types/chat';

interface ChatMessagesProps {
  activeChat: number | null;
  chatHistory: ChatItem[];
  createNewChat: () => void;
  setInputValue: (value: string) => void;
  formatTime: (date: Date) => string;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  activeChat,
  chatHistory,
  createNewChat,
  setInputValue,
  formatTime,
  messagesEndRef
}) => {
  const activeMessages = activeChat 
    ? chatHistory.find(chat => chat.id === activeChat)?.messages || [] 
    : [];
  
  if (!activeChat) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome to AI Assistant</h1>
        <p className="text-muted-foreground max-w-md mb-6">
          Your personal AI-powered assistant for writing, coding, learning, and problem-solving.
        </p>
        <Button onClick={createNewChat}>
          <Plus className="mr-2 h-4 w-4" />
          Start a new chat
        </Button>
      </div>
    );
  }
  
  if (activeMessages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h2 className="text-xl font-semibold mb-2">Start a conversation</h2>
        <p className="text-muted-foreground mb-4 max-w-md">
          Ask me anything and I'll do my best to help you.
        </p>
        <div className="grid grid-cols-2 gap-2 max-w-md">
          <Button 
            variant="outline" 
            onClick={() => setInputValue("Help me write a professional email")} 
            className="text-left justify-start h-auto py-3"
          >
            Help me write a professional email
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setInputValue("Explain quantum computing")} 
            className="text-left justify-start h-auto py-3"
          >
            Explain quantum computing
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setInputValue("How do I improve my JavaScript skills?")} 
            className="text-left justify-start h-auto py-3"
          >
            How do I improve my JavaScript skills?
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setInputValue("Create a workout plan for me")} 
            className="text-left justify-start h-auto py-3"
          >
            Create a workout plan for me
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {activeMessages.map((message) => (
        <MessageBubble key={message.id} message={message} formatTime={formatTime} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

interface MessageBubbleProps {
  message: ChatMessage;
  formatTime: (date: Date) => string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, formatTime }) => {
  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] rounded-lg p-4 ${message.isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
        {/* Message content */}
        <div className="whitespace-pre-wrap mb-1">{message.content}</div>
        
        {/* Attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-3 space-y-2">
            {message.attachments.map((attachment, index) => (
              <div key={index}>
                {attachment.type === 'image' ? (
                  <div className="mt-2">
                    <img 
                      src={attachment.content} 
                      alt={attachment.name}
                      className="max-w-full rounded"
                    />
                    <div className="text-xs mt-1 opacity-70">{attachment.name}</div>
                  </div>
                ) : attachment.type === 'code' ? (
                  <div className="mt-2 rounded bg-muted-foreground/10 p-3 text-sm">
                    <div className="text-xs font-medium mb-1 text-foreground/70">{attachment.name}</div>
                    <pre className="whitespace-pre-wrap break-all"><code>{attachment.content}</code></pre>
                  </div>
                ) : (
                  <div className="flex items-center p-2 rounded bg-background/80">
                    <FileText className="h-4 w-4 mr-2" />
                    <span className="text-sm">{attachment.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Timestamp */}
        <div className={`text-xs ${message.isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'} text-right mt-1`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;
