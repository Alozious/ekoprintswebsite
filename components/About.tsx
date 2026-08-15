import React from 'react';
import { CheckCircle } from 'lucide-react';
import { ASSETS } from '../constants/images';

const highlights = [
  'Large Format up to 5m wide',
  'DTF on any fabric type',
  'Multi-head embroidery',
  'Same-day & rush orders',
  'In-house design team',
  'Supplies available for purchase',
];

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#06090F]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image side */}
          <div className="relative">
            <div className="overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <img
                src={ASSETS.about.main}
                alt="Eko Prints Studio"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                onError={e => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 md:bottom-6 md:right-6 bg-eko-primary px-6 py-4 shadow-xl">
              <div className="text-[#06090F] font-bold text-2xl leading-none">10+</div>
              <div className="text-[#06090F]/70 text-xs font-semibold mt-0.5">Years in business</div>
            </div>
          </div>

          {/* Text side */}
          <div>
            <span className="text-eko-primary text-xs font-semibold uppercase tracking-widest">About Eko Prints</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white mb-5 leading-snug">
              Your One-Stop<br />Print &amp; Brand Studio.
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              We're a fully equipped printing studio based in City View Complex, Masaka City. From the moment you walk in with an idea, we handle design, print, and delivery — all under one roof.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Whether you need a single t-shirt or a full outdoor campaign, our machines and team are ready to deliver.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {highlights.map(h => (
                <li key={h} className="flex items-center gap-2.5 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-eko-primary flex-shrink-0" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#machines"
                onClick={e => { e.preventDefault(); document.querySelector('#machines')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center justify-center px-6 py-3 bg-eko-primary text-[#06090F] text-sm font-bold hover:bg-white transition-colors"
              >
                See Our Equipment
              </a>
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center justify-center px-6 py-3 border border-white/15 text-white text-sm hover:border-white/40 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
