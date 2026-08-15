import React from 'react';
import { Camera, Printer, FileText, Shirt, Monitor, Package } from 'lucide-react';
import { ASSETS } from '../constants/images';

interface ServicesProps {
  onOpenQuote?: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenQuote }) => {
  const serviceCards = [
    {
      id: 'branding',
      anchorId: 'branding',
      icon: Camera,
      badgeColor: 'bg-purple-600',
      image: ASSETS.services.branding,
      title: 'Branding & Identity',
      description: 'Logos, Business Cards, Letterheads, and more.',
    },
    {
      id: 'large-format',
      anchorId: 'large-format-printing',
      icon: Printer,
      badgeColor: 'bg-purple-700',
      image: ASSETS.services.largeFormat,
      title: 'Large Format Printing',
      description: 'Banners, Posters, Roll-ups, Billboards and more.',
    },
    {
      id: 'marketing',
      anchorId: 'digital-printing',
      icon: FileText,
      badgeColor: 'bg-pink-600',
      image: ASSETS.services.marketing,
      title: 'Marketing & Digital Printing',
      description: 'Flyers, Brochures, Catalogs, Stickers.',
    },
    {
      id: 'merchandise',
      anchorId: 'custom-merchandise',
      icon: Shirt,
      badgeColor: 'bg-indigo-600',
      image: ASSETS.services.merchandise,
      title: 'Custom Merchandise',
      description: 'Branded T-shirts, Mugs, Caps and more.',
    },
    {
      id: 'design',
      anchorId: 'design-services',
      icon: Monitor,
      badgeColor: 'bg-rose-600',
      image: ASSETS.services.design,
      title: 'Design Services',
      description: 'Creative designs that communicate your brand.',
    },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex flex-col items-center">
            <span className="w-8 h-[2.5px] bg-pink-600 rounded-full mb-2" />
            <span className="text-xs font-bold uppercase tracking-widest text-pink-600">
              WHAT WE DO
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 font-heading tracking-tight">
            Our Printing Services
          </h2>
        </div>

        {/* 5 Services Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-14">
          {serviceCards.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                id={svc.anchorId}
                className="bg-white rounded-xl border border-gray-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1 scroll-mt-24"
              >
                {/* Top image with badge */}
                <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden flex items-center justify-center p-3">
                  {/* Floating category badge icon */}
                  <div className={`absolute top-3 left-3 z-10 w-7 h-7 rounded-full ${svc.badgeColor} text-white flex items-center justify-center shadow-md`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug group-hover:text-pink-600 transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {svc.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Supplies Callout & Center CTA Button */}
        <div id="supplies" className="scroll-mt-24 text-center flex flex-col items-center">
          <button
            onClick={() => scrollTo('contact')}
            className="px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 hover:from-purple-800 hover:to-pink-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            VIEW ALL SERVICES
          </button>
        </div>

      </div>
    </section>
  );
};
