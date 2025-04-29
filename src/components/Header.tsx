
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="pt-8 pb-6 px-6 sm:px-10 md:px-14 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-archivo-black tracking-tight text-center md:text-left animate-fade-in">
          Enterprise Agent Store
        </h1>
        <p className="text-muted-foreground mt-2 text-center md:text-left text-sm sm:text-base animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          Discover AI solutions to transform how your business works
        </p>
      </div>
    </header>
  );
};

export default Header;
