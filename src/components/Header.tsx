
import React, { useState } from 'react';
import { Menu, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ModeToggle';
import { useIsMobile } from '@/hooks/use-mobile';
import GlobalSearch from '@/components/GlobalSearch';
import RegisterAgentModal from '@/components/RegisterAgentModal';
import BrandLogo from '@/components/header/BrandLogo';
import MainNavigation from '@/components/header/MainNavigation';
import NotificationsButton from '@/components/header/NotificationsButton';
import ProfileDropdown from '@/components/header/ProfileDropdown';
import MobileMenu from '@/components/header/MobileMenu';

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
          
          <BrandLogo />
        </div>
        
        {!isMobile && (
          <div className="hidden md:block flex-1 mx-10">
            <GlobalSearch />
          </div>
        )}
        
        <div className="flex items-center gap-2 md:gap-4">
          {!isMobile && <MainNavigation />}
          
          {!isMobile && <NotificationsButton />}
          
          <ModeToggle />
          
          <ProfileDropdown userData={user} />
          
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
      <MobileMenu 
        isOpen={isMobile && mobileMenuOpen}
        onClose={toggleMobileMenu}
        onRegisterClick={() => setRegisterModalOpen(true)}
      />
      
      {/* Register Agent Modal */}
      <RegisterAgentModal
        open={registerModalOpen}
        onOpenChange={setRegisterModalOpen}
      />
    </header>
  );
};

export default Header;
