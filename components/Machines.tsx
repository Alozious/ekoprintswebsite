import React from 'react';
import { ASSETS } from '../constants/images';

export const Machines: React.FC = () => {
  return (
    <section id="machines" className="py-24 bg-[#030507]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-eko-primary text-xs font-semibold uppercase tracking-widest">Our Equipment</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">Built to Produce.</h2>
          </div>
          <p className="text-gray-500 text-sm max-w-sm md:text-right">
            Industrial-grade machines for every print need — from micro apparel to large-scale signage.
          </p>
        </div>

        {/* Large feature card + grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {/* Feature machine — full height left */}
          <div className="relative overflow-hidden group" style={{ minHeight: '480px' }}>
            <img
              src={ASSETS.machines[0].url}
              alt={ASSETS.machines[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              onError={e => { e.currentTarget.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <span className="text-eko-primary text-xs font-semibold uppercase tracking-widest block mb-2">Featured Machine</span>
              <h3 className="text-white text-2xl font-bold mb-1">{ASSETS.machines[0].title}</h3>
              <p className="text-gray-400 text-sm max-w-xs">{ASSETS.machines[0].description}</p>
            </div>
          </div>

          {/* Right side: 3 smaller machines */}
          <div className="grid grid-rows-3 gap-1">
            {ASSETS.machines.slice(1).map(machine => (
              <div key={machine.id} className="relative overflow-hidden group" style={{ minHeight: '152px' }}>
                <img
                  src={machine.url}
                  alt={machine.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h4 className="text-white font-semibold text-sm">{machine.title}</h4>
                  <p className="text-gray-400 text-xs mt-0.5 max-w-xs hidden group-hover:block transition-all">{machine.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-600">
          Add your own machine photos to <code className="text-gray-500">assets/machines/</code> — see <code className="text-gray-500">assets/README.md</code> for instructions.
        </p>
      </div>
    </section>
  );
};
