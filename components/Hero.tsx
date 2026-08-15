import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { ASSETS } from '../constants/images';

const heroFrames = [
  {
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&auto=format&fit=crop',
    alt: 'Large Format Printing',
    rotate: 'rotate-[8deg]',
    size: 'w-56 h-72 md:w-64 md:h-80',
    pos: 'top-16 right-4 md:top-12 md:right-8',
    z: 'z-30',
  },
  {
    src: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=600&auto=format&fit=crop',
    alt: 'T-Shirt Printing',
    rotate: '-rotate-[6deg]',
    size: 'w-48 h-64 md:w-56 md:h-72',
    pos: 'top-40 right-36 md:top-36 md:right-52',
    z: 'z-20',
  },
  {
    src: 'https://images.unsplash.com/photo-1604644401890-0bd678c83788?q=80&w=600&auto=format&fit=crop',
    alt: 'Embroidery Work',
    rotate: 'rotate-[14deg]',
    size: 'w-44 h-56 md:w-52 md:h-64',
    pos: 'bottom-32 right-12 md:bottom-28 md:right-20',
    z: 'z-10',
  },
  {
    src: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=600&auto=format&fit=crop',
    alt: 'Brand Design',
    rotate: '-rotate-[10deg]',
    size: 'w-40 h-52 md:w-48 md:h-60',
    pos: 'bottom-16 right-48 md:bottom-12 md:right-64',
    z: 'z-[5]',
  },
];

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <img
          src={ASSETS.hero.background}
          alt="Eko Prints Studio"
          className="w-full h-full object-cover"
          onError={e => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2400&auto=format&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06090F]/95 via-[#06090F]/75 to-[#06090F]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06090F] via-transparent to-transparent" />
      </div>

      {/* Floating photo frames — desktop only */}
      <div className="hidden lg:block absolute inset-0 z-10 pointer-events-none">
        {heroFrames.map((frame, i) => (
          <div
            key={i}
            className={`absolute ${frame.pos} ${frame.size} ${frame.rotate} ${frame.z} rounded-md overflow-hidden border-[3px] border-white/80 shadow-[0_8px_40px_rgba(0,0,0,0.5)] transition-transform duration-700 hover:scale-105 pointer-events-auto`}
          >
            <img
              src={frame.src}
              alt={frame.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 pb-20 pt-32 w-full">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-eko-primary text-xs font-semibold uppercase tracking-widest mb-6">
            <span className="w-5 h-px bg-eko-primary" />
            Large Format · DTF · Embroidery · Apparel
          </span>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-6">
            We Design,<br />
            Print &amp;<br />
            <span className="text-eko-primary">Brand.</span>
          </h1>

          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-10 max-w-md">
            Precision printing and branding solutions from our fully equipped studio — banners, uniforms, signage, merchandise and more.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => scrollTo('#services')}
              className="inline-flex items-center justify-center gap-2 bg-eko-primary text-[#06090F] px-7 py-3.5 text-sm font-bold hover:bg-white transition-colors"
            >
              Our Services <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollTo('#contact')}
              className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-white border border-white/20 hover:border-white/50 hover:bg-white/5 transition-colors"
            >
              Get a Quote
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-sm">
          {[
            { v: '500+', l: 'Brands Served' },
            { v: '10+', l: 'Years Experience' },
            { v: '24hr', l: 'Turnaround' },
          ].map(s => (
            <div key={s.l}>
              <div className="text-xl font-bold text-white">{s.v}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => scrollTo('#services')}
        className="absolute bottom-6 right-8 z-20 flex flex-col items-center gap-1 text-gray-500 hover:text-white transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
};
