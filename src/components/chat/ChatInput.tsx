
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, FileText, Image, Trash2 } from 'lucide-react';

interface ChatInputProps {
  activeChat: number | null;
  inputValue: string;
  setInputValue: (value: string) => void;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  isProcessing: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  handleFileUpload: (type: 'image' | 'document') => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  activeChat,
  inputValue,
  setInputValue,
  selectedFile,
  setSelectedFile,
  isProcessing,
  handleSubmit,
  handleKeyDown,
  handleFileUpload
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  
  if (!activeChat) return null;
  
  return (
    <form onSubmit={handleSubmit} className="border-t py-4">
      <div className="flex gap-2">
        <div className="flex space-x-1">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt"
            className="hidden"
          />
          <input
            type="file"
            ref={imageInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={() => handleFileUpload('document')}
          >
            <FileText className="h-5 w-5" />
            <span className="sr-only">Upload document</span>
          </Button>
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={() => handleFileUpload('image')}
          >
            <Image className="h-5 w-5" />
            <span className="sr-only">Upload image</span>
          </Button>
        </div>
        
        <div className="flex-1 relative">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="pr-12"
            disabled={isProcessing}
          />
          {selectedFile && (
            <div className="absolute left-1 top-[-30px] bg-accent text-accent-foreground rounded-l rounded-t-md px-2 py-1 text-xs flex items-center">
              <span className="truncate max-w-[150px]">{selectedFile.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => setSelectedFile(null)}
              >
                <Trash2 className="h-3 w-3" />
                <span className="sr-only">Remove file</span>
              </Button>
            </div>
          )}
        </div>
        
        <Button 
          type="submit" 
          size="icon" 
          className="rounded-full" 
          disabled={(!inputValue.trim() && !selectedFile) || isProcessing}
        >
          <Send className="h-5 w-5" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
