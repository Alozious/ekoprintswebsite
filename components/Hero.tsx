import React from 'react';
import { ArrowRight, Sparkles, Truck, DollarSign, MessageCircle } from 'lucide-react';
import { ASSETS } from '../constants/images';
import { openWhatsApp } from '../services/whatsapp';
import { pushDataLayer } from '../services/analytics';

interface HeroProps {
  onOpenQuote?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote }) => {
  const scrollTo = (id: string) => {
    pushDataLayer('navigation_click', { target_section: id, location: 'hero' });
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHeroWhatsApp = () => {
    openWhatsApp({
      source: 'hero_cta',
    });
  };

  return (
    <section id="home" className="relative pt-24 pb-16 lg:pt-28 lg:pb-20 bg-[#070B19] overflow-hidden text-white">
      {/* Background Accent Gradients & Halftone Dots */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      
      {/* Decorative dot matrix pattern on top right */}
      <div 
        className="absolute top-4 right-4 w-72 h-72 opacity-20 pointer-events-none hidden md:block" 
        style={{
          backgroundImage: 'radial-gradient(#ec4899 1.5px, transparent 1.5px)',
          backgroundSize: '16px 16px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Tagline */}
            <div className="mb-4">
              <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-gray-300">
                WELCOME TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-pink-500 font-extrabold">EKO PRINTS</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6">
              Bring Your Ideas<br />
              To <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-amber-400">Life</span>
            </h1>

            {/* Paragraph */}
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 max-w-lg font-normal">
              We deliver high-quality, creative and affordable printing solutions that make your brand stand out.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-12">
              <button
                onClick={handleHeroWhatsApp}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20ba59] shadow-lg shadow-green-600/30 hover:shadow-green-600/50 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                title="Chat on WhatsApp with Eko Prints Masaka"
              >
                <MessageCircle className="w-4 h-4" /> CHAT ON WHATSAPP
              </button>

              <button
                onClick={() => scrollTo('services')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 shadow-lg shadow-pink-600/30 hover:shadow-pink-600/50 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                OUR SERVICES <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white border border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                CONTACT US
              </button>
            </div>

            {/* Feature Badges Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 border-t border-white/10">
              
              {/* Badge 1: High Quality */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full border border-pink-500/40 bg-pink-500/10 flex items-center justify-center flex-shrink-0 text-pink-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide">High Quality</h4>
                  <p className="text-[11px] text-gray-400 leading-tight mt-0.5">Premium materials &amp; printing.</p>
                </div>
              </div>

              {/* Badge 2: Fast Delivery */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full border border-pink-500/40 bg-pink-500/10 flex items-center justify-center flex-shrink-0 text-pink-400">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide">Fast Delivery</h4>
                  <p className="text-[11px] text-gray-400 leading-tight mt-0.5">On-time delivery you can count on.</p>
                </div>
              </div>

              {/* Badge 3: Affordable */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full border border-pink-500/40 bg-pink-500/10 flex items-center justify-center flex-shrink-0 text-pink-400">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide">Affordable</h4>
                  <p className="text-[11px] text-gray-400 leading-tight mt-0.5">Top quality within your budget.</p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Hero Visuals Mockup */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <img
                src={ASSETS.hero.composite}
                alt="Eko Prints Industrial Printing & Mockups"
                className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B19]/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
