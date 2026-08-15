import React, { useState } from 'react';
import { Printer, Instagram, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="bg-[#06090F] border-t border-white/5 py-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">

          <div>
            <div className="flex items-center gap-2 mb-3">
              {!logoError ? (
                <img src="assets/logo.png" alt="Eko Prints" className="h-7 w-auto" onError={() => setLogoError(true)} />
              ) : (
                <div className="w-7 h-7 bg-eko-primary/10 border border-eko-primary/20 flex items-center justify-center">
                  <Printer className="w-4 h-4 text-eko-primary" />
                </div>
              )}
              <span className="font-bold text-white">EKO<span className="text-eko-primary">PRINTS</span></span>
            </div>
            <p className="text-gray-600 text-xs max-w-xs leading-relaxed">
              Design. Print. Brand. — Level 3, Room L3-194
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-10">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Services</p>
              <ul className="space-y-1.5 text-sm text-gray-400">
                {['Large Format', 'DTF Printing', 'Embroidery', 'T-Shirt Printing', 'Design & Branding'].map(s => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Contact</p>
              <ul className="space-y-1.5 text-sm">
                <li><a href="tel:+256703580516" className="text-gray-400 hover:text-white transition-colors">0703 580 516</a></li>
                <li><a href="tel:+256792832056" className="text-gray-400 hover:text-white transition-colors">0792 832 056</a></li>
                <li className="text-gray-500 text-xs pt-1">Mon – Sat · 9am – 7pm</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4">
            <a href="#" className="w-9 h-9 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5">
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} Eko Prints Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
