import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ModeToggle';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import GlobalSearch from '@/components/GlobalSearch';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, Bell, Plus, LogOut, User, Hexagon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RegisterAgentModal from '@/components/RegisterAgentModal';

// Conditionally import Clerk to prevent build errors if not configured
let useUser;
try {
  const clerk = require('@clerk/clerk-react');
  useUser = clerk.useUser;
} catch (error) {
  console.log("Clerk not available or properly configured");
  // Provide mock functionality if Clerk is not available
  useUser = () => ({ isSignedIn: true, user: { firstName: "Demo", lastName: "User", emailAddresses: [{ emailAddress: "demo@example.com" }] } });
}

const Header: React.FC = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  
  // Conditionally use Clerk's hooks
  let isSignedIn = true; // Changed to true by default
  let user = { 
    firstName: "Demo", 
    lastName: "User", 
    emailAddresses: [{ emailAddress: "demo@example.com" }] 
  };
  
  try {
    const userResult = useUser();
    isSignedIn = userResult.isSignedIn;
    user = userResult.user || user;
  } catch (error) {
    console.log("Error using Clerk user data", error);
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-background border-b sticky top-0 z-40">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}
          
          <Link to="/" className="flex items-center gap-2">
            <div className="text-accent-primary">
              <Hexagon className="h-8 w-8 fill-accent-primary/20 stroke-accent-primary" />
            </div>
            <span className="font-archivo-black text-xl md:text-2xl bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              NexusAI
            </span>
          </Link>
        </div>
        
        {!isMobile && (
          <div className="hidden md:block flex-1 mx-10">
            <GlobalSearch />
          </div>
        )}
        
        <div className="flex items-center gap-2 md:gap-4">
          {!isMobile && (
            <>
              <Link to="/browse" className="text-sm font-medium hover:underline underline-offset-4 hidden md:inline-block">
                Browse Agents
              </Link>
              <Link to="/my-agents" className="text-sm font-medium hover:underline underline-offset-4 hidden md:inline-block">
                My Agents
              </Link>
              <Link to="/chat-assistant" className="text-sm font-medium hover:underline underline-offset-4 hidden md:inline-block">
                Chat Assistant
              </Link>
              <Link to="/docs" className="text-sm font-medium hover:underline underline-offset-4 hidden md:inline-block">
                Docs
              </Link>
            </>
          )}
          
          {!isMobile && (
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-accent-primary"></span>
              <span className="sr-only">Notifications</span>
            </Button>
          )}
          
          <ModeToggle />
          
          {/* Always display a profile dropdown instead of sign-in buttons */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 rounded-full p-0 data-[state=open]:bg-muted">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>
                    {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.emailAddresses?.[0]?.emailAddress}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard">
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/builder">
                  Agent Builder
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/saved-agents">
                  Saved Agents
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <a href="/sign-out" className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            onClick={() => setRegisterModalOpen(true)} 
            size="sm" 
            className="hidden sm:block bg-accent-primary hover:bg-accent-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Register Agent
          </Button>
        </div>
      </div>
      
      {/* Mobile search bar */}
      {isMobile && (
        <div className="px-4 py-2 border-t">
          <GlobalSearch />
        </div>
      )}
      
      {/* Mobile menu dropdown */}
      {isMobile && mobileMenuOpen && (
        <div className="md:hidden px-4 py-4 border-t animate-slide-in-from-bottom">
          <nav className="flex flex-col space-y-4">
            <Link to="/browse" className="text-sm font-medium py-2 px-4 rounded-md hover:bg-muted" onClick={toggleMobileMenu}>
              Browse Agents
            </Link>
            <Link to="/my-agents" className="text-sm font-medium py-2 px-4 rounded-md hover:bg-muted" onClick={toggleMobileMenu}>
              My Agents
            </Link>
            <Link to="/chat-assistant" className="text-sm font-medium py-2 px-4 rounded-md hover:bg-muted" onClick={toggleMobileMenu}>
              Chat Assistant
            </Link>
            <Link to="/docs" className="text-sm font-medium py-2 px-4 rounded-md hover:bg-muted" onClick={toggleMobileMenu}>
              Docs
            </Link>
            <Button 
              onClick={() => {
                setRegisterModalOpen(true);
                toggleMobileMenu();
              }} 
              className="text-sm font-medium py-2 px-4 rounded-md bg-accent-primary text-white"
            >
              Register Agent
            </Button>
          </nav>
        </div>
      )}
      
      {/* Register Agent Modal */}
      <RegisterAgentModal
        open={registerModalOpen}
        onOpenChange={setRegisterModalOpen}
      />
    </header>
  );
};

export default Header;
