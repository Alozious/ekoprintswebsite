import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  onOpenQuote?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen, onOpenQuote }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 15);
      
      const sections = ['home', 'about', 'services', 'gallery', 'testimonials', 'contact'];
      const scrollPos = window.scrollY + 100;
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveNav(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setActiveNav(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const navItems = [
    { label: 'HOME', id: 'home' },
    { label: 'ABOUT US', id: 'about' },
    { label: 'SERVICES', id: 'services' },
    { label: 'GALLERY', id: 'gallery' },
    { label: 'TESTIMONIALS', id: 'testimonials' },
    { label: 'CONTACT US', id: 'contact' },
  ];

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-white py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src="/assets/logos/EKO PRINTS.png"
            alt="eko PRINTS"
            className="h-10 md:h-12 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent && !parent.querySelector('.brand-fallback')) {
                const span = document.createElement('div');
                span.className = 'brand-fallback flex flex-col items-start leading-none';
                span.innerHTML = `
                  <span class="text-2xl font-black tracking-tight text-blue-700 font-heading">
                    eko <span class="text-pink-600 font-extrabold">PRINTS</span>
                  </span>
                `;
                parent.appendChild(span);
              }
            }}
          />
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollTo(e, item.id)}
                className={`relative text-[13px] font-bold tracking-wider uppercase transition-colors duration-200 py-1 ${
                  isActive ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-pink-500 to-rose-500 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Actions: Call Button + Get a Quote */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+256703580516"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-gray-800 bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-all"
            title="Call +256 703 580 516"
          >
            <Phone className="w-3.5 h-3.5 text-pink-600" />
            <span>Call: +256 703 580 516</span>
          </a>

          <button
            onClick={() => onOpenQuote ? onOpenQuote() : scrollTo({ preventDefault: () => {} } as any, 'contact')}
            className="relative px-6 py-2.5 rounded-full text-xs font-bold text-white uppercase tracking-wider bg-gradient-to-r from-blue-700 via-indigo-600 to-pink-500 hover:from-blue-800 hover:to-pink-600 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            GET A QUOTE
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-800 p-2 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X className="w-6 h-6 text-pink-600" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl px-6 py-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollTo(e, item.id)}
                className={`text-sm font-bold tracking-wider uppercase py-2 border-b border-gray-50 ${
                  activeNav === item.id ? 'text-pink-600' : 'text-gray-700'
                }`}
              >
                {item.label}
              </a>
            ))}
            
            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href="tel:+256703580516"
                className="w-full py-3 rounded-full text-xs font-bold text-gray-800 bg-gray-100 hover:bg-gray-200 border border-gray-200 flex items-center justify-center gap-2 shadow-sm text-center"
              >
                <Phone className="w-4 h-4 text-pink-600" /> Call: +256 703 580 516
              </a>

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  if (onOpenQuote) onOpenQuote();
                  else scrollTo({ preventDefault: () => {} } as any, 'contact');
                }}
                className="w-full py-3 rounded-full text-xs font-bold text-white uppercase tracking-wider bg-gradient-to-r from-blue-700 via-indigo-600 to-pink-500 text-center shadow-md"
              >
                GET A QUOTE
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
