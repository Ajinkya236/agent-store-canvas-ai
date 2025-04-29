
import React, { useState } from "react";
import Header from "@/components/Header";
import DocsSidebar from "@/components/documentation/DocsSidebar";
import DocContent from "@/components/documentation/DocContent";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Documentation = () => {
  const [activeSection, setActiveSection] = useState("Agent Store");
  const [activeItem, setActiveItem] = useState("agent-store-overview");
  const isMobile = useIsMobile();

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    
    // Set the first item of the section as active
    switch (section) {
      case "Agent Store":
        setActiveItem("agent-store-overview");
        break;
      case "Chat Assistant":
        setActiveItem("chat-assistant-overview");
        break;
      case "AI App Store":
        setActiveItem("ai-app-store-overview");
        break;
      case "Agent Creation":
        setActiveItem("agent-creation-overview");
        break;
      default:
        setActiveItem("agent-store-overview");
    }
  };

  const handleItemChange = (section: string, item: string) => {
    setActiveSection(section);
    setActiveItem(item);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Mobile Sidebar with Sheet */}
        {isMobile && (
          <div className="border-b p-4 flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="mr-4">
                  <Menu className="h-4 w-4 mr-2" />
                  Navigation
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[280px]">
                <DocsSidebar 
                  activeSection={activeSection}
                  activeItem={activeItem}
                  onSectionChange={handleSectionChange}
                  onItemChange={handleItemChange}
                />
              </SheetContent>
            </Sheet>
            <h2 className="font-archivo-black">Documentation</h2>
          </div>
        )}
        
        {/* Desktop Sidebar */}
        {!isMobile && (
          <DocsSidebar 
            activeSection={activeSection}
            activeItem={activeItem}
            onSectionChange={handleSectionChange}
            onItemChange={handleItemChange}
          />
        )}
        
        {/* Content Area */}
        <ScrollArea className="flex-1 h-[calc(100vh-4rem)]">
          <DocContent section={activeSection} item={activeItem} />
        </ScrollArea>
      </div>
    </div>
  );
};

export default Documentation;
