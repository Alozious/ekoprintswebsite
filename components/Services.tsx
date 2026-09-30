import React from 'react';
import { Files, Gift, Layers3, Maximize2, Palette, Printer } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ASSETS } from '../constants/images';
import { openWhatsApp } from '../services/whatsapp';

interface ServicesProps {
  onOpenQuote?: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenQuote }) => {
  const serviceRibbon = [
    { label: 'Digital Printing', icon: Printer, target: 'digital-printing' },
    { label: 'Large Format', icon: Maximize2, target: 'large-format-printing' },
    { label: 'Branding Products', icon: Palette, target: 'branding' },
    { label: 'A0 A1 A2 Printing', icon: Files, target: 'digital-printing' },
    { label: 'Promotional Items', icon: Gift, target: 'custom-merchandise' },
    { label: 'UV & DTF Printing', icon: Layers3, target: 'custom-merchandise' },
  ];

  const serviceCards = [
    {
      id: 'branding',
      anchorId: 'branding',
      image: ASSETS.services.branding,
      title: 'Branding & Identity',
      description: 'Logos, Business Cards, Letterheads, and more.',
      price: 'UGX 50,000',
    },
    {
      id: 'large-format',
      anchorId: 'large-format-printing',
      image: ASSETS.services.largeFormat,
      title: 'Large Format Printing',
      description: 'Banners, Posters, Roll-ups, Billboards and more.',
      price: 'UGX 25,000',
    },
    {
      id: 'marketing',
      anchorId: 'digital-printing',
      image: ASSETS.services.marketing,
      title: 'Marketing & Digital Printing',
      description: 'Flyers, Brochures, Catalogs, Stickers.',
      price: 'UGX 500',
    },
    {
      id: 'merchandise',
      anchorId: 'custom-merchandise',
      image: ASSETS.services.merchandise,
      title: 'Custom Merchandise',
      description: 'Branded T-shirts, Mugs, Caps and more.',
      price: 'UGX 20,000',
    },
    {
      id: 'design',
      anchorId: 'design-services',
      image: ASSETS.services.design,
      title: 'Design & Artwork',
      description: 'Creative designs that communicate your brand.',
      price: 'UGX 30,000',
    },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="pb-14 sm:pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="relative z-20 -translate-y-6 sm:-translate-y-1/2">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex gap-2 sm:gap-3 rounded-lg bg-white p-2 sm:p-3 shadow-[0_14px_40px_rgba(15,23,42,0.16)] border border-gray-100">
            {serviceRibbon.map(({ label, icon: Icon, target }) => (
              <button
                key={label}
                type="button"
                onClick={() => scrollTo(target)}
                className="group flex min-w-0 flex-1 items-center gap-2 sm:gap-3 rounded-md bg-gray-100 px-2.5 sm:px-4 py-3 sm:py-4 text-left text-gray-900 transition-colors hover:bg-gray-200"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-pink-600 shadow-sm ring-1 ring-gray-200 transition-colors group-hover:bg-pink-600 group-hover:text-white group-hover:ring-pink-600">
                  <Icon className="h-5 w-5 stroke-[2]" />
                </span>
                <span className="text-xs sm:text-sm font-semibold leading-tight">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* On phones these follow the hero image and service shortcuts. */}
        <div className="sm:hidden grid grid-cols-1 gap-5 -mt-1 mb-10 px-1 py-6 border-y border-gray-200">
          <div>
            <h3 className="text-sm font-bold text-gray-900">High Quality</h3>
            <p className="text-xs text-gray-500 leading-snug mt-1">Premium materials &amp; printing.</p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">Fast Delivery</h3>
            <p className="text-xs text-gray-500 leading-snug mt-1">On-time delivery you can count on.</p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">Affordable</h3>
            <p className="text-xs text-gray-500 leading-snug mt-1">Top quality within your budget.</p>
          </div>
        </div>
        
        {/* Section Header */}
        <div className="text-center mt-0 sm:mt-2 mb-10 sm:mb-16">
          <div className="inline-flex flex-col items-center">
            <span className="w-8 h-[2.5px] bg-pink-600 rounded-full mb-2" />
            <span className="text-xs font-bold uppercase tracking-widest text-pink-600">
              PRINTING &amp; BRANDING
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 font-heading tracking-tight">
            Shop
          </h2>
        </div>

        {/* 5 Services Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-14">
          {serviceCards.map((svc) => {
            return (
              <div
                key={svc.id}
                id={svc.anchorId}
                className="bg-white rounded-xl border border-gray-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1 scroll-mt-24"
              >
                {/* Service image */}
                <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden flex items-center justify-center p-3">
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
                    <p className="text-xs text-gray-500 leading-relaxed mb-4">
                      {svc.description}
                    </p>
                    <div className="mb-4">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">From</span>
                      <span className="text-lg font-extrabold text-pink-600">{svc.price}</span>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => openWhatsApp({ source: 'service_card', serviceName: svc.title })}
                      className="text-[11px] font-bold text-green-700 hover:text-green-800 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
                      title={`Chat on WhatsApp about ${svc.title}`}
                    >
                      <WhatsAppIcon className="w-3 h-3 text-[#25D366]" /> WhatsApp
                    </button>
                    {onOpenQuote && (
                      <button
                        onClick={onOpenQuote}
                        className="text-[11px] font-bold text-gray-600 hover:text-pink-600 px-2 py-1.5 transition-colors cursor-pointer"
                      >
                        Quote &rarr;
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Supplies Callout & Center CTA Button */}
        <div id="supplies" className="scroll-mt-24 text-center flex flex-col items-center">
          <a
            href="#shop"
            className="px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 hover:from-purple-800 hover:to-pink-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            VIEW SHOP
          </a>
        </div>

      </div>
    </section>
  );
};
