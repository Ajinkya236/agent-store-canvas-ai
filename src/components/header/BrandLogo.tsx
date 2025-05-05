
import React from 'react';
import { Link } from 'react-router-dom';
import { Hexagon } from 'lucide-react';

const BrandLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="text-accent-primary">
        <Hexagon className="h-8 w-8 fill-accent-primary/20 stroke-accent-primary" />
      </div>
      <span className="font-archivo-black text-xl md:text-2xl bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
        NexusAI
      </span>
    </Link>
  );
};

export default BrandLogo;
