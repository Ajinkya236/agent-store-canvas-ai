
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ModeToggle';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Conditionally import Clerk to prevent build errors if not configured
let ClerkProvider, useUser;
try {
  const clerk = require('@clerk/clerk-react');
  useUser = clerk.useUser;
} catch (error) {
  console.log("Clerk not available or properly configured");
  // Provide mock functionality if Clerk is not available
  useUser = () => ({ isSignedIn: false, user: null });
}

const Header: React.FC = () => {
  // Conditionally use Clerk's hooks
  let isSignedIn = false;
  let user = null;
  
  try {
    const userResult = useUser();
    isSignedIn = userResult.isSignedIn;
    user = userResult.user;
  } catch (error) {
    console.log("Error using Clerk user data", error);
  }

  return (
    <header className="bg-background border-b">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="font-archivo-black text-2xl">
          Enterprise AI
        </Link>
        
        <nav className="flex items-center space-x-4">
          <Link to="/browse" className="text-sm font-medium hover:underline underline-offset-4">
            Browse
          </Link>
          <Link to="/community" className="text-sm font-medium hover:underline underline-offset-4">
            Community
          </Link>
          <Link to="/docs" className="text-sm font-medium hover:underline underline-offset-4">
            Docs
          </Link>
          <Link to="/pricing" className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </Link>
          
          <ModeToggle />
          
          {isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 data-[state=open]:bg-muted">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.imageUrl} alt={user?.firstName} />
                    <AvatarFallback>{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</AvatarFallback>
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
                  <a href="/sign-out">
                    Sign Out
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/sign-in">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
