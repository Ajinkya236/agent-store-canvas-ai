
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotificationsButton: React.FC = () => {
  return (
    <Button variant="ghost" size="icon" className="relative">
      <Bell className="h-5 w-5" />
      <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-accent-primary"></span>
      <span className="sr-only">Notifications</span>
    </Button>
  );
};

export default NotificationsButton;
