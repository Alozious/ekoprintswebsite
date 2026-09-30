import React from 'react';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { openWhatsApp } from '../services/whatsapp';
import { trackPhoneCall } from '../services/analytics';

interface FooterProps {
  onOpenQuote?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuote }) => {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-white border-t border-gray-100 pt-12 sm:pt-16 pb-8 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-gray-100">
          
          {/* Col 1: Brand info (approx 3.5 cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <div 
              className="cursor-pointer mb-4 inline-block select-none"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img
                src="/assets/logos/eko_prints.png"
                alt="eko PRINTS"
                className="h-11 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent && !parent.querySelector('.brand-fallback')) {
                    const span = document.createElement('div');
                    span.className = 'brand-fallback text-2xl font-black text-blue-700 font-heading';
                    span.innerHTML = `eko <span class="text-pink-600">PRINTS</span>`;
                    parent.appendChild(span);
                  }
                }}
              />
            </div>
            
            <p className="text-xs text-gray-500 leading-relaxed mb-6 max-w-xs">
              Bringing ideas to life through quality printing, branding, and supplies in Masaka City.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm"
              >
                <span className="font-bold text-xs">f</span>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm text-xs font-bold"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* WhatsApp */}
              <button
                onClick={() => openWhatsApp({ source: 'footer_social' })}
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links (2.5 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold tracking-wider uppercase text-gray-900 mb-4">
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-500 font-medium">
              <li>
                <a href="#home" onClick={(e) => scrollTo(e, 'home')} className="hover:text-pink-600 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => scrollTo(e, 'about')} className="hover:text-pink-600 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#location" onClick={(e) => scrollTo(e, 'location')} className="hover:text-pink-600 transition-colors">
                  Location
                </a>
              </li>
              <li>
                <a href="#gallery" onClick={(e) => scrollTo(e, 'gallery')} className="hover:text-pink-600 transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className="hover:text-pink-600 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Our Services (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-gray-900 mb-4">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-500 font-medium">
              <li>
                <a href="#large-format-printing" onClick={(e) => scrollTo(e, 'large-format-printing')} className="hover:text-pink-600 transition-colors">
                  Large Format Printing
                </a>
              </li>
              <li>
                <a href="#branding" onClick={(e) => scrollTo(e, 'branding')} className="hover:text-pink-600 transition-colors">
                  Branding &amp; Identity
                </a>
              </li>
              <li>
                <a href="#digital-printing" onClick={(e) => scrollTo(e, 'digital-printing')} className="hover:text-pink-600 transition-colors">
                  Digital Printing
                </a>
              </li>
              <li>
                <a href="#custom-merchandise" onClick={(e) => scrollTo(e, 'custom-merchandise')} className="hover:text-pink-600 transition-colors">
                  Custom Merchandise
                </a>
              </li>
              <li>
                <a href="#supplies" onClick={(e) => scrollTo(e, 'supplies')} className="hover:text-pink-600 transition-colors">
                  Printing Supplies
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Location (3.5 cols) */}
          <div id="location" className="lg:col-span-3 scroll-mt-24">
            <h4 className="text-xs font-bold tracking-wider uppercase text-gray-900 mb-4">
              LOCATION &amp; CONTACT
            </h4>
            <ul className="space-y-3 text-xs text-gray-600 mb-5 font-medium">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">
                  City View Complex, Masaka City, Room L3-194
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-pink-600 flex-shrink-0" />
                <a 
                  href="tel:+256703580516" 
                  onClick={() => trackPhoneCall('footer_contact_info')}
                  className="font-bold text-gray-900 hover:text-pink-600 transition-colors"
                >
                  +256 703 580 516
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <a href="mailto:info@ekoprints.com" className="hover:text-pink-600 transition-colors">
                  info@ekoprints.com
                </a>
              </li>
            </ul>

            <div className="flex flex-wrap gap-2.5">
              <a
                href="tel:+256703580516"
                onClick={() => trackPhoneCall('footer_call_now_button')}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-gray-900 bg-gray-100 hover:bg-gray-200 border border-gray-200 flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-pink-600" />
                Call Now
              </a>

              <button
                onClick={() => onOpenQuote ? onOpenQuote() : scrollTo({ preventDefault: () => {} } as any, 'contact')}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-white uppercase tracking-wider bg-gradient-to-r from-blue-700 via-indigo-600 to-pink-500 hover:from-blue-800 hover:to-pink-600 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                GET A QUOTE
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-2">
          <div>
            © {new Date().getFullYear()} <span className="font-bold text-gray-700">EKO PRINTS</span>. All Rights Reserved.
          </div>
          <div className="flex items-center gap-1">
            Designed with <Heart className="w-3 h-3 text-red-500 fill-current inline" /> by Eko Prints
            <span className="mx-1 text-gray-300">|</span>
            <a href="#admin" className="hover:text-pink-600">Admin</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
