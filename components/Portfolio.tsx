import React from 'react';
import { ASSETS } from '../constants/images';

export const Portfolio: React.FC = () => {
  const portfolioItems = ASSETS.portfolio;

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-gray-900 font-heading">
            OUR <span className="text-pink-600">WORK</span> SPEAKS FOR ITSELF
          </h2>
        </div>

        {/* 5-Column Gallery Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 aspect-[4/3] bg-gray-100 cursor-pointer"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-pink-400 mb-0.5">
                  {item.category}
                </span>
                <p className="text-xs font-semibold leading-tight">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
