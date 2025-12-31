import React from 'react';
import { Award, Zap, Shield, Globe } from 'lucide-react';
import { ASSETS } from '../constants/images';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-40 bg-[#04080F] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="relative group">
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src={ASSETS.about.main} 
                alt="Production Hub" 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100"
              />
            </div>
            {/* Minimal floating stats */}
            <div className="absolute -bottom-8 -left-8 bg-eko-primary p-12 shadow-2xl">
              <div className="text-7xl font-black font-heading text-eko-dark tracking-tighter">10+</div>
              <div className="text-[10px] font-black text-eko-dark uppercase tracking-[0.3em] mt-2 border-t border-eko-dark/20 pt-2">Years of Excellence</div>
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h2 className="text-eko-primary font-bold tracking-[0.4em] uppercase mb-6 text-sm">The Heritage</h2>
              <h3 className="text-5xl md:text-7xl font-black font-heading text-white mb-10 leading-[0.95]">Crafting Physical Legacies.</h3>
              <p className="text-gray-400 text-xl font-light leading-relaxed">
                Eko Prints stands at the intersection of high-end digital design and industrial production. We don't just print; we manufacture brand authority through physical media.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-eko-primary/10 group-hover:border-eko-primary transition-all">
                    <Award className="w-6 h-6 text-eko-primary" />
                  </div>
                  <span className="font-bold uppercase tracking-widest text-xs text-white">Elite Quality</span>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-eko-primary/10 group-hover:border-eko-primary transition-all">
                    <Zap className="w-6 h-6 text-eko-primary" />
                  </div>
                  <span className="font-bold uppercase tracking-widest text-xs text-white">Rapid Cycles</span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-eko-primary/10 group-hover:border-eko-primary transition-all">
                    <Shield className="w-6 h-6 text-eko-primary" />
                  </div>
                  <span className="font-bold uppercase tracking-widest text-xs text-white">Guaranteed Durability</span>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-eko-primary/10 group-hover:border-eko-primary transition-all">
                    <Globe className="w-6 h-6 text-eko-primary" />
                  </div>
                  <span className="font-bold uppercase tracking-widest text-xs text-white">Sustainable Tech</span>
                </div>
              </div>
            </div>

            <a 
              href="#contact"
              className="inline-block px-12 py-5 bg-white text-eko-dark font-black uppercase tracking-[0.2em] text-xs hover:bg-eko-primary transition-all"
            >
              Collaborate With Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};