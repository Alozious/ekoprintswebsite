import React from 'react';
import { ArrowRight, Cpu } from 'lucide-react';
import { ASSETS } from '../constants/images';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-eko-dark">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={ASSETS.hero.background} 
          alt="Modern Printing Studio" 
          className="w-full h-full object-cover transition-opacity duration-1000"
          onError={(e) => {
            // Fallback if local asset is missing
            e.currentTarget.src = "https://images.unsplash.com/photo-1626785774573-4b7993143a2d?q=80&w=2400&auto=format&fit=crop";
          }}
        />
        {/* Adjusted gradient overlay for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-eko-dark/80 via-eko-dark/40 to-transparent"></div>
        
        {/* Animated Accent Blobs */}
        <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-eko-primary/10 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-eko-secondary/10 rounded-full blur-[140px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-eko-primary text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in backdrop-blur-sm">
            <Cpu className="w-4 h-4" /> High Tech Precision Printing
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-heading tracking-tighter text-white mb-6 leading-[0.85]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-eko-primary via-white to-eko-primary animate-gradient">PREMIER</span><br />
            <span className="text-white">PRINTING.</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-eko-secondary via-white to-eko-secondary animate-gradient">REDEFINED.</span>
          </h1>
          
          <p className="mt-8 text-xl md:text-2xl text-gray-300 font-light max-w-2xl leading-relaxed border-l-2 border-eko-primary pl-8">
            Eko Prints delivers world-class Large Format, DTF, and Brand Identity solutions. We blend industrial power with artisanal precision.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row gap-6">
            <a 
              href="#services"
              className="group relative inline-flex items-center justify-center px-12 py-5 text-sm font-black uppercase tracking-widest text-eko-dark transition-all duration-300 bg-eko-primary hover:bg-white shadow-[0_0_30px_rgba(0,209,255,0.2)]"
            >
              Our Solutions
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#contact"
              className="group inline-flex items-center justify-center px-12 py-5 text-sm font-black uppercase tracking-widest text-white transition-all duration-300 bg-transparent border border-white/20 hover:border-white hover:bg-white/5"
            >
              Start Project
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <div className="w-px h-16 bg-gradient-to-b from-eko-primary to-transparent"></div>
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Explore</span>
      </div>
    </section>
  );
};
