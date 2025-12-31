import React from 'react';
import { Award, Zap, Shield, Globe, Ruler, Layers } from 'lucide-react';
import { ASSETS } from '../constants/images';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-40 bg-eko-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-40 items-center">
          
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-sm border border-white/10 relative group">
              <img 
                src={ASSETS.about.main} 
                alt="Eko Prints Production" 
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-eko-primary/5 group-hover:opacity-0 transition-opacity"></div>
            </div>
            
            {/* Stat Overlay */}
            <div className="absolute -bottom-10 -right-10 md:-bottom-20 md:-right-20 bg-eko-surface p-10 md:p-16 border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] z-20">
              <div className="flex items-baseline gap-2">
                <span className="text-8xl font-black font-heading text-eko-primary tracking-tighter">10</span>
                <span className="text-2xl font-bold text-white tracking-tighter">+</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mt-4 border-t border-white/5 pt-4">Years of Production Excellence</p>
            </div>
            
            {/* Background Shape */}
            <div className="absolute -top-10 -left-10 w-full h-full border-2 border-eko-secondary/20 -z-10 translate-x-4 translate-y-4"></div>
          </div>

          <div className="space-y-12">
            <div>
              <span className="text-eko-secondary font-black tracking-[0.5em] uppercase text-xs mb-6 block">The Manufacturer</span>
              <h3 className="text-5xl md:text-8xl font-black font-heading text-white mb-10 leading-[0.85] tracking-tighter">
                WE DEFINE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">QUALITY.</span>
              </h3>
              <p className="text-gray-400 text-xl font-light leading-relaxed max-w-xl">
                Eko Prints isn't just a shop; it's a high-precision manufacturing hub for visual communication. We specialize in converting digital concepts into tactile masterpieces.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-10">
              {[
                { icon: Ruler, label: 'Large Format Expert', color: 'text-eko-primary' },
                { icon: Layers, label: 'DTF Specialist', color: 'text-eko-secondary' },
                { icon: Shield, label: 'Industrial Grade', color: 'text-white' },
                { icon: Zap, label: '24Hr Turnaround', color: 'text-eko-accent' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 group">
                  <div className={`p-4 rounded-lg bg-white/5 border border-white/10 group-hover:border-eko-primary transition-all`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <span className="font-bold text-[10px] uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="pt-10 flex flex-col sm:flex-row gap-6">
              <a 
                href="#portfolio"
                className="inline-flex items-center justify-center px-10 py-5 bg-white text-eko-dark font-black uppercase tracking-widest text-xs hover:bg-eko-primary transition-all shadow-xl shadow-white/5"
              >
                View Our Work
              </a>
              <div className="flex items-center gap-4 text-xs font-bold text-gray-500 italic">
                <span className="w-10 h-px bg-white/10"></span>
                Trusted by 500+ Local Brands
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};