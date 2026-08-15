import React from 'react';
import { ASSETS } from '../constants/images';

export const Portfolio: React.FC = () => {
  const work = ASSETS.portfolio;

  return (
    <section id="portfolio" className="py-24 bg-[#06090F]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-eko-primary text-xs font-semibold uppercase tracking-widest">Our Work</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">Selected Projects</h2>
          </div>
          <p className="text-gray-500 text-sm max-w-xs md:text-right">
            Real work, real clients. Add your own photos to <code>assets/work/</code>
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
          {/* Item 0 — tall, spans 2 rows */}
          <div className="row-span-2 relative overflow-hidden group bg-[#0A0F1A]">
            <img
              src={work[0].url}
              alt={work[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
              style={{ minHeight: '400px' }}
              onError={e => { e.currentTarget.style.background = '#0A0F1A'; e.currentTarget.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform opacity-0 group-hover:opacity-100">
              <span className="text-eko-primary text-[10px] font-bold uppercase tracking-widest block mb-1">{work[0].category}</span>
              <p className="text-white text-sm font-semibold">{work[0].title}</p>
            </div>
          </div>

          {/* Items 1–4 — normal cells */}
          {work.slice(1, 5).map(item => (
            <div key={item.id} className="relative overflow-hidden group bg-[#0A0F1A]" style={{ aspectRatio: '4/3' }}>
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                onError={e => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform opacity-0 group-hover:opacity-100">
                <span className="text-eko-primary text-[10px] font-bold uppercase tracking-widest block mb-0.5">{item.category}</span>
                <p className="text-white text-sm font-semibold">{item.title}</p>
              </div>
            </div>
          ))}

          {/* Item 5 — wide, spans 2 columns */}
          <div className="col-span-2 md:col-span-1 relative overflow-hidden group bg-[#0A0F1A]" style={{ aspectRatio: '4/3' }}>
            <img
              src={work[5].url}
              alt={work[5].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
              onError={e => { e.currentTarget.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform opacity-0 group-hover:opacity-100">
              <span className="text-eko-primary text-[10px] font-bold uppercase tracking-widest block mb-0.5">{work[5].category}</span>
              <p className="text-white text-sm font-semibold">{work[5].title}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/30 px-6 py-3 transition-colors"
          >
            Start your project →
          </a>
        </div>
      </div>
    </section>
  );
};
