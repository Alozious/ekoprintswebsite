import React, { useState } from 'react';
import { Menu, X, Printer } from 'lucide-react';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const [logoError, setLogoError] = useState(false);
  
  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-eko-dark/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center gap-3 cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {!logoError ? (
              <img 
                src="assets/logo.png" 
                alt="Eko Prints Logo" 
                className="h-10 w-auto object-contain transition-transform group-hover:scale-110"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="w-10 h-10 bg-eko-primary flex items-center justify-center rounded-lg shadow-[0_0_20px_rgba(0,209,255,0.4)]">
                <Printer className="w-6 h-6 text-eko-dark" />
              </div>
            )}
            <span className="font-black text-2xl tracking-tighter text-white group-hover:text-eko-primary transition-colors">
              EKO<span className="text-eko-primary">PRINTS</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-gray-400 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.3em] relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-eko-primary transition-all group-hover:w-full"></span>
              </a>
            ))}
            <a 
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="bg-white text-eko-dark px-8 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-eko-primary transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Quote
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-eko-primary focus:outline-none transition-colors"
            >
              {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={`md:hidden fixed inset-0 top-24 bg-eko-dark transition-all duration-500 z-40 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-x-full'}`}>
        <div className="flex flex-col p-8 space-y-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-3xl font-black font-heading text-white hover:text-eko-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="w-full bg-eko-primary text-eko-dark py-6 text-center font-black uppercase tracking-widest text-sm"
          >
            Start A Project
          </a>
        </div>
      </div>
    </header>
  );
};