import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setServicesOpen(false);
    setAboutOpen(false);
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-sm' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img
              src="assets/logos/EKO PRINTS.png"
              alt="Eko Prints"
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Center Nav — Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#home" onClick={e => scrollTo(e, '#home')} className="text-gray-700 hover:text-eko-primary text-sm font-medium transition-colors">
              Home
            </a>

            {/* About Us dropdown */}
            <div className="relative" onMouseEnter={() => setAboutOpen(true)} onMouseLeave={() => setAboutOpen(false)}>
              <button className="flex items-center gap-1 text-gray-700 hover:text-eko-primary text-sm font-medium transition-colors">
                About Us <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {aboutOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="bg-white border border-gray-100 shadow-lg rounded-md py-2 min-w-[180px]">
                    <a href="#about" onClick={e => scrollTo(e, '#about')} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-eko-primary">Our Story</a>
                    <a href="#machines" onClick={e => scrollTo(e, '#machines')} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-eko-primary">Our Machines</a>
                    <a href="#portfolio" onClick={e => scrollTo(e, '#portfolio')} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-eko-primary">Our Work</a>
                  </div>
                </div>
              )}
            </div>

            {/* Services dropdown */}
            <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <button className="flex items-center gap-1 text-gray-700 hover:text-eko-primary text-sm font-medium transition-colors">
                Services <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="bg-white border border-gray-100 shadow-lg rounded-md py-2 min-w-[200px]">
                    <a href="#services" onClick={e => scrollTo(e, '#services')} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-eko-primary">All Services</a>
                    <a href="#services" onClick={e => scrollTo(e, '#services')} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-eko-primary">Large Format Printing</a>
                    <a href="#services" onClick={e => scrollTo(e, '#services')} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-eko-primary">DTF Printing</a>
                    <a href="#services" onClick={e => scrollTo(e, '#services')} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-eko-primary">Embroidery</a>
                    <a href="#services" onClick={e => scrollTo(e, '#services')} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-eko-primary">T-Shirt Printing</a>
                    <a href="#services" onClick={e => scrollTo(e, '#services')} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-eko-primary">Design & Branding</a>
                  </div>
                </div>
              )}
            </div>

            <a href="#contact" onClick={e => scrollTo(e, '#contact')} className="text-gray-700 hover:text-eko-primary text-sm font-medium transition-colors">
              Contact Us
            </a>

            <a href="#contact" onClick={e => scrollTo(e, '#contact')} className="text-eko-primary hover:text-eko-primary/80 text-sm font-medium transition-colors">
              Profile
            </a>
          </nav>

          {/* Right — Phone */}
          <div className="hidden lg:flex items-center gap-2 text-sm">
            <div className="text-right">
              <span className="text-gray-400 text-xs block leading-tight">For Inquiries:</span>
              <a href="tel:+256703580516" className="text-gray-800 font-semibold flex items-center gap-1.5 hover:text-eko-primary transition-colors">
                <Phone className="w-3.5 h-3.5" />
                +256 703 580 516
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="px-6 py-6 flex flex-col gap-4">
            <a href="#home" onClick={e => scrollTo(e, '#home')} className="text-gray-700 font-medium">Home</a>
            <a href="#about" onClick={e => scrollTo(e, '#about')} className="text-gray-700 font-medium">About Us</a>
            <a href="#machines" onClick={e => scrollTo(e, '#machines')} className="text-gray-700 font-medium pl-4 text-sm text-gray-500">Our Machines</a>
            <a href="#portfolio" onClick={e => scrollTo(e, '#portfolio')} className="text-gray-700 font-medium pl-4 text-sm text-gray-500">Our Work</a>
            <a href="#services" onClick={e => scrollTo(e, '#services')} className="text-gray-700 font-medium">Services</a>
            <a href="#contact" onClick={e => scrollTo(e, '#contact')} className="text-gray-700 font-medium">Contact Us</a>
            <a href="#contact" onClick={e => scrollTo(e, '#contact')} className="text-eko-primary font-medium">Profile</a>
            <div className="pt-4 border-t border-gray-100">
              <span className="text-gray-400 text-xs">For Inquiries:</span>
              <a href="tel:+256703580516" className="flex items-center gap-2 text-gray-800 font-semibold mt-1">
                <Phone className="w-4 h-4" /> +256 703 580 516
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
