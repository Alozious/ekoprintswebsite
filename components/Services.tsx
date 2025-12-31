import React from 'react';
import { Printer, Shirt, Image as ImageIcon, Layers, PenTool } from 'lucide-react';
import { ServiceItem } from '../types';
import { ASSETS } from '../constants/images';

export const Services: React.FC = () => {
  const services: ServiceItem[] = [
    {
      id: 'large-format',
      title: 'Large Format Printing',
      description: 'Banners, billboards, and high-impact signage. We use industrial plotters to deliver museum-quality results at scale.',
      icon: Printer,
      image: ASSETS.services.largeFormat
    },
    {
      id: 'dtf',
      title: 'DTF Printing',
      description: 'Cutting-edge Direct to Film technology for ultra-vibrant, stretch-resistant apparel branding that lasts years.',
      icon: Layers,
      image: ASSETS.services.dtf
    },
    {
      id: 'custom-apparel',
      title: 'T-Shirt Customization',
      description: 'From premium corporate polos to hype-worthy streetwear. We specialize in luxury fabric printing and finishing.',
      icon: Shirt,
      image: ASSETS.services.apparel
    },
    {
      id: 'digital',
      title: 'Digital Printing',
      description: 'High-speed production for marketing collateral. Business cards, flyers, and brochures with premium paper stocks.',
      icon: ImageIcon,
      image: ASSETS.services.digital
    },
    {
      id: 'branding',
      title: 'Design & Branding',
      description: 'Complete visual identity systems. Our studio crafts logos and brand guidelines that resonate and command attention.',
      icon: PenTool,
      image: ASSETS.services.branding
    }
  ];

  return (
    <section id="services" className="py-32 bg-eko-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24">
          <div className="max-w-2xl">
            <h2 className="text-eko-primary font-bold tracking-[0.4em] uppercase mb-6 text-sm">Our Capabilities</h2>
            <h3 className="text-5xl md:text-7xl font-black font-heading text-white leading-[0.9]">Premier Solutions.</h3>
          </div>
          <div className="mt-8 md:mt-0 text-gray-500 max-w-xs text-sm border-l-2 border-white/5 pl-8 italic">
            Engineered for high-volume, high-fidelity production using the world's most advanced printing hardware.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group relative h-[450px] bg-eko-surface border border-white/5 hover:border-eko-primary/30 transition-all duration-700 overflow-hidden"
            >
              {/* Background Image Container */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-40 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-eko-dark via-eko-dark/80 to-transparent"></div>
              </div>

              <div className="relative z-10 h-full p-10 flex flex-col justify-end">
                <div className="w-14 h-14 bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:bg-eko-primary transition-all duration-500">
                  <service.icon className="w-7 h-7 text-eko-primary group-hover:text-eko-dark" />
                </div>
                
                <h4 className="text-2xl font-black font-heading text-white mb-4 uppercase tracking-tighter group-hover:text-eko-primary transition-colors">
                  {service.title}
                </h4>
                <p className="text-gray-400 leading-relaxed text-sm mb-8 opacity-80">
                  {service.description}
                </p>
                
                <a href="#contact" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-colors">
                  Secure Quote <span className="ml-3 transition-transform group-hover:translate-x-2">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};