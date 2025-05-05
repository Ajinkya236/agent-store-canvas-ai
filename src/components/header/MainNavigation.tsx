
import React from 'react';
import { Link } from 'react-router-dom';

const MainNavigation: React.FC = () => {
  return (
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
  );
};

export default MainNavigation;
