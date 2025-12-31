import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Printer } from 'lucide-react';

export const Footer: React.FC = () => {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="bg-eko-dark py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 items-start">
          
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-8">
              {!logoError ? (
                <img 
                  src="assets/logo.png" 
                  alt="Eko Prints Logo" 
                  className="h-10 w-auto object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-10 h-10 bg-eko-primary/10 border border-eko-primary/20 flex items-center justify-center rounded-lg">
                  <Printer className="w-6 h-6 text-eko-primary" />
                </div>
              )}
              <span className="font-black text-2xl tracking-tighter text-white">
                EKO<span className="text-eko-primary">PRINTS</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs mx-auto md:mx-0 leading-relaxed uppercase tracking-widest font-bold text-[10px]">
              Premium physical media solutions for brands that demand excellence. Based in Level 3, Room L3-194.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Connect With Us</h4>
            <div className="flex gap-8">
               <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-gray-400 hover:text-eko-primary hover:border-eko-primary hover:bg-eko-primary/5 transition-all"><Facebook className="w-5 h-5" /></a>
               <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-gray-400 hover:text-eko-secondary hover:border-eko-secondary hover:bg-eko-secondary/5 transition-all"><Instagram className="w-5 h-5" /></a>
               <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-gray-400 hover:text-eko-accent hover:border-eko-accent hover:bg-eko-accent/5 transition-all"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          <div className="text-center md:text-right flex flex-col justify-between h-full">
            <div className="mb-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 mb-4">Operations</h4>
              <p className="text-white font-bold text-xs">Mon - Sat: 9:00 AM - 7:00 PM</p>
            </div>
            <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">© {new Date().getFullYear()} EKO PRINTS STUDIO. ALL RIGHTS RESERVED.</p>
          </div>
          
        </div>
      </div>
    </footer>
  );
};