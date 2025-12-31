
import React from 'react';
import { Printer, Shirt, Image as ImageIcon, Layers, PenTool, Maximize2, Target } from 'lucide-react';
import { ServiceItem } from '../types';
import { ASSETS } from '../constants/images';

export const Services: React.FC = () => {
  const services: ServiceItem[] = [
    {
      id: 'large-format',
      title: 'Large Format',
      description: 'Industrial-grade billboards, roll-up banners, and architectural signage. Museum-quality resolution at massive scales.',
      icon: Maximize2,
      image: ASSETS.services.largeFormat
    },
    {
      id: 'dtf',
      title: 'DTF Printing',
      description: 'Premium Direct-to-Film tech for vibrant, durable apparel branding. Superior stretch and wash resistance for high-end fashion.',
      icon: Layers,
      image: ASSETS.services.dtf
    },
    {
      id: 'custom-apparel',
      title: 'Apparel Branding',
      description: 'Beyond basic shirts. We offer full-stack embroidery, heat press, and screen printing for corporate and streetwear labels.',
      icon: Shirt,
      image: ASSETS.services.apparel
    },
    {
      id: 'branding',
      title: 'Design & Identity',
      description: 'Strategic visual branding. We craft logos and comprehensive brand manuals that define market leaders.',
      icon: PenTool,
      image: ASSETS.services.branding
    },
    {
      id: 'digital',
      title: 'Digital Print',
      description: 'Ultra-fast turnaround for business cards, brochures, and luxury marketing collateral with premium finishing.',
      icon: Printer,
      image: ASSETS.services.digital
    }
  ];

  return (
    <section id="services" className="py-32 bg-eko-dark relative overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
        <h2 className="text-[25vw] font-black font-heading leading-none">SERVICES</h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
          <div className="max-w-3xl">
            <span className="text-eko-secondary font-black tracking-[0.5em] uppercase mb-6 text-xs block">Technical Excellence</span>
            <h2 className="text-5xl md:text-8xl font-black font-heading text-white leading-[0.9] tracking-tighter">
              BEYOND <span className="text-eko-primary italic font-light">BASIC</span> PRINT.
            </h2>
          </div>
          <p className="text-gray-500 max-w-md text-base leading-relaxed border-l-2 border-white/10 pl-8">
            Leveraging state-of-the-art Japanese plotters and Swiss ink technology to deliver physical media that speaks louder than digital pixels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div 
              key={service.id} 
              className={`group relative h-[500px] bg-eko-surface border border-white/5 hover:border-eko-primary transition-all duration-700 overflow-hidden ${idx === 0 || idx === 1 ? 'md:col-span-1 lg:col-span-1 border-white/20' : ''}`}
            >
              {/* Background Image Container */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover opacity-10 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-40 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-eko-dark via-eko-dark/80 to-transparent"></div>
              </div>

              <div className="relative z-10 h-full p-10 flex flex-col">
                <div className="w-16 h-16 bg-white/5 backdrop-blur-md flex items-center justify-center mb-8 border border-white/10 group-hover:bg-eko-primary group-hover:border-eko-primary transition-all duration-500">
                  <service.icon className="w-8 h-8 text-eko-primary group-hover:text-eko-dark" />
                </div>
                
                <h4 className="text-3xl font-black font-heading text-white mb-6 uppercase tracking-tighter leading-none group-hover:text-eko-primary transition-colors">
                  {service.title.split(' ').map((word, i) => (
                    <React.Fragment key={i}>
                      {word}<br />
                    </React.Fragment>
                  ))}
                </h4>
                
                <p className="text-gray-400 leading-relaxed text-sm mb-auto opacity-70 group-hover:opacity-100 transition-opacity">
                  {service.description}
                </p>
                
                <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
                  <a href="#contact" className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-colors">
                    Inquire Project
                  </a>
                  <span className="w-8 h-[1px] bg-white/10 group-hover:w-16 group-hover:bg-eko-primary transition-all"></span>
                </div>
              </div>
              
              {/* Accent corner */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
          
          {/* Custom CTA Card */}
          <div className="relative h-[500px] bg-gradient-to-br from-eko-primary/10 to-eko-secondary/10 border border-white/5 flex flex-col items-center justify-center p-12 text-center group cursor-pointer hover:border-white/20 transition-all">
             <div className="mb-8 p-6 rounded-full bg-white/5 border border-white/10 animate-float">
                {/* Fixed: Use capitalized Target and import it from lucide-react */}
                <Target className="w-10 h-10 text-white" />
             </div>
             <h4 className="text-2xl font-black font-heading text-white mb-4 uppercase tracking-tighter">Your Vision,<br />Our Craft.</h4>
             <p className="text-gray-400 text-sm mb-10">Have a unique request? We love pushing the limits of what's possible in print.</p>
             <a href="#contact" className="px-8 py-3 bg-white text-eko-dark font-black text-[10px] uppercase tracking-widest hover:bg-eko-primary transition-colors">
                Start Consultation
             </a>
          </div>
        </div>
      </div>
    </section>
  );
};
