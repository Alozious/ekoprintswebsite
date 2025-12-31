import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <img 
                src="assets/logo.png" 
                alt="Eko Prints Logo" 
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="font-bold text-xl tracking-tighter text-white">
                EKO<span className="text-eko-primary">PRINTS</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs">
              Premium printing solutions for brands that demand excellence.
            </p>
          </div>

          <div className="flex gap-6 mb-8 md:mb-0">
             <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
             <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
             <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Eko Prints. All rights reserved.</p>
          </div>
          
        </div>
      </div>
    </footer>
  );
};