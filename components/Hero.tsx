import React from 'react';
import { ArrowRight, Zap, Target } from 'lucide-react';
import { ASSETS } from '../constants/images';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[90vh] md:h-screen flex items-center justify-center overflow-hidden bg-eko-dark pt-20">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={ASSETS.hero.background} 
          alt="Modern Printing Studio" 
          className="w-full h-full object-cover transition-opacity duration-1000 scale-105"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1610410065449-3351d0879482?q=80&w=2400&auto=format&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-eko-dark/90 via-eko-dark/60 to-eko-dark"></div>
        
        {/* Animated Accent Blobs */}
        <div className="absolute top-1/4 -left-20 w-[40rem] h-[40rem] bg-eko-primary/10 rounded-full blur-[160px] animate-pulse-slow"></div>
        <div className="absolute -bottom-20 -right-20 w-[40rem] h-[40rem] bg-eko-secondary/10 rounded-full blur-[160px] animate-pulse-slow delay-700"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-5xl">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-eko-primary text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-10 animate-fade-in backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-eko-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-eko-primary"></span>
            </span>
            Next-Gen Print Tech: DTF & Large Format
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-black font-heading tracking-tighter text-white mb-8 leading-[0.8]">
            <span className="inline-block hover:text-eko-primary transition-colors duration-300">INDUSTRIAL</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-eko-primary via-eko-secondary to-eko-accent animate-gradient">PRECISION</span><br />
            <span className="text-white drop-shadow-2xl">PRINTING.</span>
          </h1>
          
          <p className="mt-10 text-lg md:text-2xl text-gray-400 font-light max-w-2xl leading-relaxed border-l-4 border-eko-primary pl-8 backdrop-blur-sm">
            Elevate your brand with Eko Prints. Specializing in high-fidelity <span className="text-white font-medium">Large Format Printing</span>, <span className="text-white font-medium">DTF Apparel</span>, and bespoke brand identity systems.
          </p>
          
          <div className="mt-14 flex flex-col sm:flex-row gap-5">
            <a 
              href="#services"
              className="group relative inline-flex items-center justify-center px-10 py-5 text-xs font-black uppercase tracking-[0.3em] text-eko-dark transition-all duration-300 bg-white hover:bg-eko-primary shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-eko-primary/20"
            >
              Explore Services
              <ArrowRight className="ml-4 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </a>
            <a 
              href="#contact"
              className="group inline-flex items-center justify-center px-10 py-5 text-xs font-black uppercase tracking-[0.3em] text-white transition-all duration-300 bg-transparent border-2 border-white/10 hover:border-eko-secondary hover:bg-eko-secondary/5"
            >
              Get A Quote
              <Target className="ml-4 w-5 h-5 group-hover:rotate-45 transition-transform" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative vertical lines */}
      <div className="absolute right-12 bottom-0 h-64 w-px bg-gradient-to-t from-white/20 to-transparent hidden lg:block"></div>
      <div className="absolute right-16 bottom-0 h-48 w-px bg-gradient-to-t from-white/10 to-transparent hidden lg:block"></div>
    </section>
  );
};