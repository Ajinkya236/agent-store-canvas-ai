
export interface ChatItem {
  id: number;
  title: string;
  date: Date;
  messages: ChatMessage[];
  isFavorite?: boolean;
}

export interface ChatMessage {
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

export interface GPTApp {
  id: number;
  name: string;
  description: string;
  creator: string;
  category: string;
  image: string;
  isFavorite: boolean;
  rating?: number;
  conversations?: number;
  starters?: string[];
  capabilities?: string[];
}
