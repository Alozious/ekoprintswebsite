import React from 'react';
import { ASSETS } from '../constants/images';

export const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-eko-secondary font-bold tracking-widest uppercase mb-2">Portfolio</h2>
            <h3 className="text-4xl md:text-5xl font-black font-heading text-white">Selected Works</h3>
          </div>
          <button className="hidden md:block px-6 py-2 bg-white text-black font-bold hover:bg-eko-primary transition-colors uppercase text-xs tracking-widest">
            View All Projects
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[300px]">
          {ASSETS.portfolio.map((item, index) => (
             <div 
              key={item.id}
              className={`relative group overflow-hidden bg-zinc-900 cursor-pointer ${
                index === 2 ? 'md:col-span-2 md:row-span-1' : ''
              } ${index === 0 ? 'md:row-span-2' : ''}`}
            >
              <img 
                src={item.url} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-eko-primary text-xs font-bold uppercase tracking-wider mb-1 block">{item.category}</span>
                  <h4 className="text-white text-xl font-bold">{item.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
            <button className="px-6 py-3 bg-white text-black font-bold w-full uppercase text-xs tracking-widest">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};