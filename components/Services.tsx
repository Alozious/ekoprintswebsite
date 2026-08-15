import React from 'react';
import { Maximize2, Layers, Shirt, PenTool, Printer, Package } from 'lucide-react';

const services = [
  {
    id: 'large-format',
    icon: Maximize2,
    title: 'Large Format Printing',
    description: 'Billboards, banners, signage, and architectural prints at industrial scale with sharp, high-fidelity output.',
  },
  {
    id: 'dtf',
    icon: Layers,
    title: 'DTF Printing',
    description: 'Direct-to-Film transfers for vibrant, durable apparel. Excellent wash resistance and stretch on any fabric.',
  },
  {
    id: 'embroidery',
    icon: Shirt,
    title: 'Embroidery',
    description: 'Professional digitizing and embroidery for corporate uniforms, caps, bags, and branded apparel.',
  },
  {
    id: 'tshirt',
    icon: Printer,
    title: 'T-Shirt Printing',
    description: 'Custom t-shirt printing via screen print, heat press, and DTG — for small runs or bulk orders.',
  },
  {
    id: 'branding',
    icon: PenTool,
    title: 'Design & Branding',
    description: 'Logo creation, brand identity systems, and print-ready artwork designed to make your brand stand out.',
  },
  {
    id: 'supplies',
    icon: Package,
    title: 'Supplies',
    description: 'Printing consumables, heat transfer materials, vinyl, and finishing supplies available for purchase.',
  },
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-[#06090F]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-14">
          <span className="text-eko-primary text-xs font-semibold uppercase tracking-widest">What We Do</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">Our Services</h2>
          <p className="mt-3 text-gray-400 max-w-lg">
            End-to-end print and branding services — all under one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {services.map(service => (
            <div key={service.id} className="bg-[#06090F] p-8 hover:bg-[#0A0F1A] transition-colors group">
              <service.icon className="w-6 h-6 text-eko-primary mb-5" />
              <h3 className="text-white font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-block mt-5 text-xs text-eko-primary hover:text-white transition-colors"
              >
                Inquire →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
