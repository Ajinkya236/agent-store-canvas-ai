
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, ChevronUp, Book, File, Code, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DocSectionProps {
  title: string;
  icon: React.ReactNode;
  items: { id: string; title: string }[];
  activeSection: string;
  activeItem: string;
  onSectionClick: (section: string) => void;
  onItemClick: (section: string, item: string) => void;
}

const DocSection: React.FC<DocSectionProps> = ({ 
  title, 
  icon, 
  items, 
  activeSection, 
  activeItem,
  onSectionClick,
  onItemClick
}) => {
  const isActive = activeSection === title;

  return (
    <div className="mb-2">
      <Button
        variant="ghost"
        className="w-full justify-between px-2 py-1.5 h-auto"
        onClick={() => onSectionClick(title)}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium">{title}</span>
        </div>
        {isActive ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </Button>
      
      {isActive && (
        <div className="ml-6 mt-1 space-y-1">
          {items.map(item => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-start px-2 py-1 h-auto text-sm font-normal",
                activeItem === item.id && "bg-accent text-accent-foreground"
              )}
              onClick={() => onItemClick(title, item.id)}
            >
              {item.title}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

interface DocsSidebarProps {
  activeSection: string;
  activeItem: string;
  onSectionChange: (section: string) => void;
  onItemChange: (section: string, item: string) => void;
}

const DocsSidebar: React.FC<DocsSidebarProps> = ({ 
  activeSection, 
  activeItem,
  onSectionChange,
  onItemChange
}) => {
  const sections = [
    {
      title: "Agent Store",
      icon: <Book size={18} />,
      items: [
        { id: "agent-store-overview", title: "Overview" },
        { id: "agent-store-features", title: "Key Features" },
        { id: "agent-store-usage", title: "Usage Guide" },
        { id: "agent-store-examples", title: "Examples" }
      ]
    },
    {
      title: "Chat Assistant",
      icon: <Code size={18} />,
      items: [
        { id: "chat-assistant-overview", title: "Overview" },
        { id: "chat-assistant-features", title: "Key Features" },
        { id: "chat-assistant-usage", title: "Usage Guide" },
        { id: "chat-assistant-examples", title: "Examples" }
      ]
    },
    {
      title: "AI App Store",
      icon: <File size={18} />,
      items: [
        { id: "ai-app-store-overview", title: "Overview" },
        { id: "ai-app-store-features", title: "Key Features" },
        { id: "ai-app-store-usage", title: "Usage Guide" },
        { id: "ai-app-store-examples", title: "Examples" }
      ]
    },
    {
      title: "Agent Creation",
      icon: <Play size={18} />,
      items: [
        { id: "agent-creation-overview", title: "Overview" },
        { id: "agent-creation-features", title: "Key Features" },
        { id: "agent-creation-usage", title: "Usage Guide" },
        { id: "agent-creation-examples", title: "Examples" }
      ]
    }
  ];

  return (
    <aside className="w-full md:w-64 shrink-0 border-r">
      <div className="p-4 border-b">
        <h2 className="font-archivo-black text-lg">Documentation</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-9rem)]">
        <div className="py-4 px-2">
          {sections.map(section => (
            <DocSection
              key={section.title}
              title={section.title}
              icon={section.icon}
              items={section.items}
              activeSection={activeSection}
              activeItem={activeItem}
              onSectionClick={onSectionChange}
              onItemClick={onItemChange}
            />
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default DocsSidebar;
